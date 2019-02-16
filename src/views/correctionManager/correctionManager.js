import waves from '@/directive/waves' // 水波纹指令
import { pageCorrect, delCorrect, blukDeleteCorrect } from '@/api/correct'
import { campusList } from '@/api/campus'
export default {
  inject: ['baseUrl'],
  directives: {
    waves
  },
  data() {
    return {
      multipleSelection: [],
      list: null,
      pos: '',
      total: 0,
      listLoading: false,
      pic: [],
      showPos: false,
      showPic: false,
      vectorMap: null,
      marker: null,
      initMap: true,
      campus: [],
      listQuery: {
        page: 1,
        pageSize: 10
      },
      formData: {
      }
    }
  },
  methods: {
    getList() {
      this.listQuery.page--
      pageCorrect(this.listQuery).then(res => {
        this.listQuery.page++
        if (res.data.code === 200) {
          this.list = res.data.data.content
          this.total = res.data.data.totalCount
        } else {
          this.$message({
            type: 'warning',
            message: '列表获取失败'
          })
        }
      })
    },
    getCampus() {
      campusList().then(res => {
        if (res.data.code === 0) {
          let arr = res.data.data.content.filter(item=>item.zones.filter(element=>element.mapZoneByZoneId.is2D).length > 0)
          this.campus = arr.map(item=>{
            item.zones = item.zones.filter(element=>element.mapZoneByZoneId.is2D)
            return item
          })
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClose() {
      this.formData = {}
      this.$refs.postForm.resetFields()
    },
    handlerSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleView(list) {
      this.showPic = true
      this.pic = list
    },
    addMaker() {
      setTimeout(() => {
        this.marker = new window.creeper.Marker()
          .setLngLat(this.pos)
          .addTo(this.vectorMap)
        this.vectorMap.flyTo({
          center: this.pos,
          zoom: 16
        })
      }, 200)
    },
    handlePos(pos) {
      this.showPos = true
      this.pos = pos.coordinates
      if (this.initMap) {
        this.initMap = false
        setTimeout(() => {
          window.creeper.CreeperConfig.token = 'cWluY2hlbmdqaWU6MTIzNDU2'
          this.vectorMap = new window.creeper.VectorMap('map', 1, window.g.MAP_URL)
          this.addMaker()
        }, 200)
      } else {
        this.addMaker()
      }
    },
    handleRemoveMaker(done) {
      this.marker.remove()
      done()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDeletMany() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          blukDeleteCorrect(this.multipleSelection.map(item => item.errorId)).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败'
              })
            }
          })
        })
      } else {
        this.$alert('请选择要删除的数据', '消息提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCorrect(fileid).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败'
            })
          }
        })
      })
    }

  },
  mounted() {
    this.getList()
    this.getCampus()
  }
}
