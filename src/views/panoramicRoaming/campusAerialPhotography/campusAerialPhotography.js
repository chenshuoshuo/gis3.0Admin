import waves from '@/directive/waves' // 水波纹指令
import {
  addRoam,
  updateRoam,
  delRoam,
  infoRoam,
  pageRoam
} from '@/api/roam'
import { campusList } from '@/api/campus'
export default {
  directives: {
    waves
  },
  data() {
    return {
      state: '',
      showForm: false,
      multipleSelection: [],
      list: [],
      total: 0,
      campus: [],
      listLoading: false,
      listQuery: {
        page: 1,
        pageSize: 10,
        roamType: 1
      },
      formData: {
        roamType: 1
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.page--
      pageRoam(this.listQuery).then(res => {
        if (res.data.code === 200) {
          this.list = res.data.data.content
          this.total = res.data.data.totalElements
        } else {
          this.$message({
            type: 'error',
            message: '列表获取失败'
          })
        }
      }).finally(() => {
        this.listLoading = false
        this.listQuery.page++
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getCampus() {
      campusList().then(res => {
        if (res.data.code === 200) {
          const arr = res.data.data.content.filter(item => item.zones.filter(element => element.mapZoneByZoneId.is2D).length > 0)
          this.campus = arr.map(item => {
            item.zones = item.zones.filter(element => element.mapZoneByZoneId.is2D)
            return item
          })
        }
      })
    },
    handleAdd() {
      this.state = 'add'
      this.showForm = true
    },
    handleClose() {
      this.formData = { roamType: 1 }
      this.$refs.postForm.resetFields()
    },
    handleEdit(id) {
      this.state = 'edit'
      infoRoam(id).then(res => {
        if (res.data.code === 200) {
          this.formData = res.data.data
          this.showForm = true
        } else {
          this.$message({
            type: 'error',
            message: '航拍信息获取失败'
          })
        }
      })
    },
    handlerSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
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

        })
      } else {
        this.$alert('请选择要删除的数据', '消息提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    handleSubmit() {
      this.isSub = true
      if (this.state === 'add') {
        addRoam(this.formData).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.getList()
            this.showForm = false
          } else {
            this.$message({
              type: 'warning',
              message: '添加失败'
            })
          }
        }).finally(() => {
          this.isSub = false
        })
      } else if (this.state === 'edit') {
        delete this.formData.lngLat
        updateRoam(this.formData.roamId, this.formData).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '更新成功'
            })
            this.getList()
            this.showForm = false
          } else {
            this.$message({
              type: 'warning',
              message: '更新失败'
            }).finally(() => {
              this.isSub = false
            })
          }
        })
      }
    },
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoam(fileid).then(res => {
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
  beforeMount() {
    this.getList()
    this.getCampus()
  }
}
