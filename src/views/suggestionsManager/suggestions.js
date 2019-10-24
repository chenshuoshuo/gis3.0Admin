import { pageFeedback, delFeedback, bulkDeleteFeedback } from '@/api/feedBack'
import waves from '@/directive/waves' // 水波纹指令
export default {
  inject: ['baseUrl'],
  directives: {
    waves
  },
  data() {
    return {
      multipleSelection: [],
      list: [],
      showPic: false,
      pic: [],
      total: 0,
      listLoading: false,
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
      pageFeedback(this.listQuery).then(res => {
        this.listQuery.page++
        if (res.data.status) {
          this.list = res.data.data.content
          this.total = res.data.data.totalElements
        } else {
          this.$message({
            type: 'warning',
            message: '列表获取失败'
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
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleView(list) {
      this.showPic = true
      this.pic = list
    },
    handleDeletMany() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删选中的意见反馈, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bulkDeleteFeedback(this.multipleSelection.map(item => item.feedbackId)).then(res => {
            if (res.data.status) {
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
      this.$confirm('此操作将永久删除该意见反馈, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delFeedback(fileid).then(res => {
          if (res.data.status) {
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
  }
}
