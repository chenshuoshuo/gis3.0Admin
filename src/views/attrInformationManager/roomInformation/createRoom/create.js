import LevelSelector from '@/components/LevelSelector'
import { listRoomType, getMapRtExtendsDefine } from '@/api/typeManager'
import { getRoomInfo, updateRoomInfo } from '@/api/infoManager'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
export default {
  inject: ['baseUrl'],
  components: {
    LevelSelector
  },
  data() {
    return {
      isOver: false,
      isFisrt: true,
      types: [],
      campusId: null,
      campus: [],
      id: null,
      state: '',
      loaddingMap: true,
      token:getToken(),
      fileList: [],
      postForm: {
        brief: '',
        location: '',
        typeCode: '',
        mapRoomExtendsList: [],
        mapRoomImgList: [],
        extendsFields: []
      },
      floor: {
        minLevel: 0,
        maxLevel: 0,
        floorShow: false,
        currentLevel: 0
      },
      vectorMap: null,
      currentLayer: null,
      geoJson: {
        'type': 'Feature',
        'geometry': {
          'coordinates': [[]],
          'type': 'Polygon'
        }
      }
    }
  },
  methods: {
    setLevel(num) {
      this.vectorMap.setLevel(num)
    },
    getTotalLevel() {
      return this.vectorMap.getMaxLevel() - this.vectorMap.getMinLevel()
    },
    zoomIn() {
      this.vectorMap.zoomIn()
    },
    zoomOut() {
      this.vectorMap.zoomOut()
    },
    addLayer() {
      this.get
      if (this.vectorMap.getSource('polygonSource')) {
        this.vectorMap.getSource('polygonSource').setData(this.geoJson)
      } else {
        this.vectorMap.addSource('polygonSource', {
          type: 'geojson',
          data: this.geoJson
        })
      }
      if (this.currentLayer === null) {
        this.currentLayer = {
          type: 'fill-extrusion',
          source: 'polygonSource',
          // id唯一
          id: 'polygonLayer',
          paint: {
            'fill-extrusion-color': 'rgb(255,81,4)',
            'fill-extrusion-height': 1
          }
        }
      } else {
        this.vectorMap.removeLayer(this.currentLayer.id)
      }
      this.vectorMap.addLayer(this.currentLayer)
    },
    handleRemove(file, fileList) {
      if (file.id) {
        this.postForm.mapRoomImgList.forEach((element, index) => {
          if (element.imgId === file.id) {
            this.postForm.mapRoomImgList.splice(index, 1)
            this.fileList.splice(index, 1)
          }
        })
      } else if (file.url) {
        this.postForm.mapRoomImgList.forEach((element, index) => {
          if (window.g.BASE_IPS + element.imgUrl === file.url) {
            this.postForm.mapRoomImgList.splice(index, 1)
            this.fileList.splice(index, 1)
          }
        })
      }
    },
    handleSuccess(res) {
      if (res.code === 200) {
        this.fileList.push({ url: window.g.BASE_IPS + res.data })
        this.postForm.mapRoomImgList.push({ imgUrl: res.data })
      } else {
        this.$message({
          type: 'error',
          message: '图片上传失败'
        })
      }
    },
    handleSub() {
      this.$refs.ruleForm.validate(val => {
        if (val) {
          if (this.state === 'add') {
            // this.postForm.extendsFields.forEach(element => {
            //   this.postForm.mapRoomExtendsList.push({ columnId: element.columnId, typeCode: this.postForm.typeCode, extendsValue: element.extendsValue })
            // })
            // addRoomInfo(this.postForm).then(res => {
            //   if (res.data.code === 200) {
            //     this.$message({
            //       type: 'success',
            //       message: '添加成功'
            //     })
            //   } else {
            //     this.$message({
            //       type: 'error',
            //       message: '添加失败'
            //     })
            //   }
            // })
          } else if (this.state === 'update') {
            this.postForm.mapRoomImgList.forEach(element => {
              element.roomCode = this.postForm.roomCode
            })
            this.postForm.mapRoomExtendsList = []
            this.postForm.extendsFields.forEach(element => {
              this.postForm.mapRoomExtendsList.push({ roomCode: this.postForm.roomCode, columnId: element.columnId, typeCode: this.postForm.typeCode, extendsValue: element.extendsValue })
            })
            delete this.postForm.mapRoomType
            updateRoomInfo(this.postForm).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '更新成功'
                })
                this.$router.go(-1)
              } else {
                this.$message({
                  type: 'error',
                  message: '更新失败'
                })
              }
            })
          }
        }
      })
    },
    getRoomTypeList() {
      listRoomType({ campusCode: this.campusId }).then(res => {
        if (res.data.code === 200) {
          this.types = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: '机构类别获取失败'
          })
        }
      })
    },
    initExtendsDefine() {
      if (this.postForm.typeCode) {
        getMapRtExtendsDefine(this.postForm.typeCode).then(res => {
          if (res.data.code === 200) {
            if (this.postForm.mapRoomExtendsList && this.postForm.mapRoomExtendsList.length > 0) {
              this.postForm.mapRoomExtendsList.forEach(value => {
                res.data.data.forEach(element => {
                  if (value.columnId === element.columnId) {
                    element.extendsValue = value.extendsValue
                  }
                })
              })
              this.postForm.extendsFields = res.data.data
            } else {
              this.postForm.extendsFields = res.data.data
            }
            this.$forceUpdate()
          } else {
            this.$message({
              type: 'error',
              message: '扩展属性获取失败'
            })
          }
        })
      }
    },
    initMap() {
      this.vectorMap.on('load', () => {
        setTimeout(() => {
          this.vectorMap.flyTo({
            center: this.postForm.geoJson.geometry.coordinates[0][0],
            zoom: 18
          })
          this.setLevel(this.floor.currentLevel)
        }, 200)
        this.addLayer()
        this.$refs.ruleForm.clearValidate()
        this.loaddingMap = false
      })
    }
  },
  watch: {
    typeCode() {
      this.postForm.extendsFields = []
      this.initExtendsDefine()
    }
  },
  computed: {
    typeCode() {
      return this.postForm.typeCode
    }
  },
  beforeMount() {
    this.getRoomTypeList()
    this.state = this.$route.query.method
    !(this.state === 'add' ? () => {
      this.$router.back(-1)
    } : () => {
      if (!this.$route.query.id) {
        this.$router.back(-1)
        Message({
          type: 'error',
          message: '错误的请求方式'
        })
      }
      this.postForm.roomCode = this.$route.query.id
    })()
    if (!this.state) {
      this.$router.back(-1)
      Message({
        type: 'error',
        message: '错误的请求方式'
      })
    }
  },
  mounted() {
    getRoomInfo(this.postForm.roomCode).then(res => {
      if (res.data.code === 200) {
        this.postForm = res.data.data
        res.data.data.mapRoomImgList.forEach(element => {
          this.fileList.push({ id: element.imgId, url: `${window.g.BASE_IPS}${element.imgUrl}` })
        })
        this.geoJson = res.data.data.geoJson
        this.floor.currentLevel = this.postForm.leaf === null ? 0 : this.postForm.leaf
        this.vectorMap = new window.creeper.VectorMap('map', this.postForm.campusCode, window.g.MAP_URL)
        this.initMap()
      } else {
        this.$message({
          type: 'warning',
          message: '系统内该地图不存在'
        })
        this.$router.back(-1)
      }
    })
  },
  updated() {
    this.isOver = (document.getElementById('slider-content').offsetHeight - document.getElementById('slider-height').offsetHeight) > 0
  }
}
