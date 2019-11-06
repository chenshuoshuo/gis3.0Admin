import LevelSelector from '@/components/LevelSelector'
import { addRoam, infoRoam, updateRoam, listRoam } from '@/api/roam'
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
      loading: false,
      markers: [],
      POIList: [],
      poiComponent: null,
      token: getToken(),
      keyWord: '',
      display: false,
      picUrl: '',
      isOver: false,
      isFisrt: true,
      has3D: true,
      isOpenRaster: false,
      types: [],
      campusId: null,
      campus: [],
      id: null,
      extendsFields: [],
      state: '',
      loaddingMap: true,
      rasterMap: null,
      postForm: {
        roamType: 2,
        location: '',
        campusCode: null
      },
      floor: {
        minLevel: 0,
        maxLevel: 0,
        floorShow: false,
        currentLevel: 0
      },
      vectorMap: null
    }
  },
  methods: {
    handleSuccess(res) {
      if (res.status) {
        this.$set(this.postForm, 'roamnUrl', this.baseUrl + '/' + res.data.data)
      }
    },
    // poi
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        this.poiComponent.searchRequest({ keywords: query, querytype: 'key' }, (res) => {
          this.loading = false
          if (res.status) {
            this.POIList = res.data.list.filter(item => item.systemType === 'map')
          } else {
            this.$message.error(res.data.message)
          }
        }, () => {}, {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Basic Q21HaXNScGM6Q01naXNUISQmKCo='
          }
        })
      } else {
        this.options = []
      }
    },
    openRaster() {
      this.isOpenRaster = true
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
              this.postForm.rasterLngLat = `${marker.getLngLat().lng},${marker.getLngLat().lat}`
            })
            this.postForm.rasterLngLat = `${marker.getLngLat().lng},${marker.getLngLat().lat}`
          })
          setTimeout(() => {
            if (this.postForm.rasterLngLat) {
              const lngLat = this.postForm.rasterLngLat.split(',')
              this.rasterMap.flyTo({
                center: lngLat,
                zoom: 18
              })
              marker = new window.creeper.Marker({
                draggable: true
              }).setLngLat(lngLat).addTo(this.rasterMap)
              marker.on('dragend', () => {
                this.postForm.rasterLngLat = `${marker.getLngLat().lng},${marker.getLngLat().lat}`
              })
            }
          }, 500)
        })
      }, 200)
    },
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
    handleSub() {
      this.$refs.ruleForm.validate(val => {
        if (val) {
          this.postForm.campusCode = this.campusId
          if (this.state === 'add') {
            addRoam(this.postForm).then(res => {
              if (res.data.status) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.$router.go(-1)
              } else {
                this.$message({
                  type: 'error',
                  message: '添加失败'
                })
              }
            })
          } else if (this.state === 'update') {
            updateRoam(this.postForm.roamId, this.postForm).then(res => {
              if (res.data.status) {
                this.$message({
                  type: 'success',
                  message: '更新成功'
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
    initMap() {
      var marker = null
      this.vectorMap.on('load', () => {
        // 重写moveend方法
        this.vectorMap.on('moveend', () => {
          if (this.vectorMap.getZoom() >= 18) {
            this.has3D = false
          } else {
            this.has3D = true
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
          var features = this.vectorMap.queryRenderedFeatures(e.point)
          var feature = null
          if (features.length > 0) {
            feature = features[0]
          }
          this.postForm.location = `${feature && feature.properties.name ? feature.properties.name : `未知位置`}`
          this.postForm.lngLat = `${e.lngLat.lng},${e.lngLat.lat}`
          this.postForm.mapCode = feature.properties.id
          marker.on('dragend', () => {
            var features = this.vectorMap.queryRenderedFeatures(marker._pos)
            var feature = null
            if (features.length > 0) {
              feature = features[0]
            }
            this.postForm.location = `${feature && feature.properties.name ? feature.properties.name : `未知位置`}`
            this.postForm.lngLat = `${e.lngLat.lng},${e.lngLat.lat}`
            this.postForm.mapCode = feature.properties.id
          })
        })
        setTimeout(() => {
          if (this.postForm.lngLat && this.postForm.lngLat.coordinates) {
            marker = new window.creeper.Marker({
              draggable: true
            }).setLngLat(this.postForm.lngLat.coordinates)
              .addTo(this.vectorMap)
            this.postForm.lngLat = this.postForm.lngLat.coordinates.join(',')
          }
        }, 500)
        this.$refs.ruleForm.clearValidate()
        this.loaddingMap = false
      })
    },
    resetForm() {
      this.postForm = {
        roamType: 2,
        location: ''
      }
    },
    getListRoam() {
      this.markers.forEach(item => {
        item.remove()
      })
      listRoam({ campusCode: this.postForm.campusCode, roamType: 2 }).then(res => {
        if (res.data.status) {
          res.data.data.forEach(item => {
            const markerIcon = new Image()
            markerIcon.src = require('../../../../assets/images/roam.png')
            markerIcon.style.cursor = 'pointer'
            markerIcon.id = item.roamId
            markerIcon.onclick = () => {
              infoRoam(item.roamId).then(res => {
                if (res.data.status) {
                  this.postForm = res.data.data
                  this.postForm.lngLat = this.postForm.lngLat.coordinates.join(',')
                  this.postForm.rasterLngLat = res.data.data.rasterLngLat ? res.data.data.rasterLngLat.coordinates.join(',')
                    : ''
                } else {
                  this.$message({
                    type: 'warning',
                    message: '应用信息获取失败'
                  })
                  this.$router.back(-1)
                }
              })
              // event.preventDefault()
              // event.stopPropagation()
            }
            this.markers.push(
              new window.creeper.Marker(markerIcon).setLngLat(item.lngLat.coordinates).addTo(this.vectorMap)
            )
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    }
  },
  watch: {
    display() {
      this.display
        ? this.getListRoam()
        : this.markers.forEach(item => {
          item.remove()
        })
    },
    campusId() {
      // this.has3D = false
      this.campus.forEach(item => {
        item.map2D.forEach(element => {
          if (element.mapZoneByZoneId.id === this.campusId && item.map3D.length > 0) {
            // this.has3D = true
          }
        })
      })
      if (this.state === 'update' && this.isFisrt) {
        this.isFisrt = false
      } else {
        this.typeArr = []
        this.loaddingMap = true
        this.resetForm()
        this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
        this.initMap()
      }
      this.poiComponent = new window.creeper.searchEngine(window.g.BASE_GIS, this.campusId)
      this.display && this.getListRoam()
    },
    keyWord() {
      const target = this.POIList.find(item => item.id === this.keyWord)
      target.center && this.vectorMap.flyTo({
        zoom: this.vectorMap.configComponent.mapZone.maxZoom,
        center: target.center.coordinates
      })
    }
  },
  beforeMount() {
    this.state = this.$route.query.method
    !(this.state === 'add' ? () => {} : () => {
      if (!this.$route.query.id) {
        this.$router.back(-1)
        Message({
          type: 'error',
          message: '错误的请求方式'
        })
      }
      this.postForm.roamId = this.$route.query.id
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
    if (this.state === 'add') {
      campusList().then(res => {
        if (res.data.status) {
          const arr = res.data.data.content.filter(item => item.zones.filter(element => element.mapZoneByZoneId.is2D).length > 0)
          this.campus = arr.map(item => {
            item.map2D = item.zones.filter(element => element.mapZoneByZoneId.is2D)
            item.map3D = item.zones.filter(element => !element.mapZoneByZoneId.is2D)
            return item
          })
          this.campusId = this.campus[0].map2D[this.campus[0].map2D.length - 1].mapZoneByZoneId.id
          this.postForm.campusCode = this.campusId
          this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
        }
      })
    } else {
      campusList().then(res => {
        if (res.data.status) {
          const arr = res.data.data.content.filter(item => item.zones.filter(element => element.mapZoneByZoneId.is2D).length > 0)
          this.campus = arr.map(item => {
            item.map2D = item.zones.filter(element => element.mapZoneByZoneId.is2D)
            item.map3D = item.zones.filter(element => !element.mapZoneByZoneId.is2D)
            return item
          })
          infoRoam(this.postForm.roamId).then(res => {
            if (res.data.status) {
              this.postForm = res.data.data
              this.postForm.rasterLngLat = res.data.data.rasterLngLat ? res.data.data.rasterLngLat.coordinates.join(',')
                : ''
              this.campusId = res.data.data.campusCode
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
        }
      })
    }
    this.isOver = (document.getElementById('slider-content').offsetHeight - document.getElementById('slider-height').offsetHeight) > 0
  }
}
