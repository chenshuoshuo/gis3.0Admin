import LevelSelector from '@/components/LevelSelector'
import { listOrganizationType, getMapOtExtendsDefine } from '@/api/typeManager'
import { addOrganizationInfo, getOrganizationInfo, updateOrganizationInfo } from '@/api/infoManager'
import { campusList } from '@/api/campus'
import { Message } from 'element-ui'

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
      fileList: [],
      floor: {
        minLevel: 0,
        maxLevel: 0,
        floorShow: false,
        currentLevel: 0
      },
      postForm: {
        leaf: false,
        brief: '',
        location: '',
        campusCode: null,
        typeCode: '',
        mapOrganizationExtendsList: [],
        mapOrganizationImgList: [],
        extendsFields: []
      },
      loaddingMap: true,
      vectorMap: null
    }
  },
  methods: {
    setLevel(num) {
      this.vectorMap.setLevel(num)
    },
    zoomIn() {
      this.vectorMap.zoomIn()
    },
    zoomOut() {
      this.vectorMap.zoomOut()
    },
    handleRemove(file, fileList) {
      if (file.id) {
        this.postForm.mapOrganizationImgList.forEach((element, index) => {
          if (element.imgId === file.id) {
            this.postForm.mapOrganizationImgList.splice(index, 1)
            this.fileList.splice(index, 1)
          }
        })
      } else if (file.url) {
        this.postForm.mapOrganizationImgList.forEach((element, index) => {
          if (window.g.BASE_IPS + element.imgUrl === file.url) {
            this.postForm.mapOrganizationImgList.splice(index, 1)
            this.fileList.splice(index, 1)
          }
        })
      }
    },
    handleSuccess(res) {
      if (res.code === 200) {
        this.fileList.push({ url: window.g.BASE_IPS + res.data })
        this.postForm.mapOrganizationImgList.push({ imgUrl: res.data })
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
          this.saveInfo()
        }
      })
    },
    saveInfo() {
      this.postForm.leaf = this.postForm.leaf ? this.vectorMap.floorComponent.nowLevelIndex : null
      if (this.state === 'add') {
        this.postForm.extendsFields.forEach(element => {
          this.postForm.mapOrganizationExtendsList.push({ columnId: element.columnId, typeCode: this.postForm.typeCode, extendsValue: element.extendsValue })
        })
        addOrganizationInfo(this.postForm).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.resetForm()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败'
            })
          }
        })
      } else if (this.state === 'update') {
        this.postForm.mapOrganizationImgList.forEach(element => {
          element.organizationCode = this.postForm.organizationCode
        })
        this.postForm.mapOrganizationExtendsList = []
        this.postForm.extendsFields.forEach(element => {
          this.postForm.mapOrganizationExtendsList.push({ organizationCode: this.postForm.organizationCode, columnId: element.columnId, typeCode: this.postForm.typeCode, extendsValue: element.extendsValue })
        })
        delete this.postForm.mapOrganizationType
        updateOrganizationInfo(this.postForm).then(res => {
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
    },
    getOrganizationTypeList() {
      listOrganizationType({ campusCode: this.campusId }).then(res => {
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
        getMapOtExtendsDefine(this.postForm.typeCode).then(res => {
          if (res.data.code === 200) {
            if (this.postForm.mapOrganizationExtendsList && this.postForm.mapOrganizationExtendsList.length > 0) {
              this.postForm.mapOrganizationExtendsList.forEach(value => {
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
    setPostForm(e) {
      var features = this.vectorMap.queryRenderedFeatures(e.point)
      var feature = null
      if (features.length > 0) {
        feature = features[0]
      }
      this.postForm.location = `${feature && feature.properties.name ? feature.properties.name : '未知位置'}`
      this.postForm.lngLatString = `${e.lngLat.lng},${e.lngLat.lat}`
      this.postForm.codeIsBuilding = feature && feature.properties ? /building/.test(JSON.stringify(feature.properties)) : false
      this.postForm.mapCode = feature && feature.properties ? feature.properties.id : null
    },
    initMap() {
      var marker = null
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
        this.vectorMap.on('click', (e) => {
          if (marker !== null) {
            marker.remove()
          }
          marker = new window.creeper.Marker({
            draggable: true
          }).setLngLat(e.lngLat).addTo(this.vectorMap)
          marker.on('dragend', () => {
            var features = this.vectorMap.queryRenderedFeatures(marker._pos)
            var feature = null
            if (features.length > 0) {
              feature = features[0]
            }
            this.postForm.location = `${(feature.properties && feature.properties.name) ? feature.properties.name : '未知位置'}`
            this.postForm.lngLatString = `${marker.getLngLat().lng},${marker.getLngLat().lat}`
            this.postForm.codeIsBuilding = (feature && feature.properties) ? /building/.test(JSON.stringify(feature.properties)) : false
            this.postForm.mapCode = feature.properties.id
          })
          this.setPostForm(e)
        })
        setTimeout(() => {
          if (this.postForm.lngLatString) {
            const lngLat = this.postForm.lngLatString.split(',')
            marker = new window.creeper.Marker({
              draggable: true
            }).setLngLat(lngLat).addTo(this.vectorMap)
            marker.on('dragend', () => {
              var features = this.vectorMap.queryRenderedFeatures(marker._pos)
              var feature = null
              if (features.length > 0) {
                feature = features[0]
              }
              this.postForm.location = `${feature && feature.properties.name ? feature.properties.name : '未知位置'}`
              this.postForm.lngLatString = `${marker.getLngLat().lng},${marker.getLngLat().lat}`
              this.postForm.codeIsBuilding = feature && feature.properties ? /building/.test(JSON.stringify(feature.properties)) : false
              this.postForm.mapCode = feature.properties.id
            })
            this.vectorMap.flyTo({
              center: lngLat,
              zoom: 17
            })
            setTimeout(() => {
              if (this.floor.currentLevel) {
                this.setLevel(this.floor.currentLevel)
              }
            }, 1000)
          }
        }, 500)
        this.loaddingMap = false
      })
    },
    resetForm() {
      this.postForm = {
        leaf: false,
        brief: '',
        location: '',
        typeCode: '',
        mapOrganizationExtendsList: [],
        mapOrganizationImgList: []
      }
      this.$refs.avatar.clearFiles()
      this.$refs.ruleForm.clearValidate()
    },
    getCampusList() {
      return new Promise((resolve, reject) => {
        campusList({ only_vector: true }).then(res => {
          if (res.data.code === 200) {
            this.campus = res.data.data
            if (this.state === 'add') this.campusId = this.campus[0].id
            resolve()
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      })
    }
  },
  watch: {
    campusId(cur) {
      this.postForm.campusCode = cur
      if (this.state === 'update' && this.isFisrt) {
        this.isFisrt = false
        this.getOrganizationTypeList()
      } else {
        this.postForm.typeCode = null
        this.getOrganizationTypeList()
        this.loaddingMap = true
        this.resetForm()
        this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
        this.initMap()
      }
    },
    typeCode() {
      this.postForm.extendsFields = []
      this.initExtendsDefine()
    },
    isOver() {
      this.$forceUpdate()
    }
  },
  computed: {
    typeCode() {
      return this.postForm.typeCode
    }
  },
  beforeMount() {
    this.getOrganizationTypeList()
    this.state = this.$route.query.method
    !(this.state === 'add' ? () => {} : () => {
      if (!this.$route.query.id) {
        this.$router.back(-1)
        Message({
          type: 'error',
          message: '错误的请求方式'
        })
      }
      this.postForm.organizationCode = this.$route.query.id
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
    if (this.state === 'update') {
      getOrganizationInfo(this.postForm.organizationCode).then(res => {
        if (res.data.code === 200) {
          this.postForm = res.data.data
          res.data.data.mapOrganizationImgList.forEach(element => {
            this.fileList.push({ id: element.imgId, url: `${window.g.BASE_IPS}${element.imgUrl}` })
          })
          this.campusId = res.data.data.mapOrganizationType.campusCode
          this.floor.currentLevel = this.postForm.leaf === null ? 0 : this.postForm.leaf
          this.postForm.leaf = !!this.postForm.leaf
          this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
          this.initMap()
        } else {
          this.$message({
            type: 'warning',
            message: '应用信息获取失败'
          })
          this.$router.back(-1)
        }
      })
      this.getCampusList()
    } else {
      this.getCampusList().then(() => {
        this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
        this.initMap()
      })
    }
  },
  updated() {
    this.isOver = (document.getElementById('slider-content').offsetHeight - document.getElementById('slider-height').offsetHeight) > 0
  }
}
