import LevelSelector from '@/components/LevelSelector'
import { listOrganizationType, getMapOtExtendsDefine } from '@/api/typeManager'
import { addOrganizationInfo, getOrganizationInfo, updateOrganizationInfo } from '@/api/infoManager'
import { campusList } from '@/api/campus'
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
      isOpenRaster: false,
      has3D: false,
      campus: [],
      id: null,
      token: getToken(),
      state: '',
      fileList: [],
      floor: {
        minLevel: 0,
        maxLevel: 0,
        floorShow: false,
        currentLevel: 0
      },
      postForm: {
        leaf: null,
        codeIsBuilding: false,
        brief: '',
        location: '',
        campusCode: null,
        typeCode: null,
        officialWebsite: 'http://',
        mapOrganizationExtendsList: [],
        mapOrganizationImgList: [],
        extendsFields: []
      },
      loaddingMap: true,
      vectorMap: null,
      rules: {
        organizationName: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        // campusId: [{ required: true, message: '请选择校区', trigger: 'change' }],
        typeCode: [{ required: true, message: '请选择机构类别', trigger: 'change' }],
        codeIsBuilding: [{ required: true, message: '请选择楼层', trigger: 'change' }],
        location: [{ required: true, message: '请选择二维位置', trigger: 'change' }],
        officialWebsite: [{ required: false, message: '请输入正确的网址', trigger: 'change',
          pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ }],
        rasterLngLatString: [{ required: true, message: '请选择三维位置', trigger: 'change' }],
        orderId: [{ type: 'number', required: true, message: '请输入大于0的数字', trigger: 'blur', min: 1 }]
      },
      isEnsure: false,
      oldRasterLngLat: ''
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
      if (res.status) {
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
      this.$refs.postForm.validate(val => {
        if (val) {
          this.saveInfo()
        }
      })
    },
    saveInfo() {
      this.postForm.leaf = this.postForm.codeIsBuilding ? null : this.vectorMap.floorComponent.nowLevelIndex
      if (this.state === 'add') {
        this.postForm.extendsFields.forEach(element => {
          this.postForm.mapOrganizationExtendsList.push({ columnId: element.columnId, typeCode: this.postForm.typeCode, extendsValue: element.extendsValue })
        })
        addOrganizationInfo(this.postForm).then(res => {
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.resetForm()
            this.$router.go(-1)
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
          if (res.data.status) {
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
    initExtendsDefine() {
      if (this.postForm.typeCode) {
        getMapOtExtendsDefine(this.postForm.typeCode).then(res => {
          if (res.data.status) {
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
      this.postForm.mapCode = feature && feature.properties ? feature.properties.id : null
    },
    initMap() {
      var marker = null
      this.vectorMap.on('load', () => {
        // 重写moveend方法
        this.vectorMap.on('moveend', () => {
          if (this.vectorMap.getZoom() >= 18) {
            this.postForm.codeIsBuilding = false
          } else {
            this.postForm.codeIsBuilding = true
          }
          // 调用sdk中的moveend回调
          this.vectorMap.floorComponent.onCameraMoveEnd()
          if (this.vectorMap.getZoom() >= 18 && Number(this.vectorMap.getMinLevel()) !== Number(this.vectorMap.getMaxLevel())) {
            if (this.floor.currentLevel && !this.floor.maxLevel) {
              this.floor.minLevel = Number(this.vectorMap.getMinLevel())
              this.floor.maxLevel = Number(this.vectorMap.getMaxLevel())
              this.setLevel(this.floor.currentLevel)
            } else {
              this.floor.currentLevel = this.vectorMap.floorComponent.nowLevelIndex
              this.floor.minLevel = Number(this.vectorMap.getMinLevel())
              this.floor.maxLevel = Number(this.vectorMap.getMaxLevel())
              if (this.$refs.level) {
                this.$refs.level.setCurrentFloor(this.vectorMap.floorComponent.nowLevelIndex)
              }
            }
            this.floor.floorShow = true
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
              this.postForm.mapCode = feature.properties.id
            })
            if (this.postForm.codeIsBuilding) {
              this.vectorMap.flyTo({
                center: lngLat,
                zoom: 17
              })
            } else {
              this.vectorMap.flyTo({
                center: lngLat,
                zoom: 20
              })
            }
          }
        }, 500)
        this.loaddingMap = false
      })
    },
    resetForm() {
      this.postForm.organizationName = ''
      this.postForm.brief = ''
      this.postForm.location = ''
      this.postForm.officialWebsite = 'http://'
      this.postForm.mapOrganizationExtendsList = []
      this.postForm.mapOrganizationExtendsList.forEach(item => {
        item.extendsValue
      })
      this.postForm.mapOrganizationImgList = []
      this.postForm.rasterLngLatString = ''
      this.$refs.avatar.clearFiles()
      this.$nextTick(() => {
        this.$refs.postForm.clearValidate()
      })
    },
    getCampusList() {
      return new Promise((resolve, reject) => {
        campusList().then(res => {
          if (res.data.status) {
            const arr = res.data.data.content.filter(item => item.zones.filter(element => element.mapZoneByZoneId.is2D).length > 0)
            this.campus = arr.map(item => {
              item.map2D = item.zones.filter(element => element.mapZoneByZoneId.is2D)
              item.map3D = item.zones.filter(element => !element.mapZoneByZoneId.is2D)
              return item
            })
            if (this.state === 'add') this.campusId = this.campus[0].map2D[this.campus[0].map2D.length - 1].mapZoneByZoneId.id
            resolve()
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      })
    },
    cancelMarker() {
      this.isOpenRaster = false
      if (!this.isEnsure) {
        // this.postForm.rasterLngLatString = ''
        this.postForm.rasterLngLatString = this.oldRasterLngLat
      }
    },
    openRaster() {
      this.isOpenRaster = true
      this.isEnsure = false
      setTimeout(() => {
        var res = null
        this.campus.forEach(item => {
          item.map2D.forEach(element => {
            if (element.mapZoneByZoneId.id === this.campusId && item.map3D.length > 0) {
              res = item.map3D[item.map3D.length - 1]
            }
          })
        })
        this.rasterMap = new window.creeper.RasterMap('rasterMap', res.mapZoneByZoneId.id, window.g.MAP_URL)
        this.rasterMap.on('load', () => {
          var marker = null
          this.rasterMap.on('click', (e) => {
            if (marker !== null) {
              marker.remove()
            }
            marker = new window.creeper.Marker({
              draggable: true
            }).setLngLat(e.lngLat).addTo(this.rasterMap)
            marker.on('dragend', () => {
              this.postForm.rasterLngLatString = `${marker.getLngLat().lng},${marker.getLngLat().lat}`
            })
            this.postForm.rasterLngLatString = `${marker.getLngLat().lng},${marker.getLngLat().lat}`
          })
          setTimeout(() => {
            if (this.postForm.rasterLngLatString) {
              this.oldRasterLngLat = this.postForm.rasterLngLatString
              const lngLat = this.postForm.rasterLngLatString.split(',')
              this.rasterMap.flyTo({
                center: lngLat,
                zoom: 18
              })
              marker = new window.creeper.Marker({
                draggable: true
              }).setLngLat(lngLat).addTo(this.rasterMap)
              marker.on('dragend', () => {
                this.postForm.rasterLngLatString = `${marker.getLngLat().lng},${marker.getLngLat().lat}`
              })
            }
          }, 500)
        })
      }, 200)
    }
  },
  watch: {
    campusId(cur, oldVal) {
      this.has3D = false
      this.campus.forEach(item => {
        item.map2D.forEach(element => {
          if (element.mapZoneByZoneId.id === this.campusId && item.map3D.length > 0) {
            this.has3D = true
          }
        })
      })
      this.postForm.campusCode = cur
      if (this.state === 'update' && this.isFisrt) {
        this.isFisrt = false
        this.getOrganizationTypeList()
      } else {
        this.postForm.orderId = this.$route.query.total + 1
        this.postForm.typeCode = null
        this.getOrganizationTypeList()
        this.loaddingMap = true
        // this.resetForm()
        this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
        this.initMap()
      }
      if (oldVal != null) {
        this.postForm.location = ''
        this.postForm.rasterLngLatString = ''
        this.postForm.lngLatString = ''
      }
    },
    typeCode() {
      this.$forceUpdate()
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
      this.getCampusList().then(() => {
        getOrganizationInfo(this.postForm.organizationCode).then(res => {
          if (res.data.status) {
            this.postForm = res.data.data
            res.data.data.mapOrganizationImgList.forEach(element => {
              this.fileList.push({ id: element.imgId, url: `${window.g.BASE_IPS}${element.imgUrl}` })
            })
            this.campusId = res.data.data.mapOrganizationType.campusCode
            this.floor.currentLevel = res.data.data.leaf
            this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
            this.initMap()
          } else {
            this.$message({
              type: 'warning',
              message: '系统内该地图不存在'
            })
            this.$router.back(-1)
          }
        })
      })
    } else {
      this.getCampusList().then(() => {
        this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
      })
    }
  },
  updated() {
    this.isOver = (document.getElementById('slider-content').offsetHeight - document.getElementById('slider-height').offsetHeight) > 0
  }
}
