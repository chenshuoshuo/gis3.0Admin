import LevelSelector from '@/components/LevelSelector'
import { listPointType, getMapPtExtendsDefine } from '@/api/typeManager'
import { addPointInfo, getPointInfo, updatePointInfo } from '@/api/infoManager'
import { campusList } from '@/api/campus'
import { Message } from 'element-ui'

export default {
  inject: ['baseUrl'],
  components: {
    LevelSelector
  },
  data() {
    return {
      picUrl: '',
      fileList: [],
      has3D:false,
      loaddingMap: true,
      isOver: false,
      isFisrt: true,
      isOpenRaster: false,
      types: [],
      campusId: null,
      campus: [],
      state: '',
      rasterMap: null,
      typeArr: [],
      floor: {
        minLevel: 0,
        maxLevel: 0,
        floorShow: false,
        currentLevel: 0
      },
      postForm: {
        leaf: false,
        location: '',
        campusCode: null,
        rasterLngLatString: '',
        typeCode: '',
        mapPointExtendsList: [],
        mapPointImgList: [],
        extendsFields: []
      },
      vectorMap: null
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
    handleRemove(file, fileList) {
      if (file.id) {
        this.postForm.mapPointImgList.forEach((element, index) => {
          if (element.imgId === file.id) {
            this.postForm.mapPointImgList.splice(index, 1)
            this.fileList.splice(index, 1)
          }
        })
      } else if (file.url) {
        this.postForm.mapPointImgList.forEach((element, index) => {
          if (window.g.BASE_IPS + element.imgUrl === file.url) {
            this.postForm.mapPointImgList.splice(index, 1)
            this.fileList.splice(index, 1)
          }
        })
      }
    },
    handleSuccess(res) {
      if (res.code === 200) {
        this.fileList.push({ url: window.g.BASE_IPS + res.data })
        this.postForm.mapPointImgList.push({ imgUrl: res.data })
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
          this.postForm.mapPointExtendsList.push({ columnId: element.columnId, typeCode: this.postForm.typeCode, extendsValue: element.extendsValue })
        })
        addPointInfo(this.postForm).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.postForm.pointName = ''
            this.fileList = []
            this.postForm.mapPointImgList = []
          } else {
            this.$message({
              type: 'error',
              message: '添加失败'
            })
          }
        })
      } else if (this.state === 'update') {
        this.postForm.mapPointImgList.forEach(element => {
          element.pointCode = this.postForm.pointCode
        })
        this.postForm.mapPointExtendsList = []
        this.postForm.extendsFields.forEach(element => {
          this.postForm.mapPointExtendsList.push({ pointCode: this.postForm.pointCode, columnId: element.columnId, typeCode: this.postForm.typeCode, extendsValue: element.extendsValue })
        })
        delete this.postForm.mapPointType
        updatePointInfo(this.postForm).then(res => {
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
    getPointTypeList() {
      listPointType({ campusCode: this.campusId }).then(res => {
        if (res.data.code === 200) {
          this.types = this.parseCascader(res.data.data)
        } else {
          this.$message({
            type: 'error',
            message: '机构类别获取失败'
          })
        }
      })
    },
    parseCascader(arr) {
      arr.forEach(element => {
        if (element.childrenMapPointTypeList.length > 0) {
          this.parseCascader(element.childrenMapPointTypeList)
        } else {
          delete element.childrenMapPointTypeList
        }
      })
      return arr
    },
    initExtendsDefine() {
      if (this.postForm.typeCode) {
        getMapPtExtendsDefine(this.postForm.typeCode).then(res => {
          if (res.data.code === 200) {
            if (this.postForm.mapPointExtendsList && this.postForm.mapPointExtendsList.length > 0) {
              this.postForm.mapPointExtendsList.forEach(value => {
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
    inintMap() {
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
            this.postForm.location = `${feature && feature.properties.name ? feature.properties.name : '未知位置'}`
            this.postForm.lngLatString = `${marker.getLngLat().lng},${marker.getLngLat().lat}`
            this.postForm.codeIsBuilding = feature && feature.properties ? /building/.test(JSON.stringify(feature.properties)) : false
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
              zoom: 18
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
    getCampusList() {
      return new Promise((resolve, reject) => {
        campusList().then(res => {
          if (res.data.code === 0) {
            let arr = res.data.data.content.filter(item=>item.zones.filter(element=>element.mapZoneByZoneId.is2D).length > 0)
            this.campus = arr.map(item=>{
              item.map2D = item.zones.filter(element=>element.mapZoneByZoneId.is2D)
              item.map3D = item.zones.filter(element=>!element.mapZoneByZoneId.is2D)
              return item
            })
            if (this.state === 'add') {
              this.campusId = this.campus[0].map2D[this.campus[0].map2D.length-1].mapZoneByZoneId.id
              this.postForm.campusCode = this.campusId
            }
            resolve()
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      })
    },
    openRaster() {
      this.isOpenRaster = true
      setTimeout(() => {
        var res = null
        this.campus.forEach(item => {
          item.map2D.forEach(element=>{
            if (element.mapZoneByZoneId.id === this.campusId && item.map3D.length > 0) {
              res = item.map3D[item.map3D.length-1]
            }
          })
        })
        this.rasterMap = new window.creeper.VectorMap('rasterMap', res.mapZoneByZoneId.id, window.g.MAP_URL)
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
    campusId(cur) {
      this.has3D = false
      console.log(this.campusId);
      this.campus.forEach(item => {
        item.map2D.forEach(element=>{
          if (element.mapZoneByZoneId.id === this.campusId && item.map3D.length > 0) {
            this.has3D = true
          }
        })
      })
      console.log(this.has3D);
      if (this.state === 'update' && this.isFisrt) {
        this.isFisrt = false
        this.getPointTypeList()
      } else {
        this.typeArr = []
        this.getPointTypeList()
        this.loaddingMap = true
        this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
        this.inintMap()
        this.postForm.lngLatString = ''
        this.postForm.rasterLngLatString = ''
      }
      this.postForm.campusCode = cur
    },
    typeArr() {
      this.postForm.typeCode = this.typeArr[this.typeArr.length - 1]
    },
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
    this.getPointTypeList()
    this.state = this.$route.query.method
    !(this.state === 'add' ? () => {} : () => {
      if (!this.$route.query.id) {
        this.$router.back(-1)
        Message({
          type: 'error',
          message: '错误的请求方式'
        })
      }
      this.postForm.PointCode = this.$route.query.id
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
      this.getCampusList().then(res=>{
        getPointInfo(this.postForm.PointCode).then(res => {
          if (res.data.code === 200) {
            this.postForm = res.data.data
            res.data.data.mapPointImgList.forEach(element => {
              this.fileList.push({ id: element.imgId, url: `${window.g.BASE_IPS}${element.imgUrl}` })
            })
            this.campusId = res.data.data.campusCode
            this.typeArr = [res.data.data.mapPointType.parentCode, res.data.data.mapPointType.typeCode]
            this.floor.currentLevel = this.postForm.leaf === null ? 0 : this.postForm.leaf
            this.postForm.leaf = !!this.postForm.leaf
            this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
            this.inintMap()
          } else {
            this.$message({
              type: 'warning',
              message: '应用信息获取失败'
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
