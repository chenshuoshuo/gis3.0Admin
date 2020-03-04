import LevelSelector from '@/components/LevelSelector'
import { listOthersPolygonType, getMapOptExtendsDefine } from '@/api/typeManager'
import { getOthersInfo, updateOthersInfo } from '@/api/infoManager'
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
      token: getToken(),
      fileList: [],
      postForm: {
        brief: '',
        location: '',
        campusId: null,
        typeCode: '',
        mapOthersExtendsList: [],
        mapOthersPolygonExtendsList: [], // 新增
        mapOthersImgList: [],
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
      },
      rules: {
        polygonName: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        typeCode: [{ required: true, message: '请选择一个类型', trigger: 'change' }]
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
        this.postForm.mapOthersPolygonImgList.forEach((element, index) => {
          if (element.imgId === file.id) {
            this.postForm.mapOthersPolygonImgList.splice(index, 1)
            this.fileList.splice(index, 1)
          }
        })
      } else if (file.url) {
        this.postForm.mapOthersPolygonImgList.forEach((element, index) => {
          if (window.g.BASE_IPS + element.imgUrl === file.url) {
            this.postForm.mapOthersPolygonImgList.splice(index, 1)
            this.fileList.splice(index, 1)
          }
        })
      }
    },
    handleSuccess(res) {
      if (res.status) {
        this.fileList.push({ url: window.g.BASE_IPS + res.data })
        this.postForm.mapOthersPolygonImgList.push({ imgUrl: res.data })
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
            //   this.postForm.mapOthersExtendsList.push({ columnId: element.columnId, typeCode: this.postForm.typeCode, extendsValue: element.extendsValue })
            // })
            // addOthersInfo(this.postForm).then(res => {
            //   if (res.data.status) {
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
            this.postForm.mapOthersPolygonImgList.forEach(element => {
              element.polygonCode = this.postForm.polygonCode
            })
            this.postForm.mapOthersExtendsList = []
            this.postForm.extendsFields.forEach(element => {
              this.postForm.mapOthersExtendsList.push({ polygonCode: this.postForm.polygonCode, columnId: element.columnId, typeCode: this.postForm.typeCode, extendsValue: element.extendsValue })
            })
            delete this.postForm.mapOthersType
            // 修正字段传错bug
            this.postForm.mapOthersPolygonExtendsList = this.postForm.extendsFields
            this.postForm.mapOthersPolygonExtendsList.forEach(item => {
              item.polygonCode = this.postForm.polygonCode
            })
            // this.postForm.mapOthersPolygonExtendsList.polygonCode = this.postForm.polygonCode
            updateOthersInfo(this.postForm).then(res => {
              if (res.data.status) {
                this.$message({
                  type: 'success',
                  message: '更新成功'
                })
                this.$router.back(-1)
                this.$nextTick(() => {
                  this.$refs.ruleForm.clearValidate()
                })
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
    getOthersTypeList() {
      listOthersPolygonType({ campusCode: this.campusId }).then(res => {
        if (res.data.status) {
          this.types = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: '机构类别获取失败'
          })
        }
      })
    },
    async initExtendsDefine() {
      if (this.postForm.typeCode) {
        await getMapOptExtendsDefine(this.postForm.typeCode).then(res => {
          if (res.data.status) {
            // 后端返回的已无mapOthersExtendsList列表字段
            // if (this.postForm.mapOthersExtendsList && this.postForm.mapOthersExtendsList.length > 0) {
            //   this.postForm.mapOthersExtendsList.forEach(value => {
            //     res.data.data.forEach(element => {
            //       if (value.columnId === element.columnId) {
            //         element.extendsValue = value.extendsValue
            //       }
            //     })
            //   })
            // }
            if (this.postForm.mapOthersPolygonExtendsList && this.postForm.mapOthersPolygonExtendsList.length > 0) {
              this.postForm.mapOthersPolygonExtendsList.forEach(value => {
                res.data.data.forEach(element => {
                  if (value.columnId === element.columnId) {
                    element.extendsValue = value.extendsValue
                  }
                })
              })
            }
            this.postForm.extendsFields = res.data.data
            // 此时页面已经重新渲染完毕,extendsFields为空数组,不得已出此下策
            const temp = this.postForm.memo
            this.postForm.memo = ' '
            this.postForm.memo = temp
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
        this.vectorMap.on('zoom', () => {
          if (this.vectorMap.getZoom() > 17 && Number(this.vectorMap.getMinLevel()) !== Number(this.vectorMap.getMaxLevel())) {
            this.floor.floorShow = true
            this.floor.minLevel = Number(this.vectorMap.getMinLevel())
            this.floor.maxLevel = Number(this.vectorMap.getMaxLevel())
          } else {
            this.floor.floorShow = false
          }
        })
        setTimeout(() => {
          this.addLayer()
          this.vectorMap.flyTo({
            center: this.postForm.geoJson.geometry.coordinates[0][0],
            zoom: 18
          })
        }, 200)
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
    this.getOthersTypeList()
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
      this.postForm.polygonCode = this.$route.query.id
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
    // debugger
    getOthersInfo(this.postForm.polygonCode).then(res => {
      if (res.data.status) {
        this.postForm = res.data.data
        res.data.data.mapOthersPolygonImgList.forEach(element => {
          this.fileList.push({ id: element.imgId, url: `${window.g.BASE_IPS}${element.imgUrl}` })
        })
        this.geoJson = res.data.data.geoJson
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
