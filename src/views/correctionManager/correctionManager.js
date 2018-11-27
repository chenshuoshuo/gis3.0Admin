import waves from '@/directive/waves' // 水波纹指令
export default {
  directives: {
    waves
  },
  data() {
    return {
      multipleSelection: [],
      list: [
          {position:'第一教学楼',campus:'南校区',mapType:'二维',correctContent:'名字错误',username:'王晓华',workNumber:'20120120452'}
        ],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        page_size: 10,
      },
      formData:{
      }
    }

  },
  methods: {
    getList() {
      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClose(){
      this.formData = {}
      this.$refs.postForm.resetFields();
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
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(fileid).then(response => {
          if(response.data){
              this.$message({
                  type: 'success',
                  message: '删除成功!'
              })
          }else{
            this.$message({
                type: 'warning',
                message: '删除失败!'
            })
          }
        }).finally(()=>{
          this.getList();
        })
      })
    }

  },
  mounted() {
    this.getList()
  }
}