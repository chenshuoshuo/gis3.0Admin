import waves from '@/directive/waves' // 水波纹指令
export default {
  directives: {
    waves
  },
  data() {
    return {
      picUrl:'',
      searchIconUrl:'',
      state:'',
      showForm:false,
      multipleSelection: [],
      list: [
        {number:'1',buildCategoryName:'行政楼'}
      ],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        page_size: 10,
      },
      showReviewer: false,
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
    handleAdd(){
      this.state = 'add'
      this.showForm = true
    },
    handleClose(){
      this.formData = {email:''}
      this.$refs.postForm.resetFields();
    },
    handleEdit(id){
      this.state = 'edit'
      this.showForm = true;
      // getUser(id).then(res=>{
      //   this.formData = res.data;
      //   this.showForm = true;
      // })
    },
    handleConfig(){
      this.state = 'config';
      this.showForm = true;
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
          this.propgress = true
        })
      } else {
        this.$alert('请选择要删除的数据', '消息提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    handleSubmit(){
      if(this.state==='add'){
        createUser(this.formData).then(res=>{
          if(res.data.code==0){
              this.$message({
                  type:"success",
                  message:"添加成功!"
              })
              this.showForm = false;
              this.getList();
          }else{
              this.$message({
                  type: 'warning',
                  message: '添加失败!'
              })
          }
        })
      }else if(this.state === 'edit'){
        delete this.formData.password
        updateUser(this.formData.id,this.formData).then(res=>{
          if(res.data){
              this.$message({
                  type:"success",
                  message:"更新成功!"
              })
              this.showForm = false;
              this.getList();
          }else{
              this.$message({
                  type: 'warning',
                  message: '更新失败!'
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
    //this.getList()
  }
}