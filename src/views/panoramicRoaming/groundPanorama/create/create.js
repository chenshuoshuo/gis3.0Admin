import LevelSelector from '@/components/LevelSelector'
import { addRoam, infoRoam, updateRoam } from '@/api/roam'
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
      isOver: false,
      isFisrt: true,
      types: [],
      campusId: null,
      campus: [],
      id: null,
      extendsFields: [],
      state: '',
      loaddingMap: true,
      postForm: {
        roamType: 2,
        location: '',
        campusCode: null
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
    handleSub() {
      this.$refs.ruleForm.validate(val => {
        if (val) {
          this.postForm.campusCode = this.campusId
          if (this.state === 'add') {
            addRoam(this.postForm).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '添加失败'
                })
              }
            })
          } else if (this.state === 'update') {
            updateRoam(this.postForm.roamId, this.postForm).then(res => {
              if (res.data.code === 200) {
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
        })
        setTimeout(() => {
          if (this.postForm.lngLat && this.postForm.lngLat.coordinates) {
            marker = new window.creeper.Marker({
              draggable: true
            }).setLngLat(this.postForm.lngLat.coordinates)
              .addTo(this.vectorMap)
            this.postForm.lngLat = this.postForm.lngLat.coordinates.join(',')
          }
        }, 200)
        this.$refs.ruleForm.clearValidate()
        this.loaddingMap = false
      })
    },
    resetForm() {
      this.postForm = {
        roamType: 2,
        location: ''
      }
    }
  },
  watch: {
    campusId() {
      if (this.state === 'update' && this.isFisrt) {
        this.isFisrt = false
      } else {
        this.typeArr = []
        this.loaddingMap = true
        this.resetForm()
        this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
        this.initMap()
      }
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
        if (res.data.code === 0) {
          let arr = res.data.data.content.filter(item=>item.zones.filter(element=>element.mapZoneByZoneId.is2D).length > 0)
          this.campus = arr.map(item=>{
            item.zones = item.zones.filter(element=>element.mapZoneByZoneId.is2D)
            return item
          })
          this.campusId = this.campus[0].zones[this.campus[0].zones.length-1].mapZoneByZoneId.id
          this.vectorMap = new window.creeper.VectorMap('map', this.campusId, window.g.MAP_URL)
        }
      })
    } else {
      campusList().then(res => {
        if (res.data.code === 0) {
          let arr = res.data.data.content.filter(item=>item.zones.filter(element=>element.mapZoneByZoneId.is2D).length > 0)
          this.campus = arr.map(item=>{
            item.zones = item.zones.filter(element=>element.mapZoneByZoneId.is2D)
            return item
          })
        }
      })
      infoRoam(this.postForm.roamId).then(res => {
        if (res.data.code === 200) {
          this.postForm = res.data.data
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
    this.isOver = (document.getElementById('slider-content').offsetHeight - document.getElementById('slider-height').offsetHeight) > 0
  }
}
