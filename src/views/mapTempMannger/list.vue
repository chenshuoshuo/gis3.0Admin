<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form">
        <el-form-item label="模板名称:">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"  placeholder="请输入" v-model="listQuery.name" >
          </el-input>
          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
          <router-link :to="{path:'/mapTempMannger/addTemp'}">
          	<el-button class="filter-item" style="margin-left: 20px;" icon="el-icon-edit" type="primary" @click="handleFilter">添加</el-button>
          </router-link>
          <el-button class="filter-item" icon="el-icon-edit" type="primary" @click="handleFilter">删除</el-button>
          <el-button class="filter-item" @click="handleDownTemp" type="primary">下载导入模板</el-button>
          <!--<el-button class="filter-item" @click="handleCreate" type="primary">批量导入</el-button>-->
          <el-button class="filter-item" @click="dialogFormVisible = true" type="primary" icon="el-icon-upload2">导入</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column width="150px" align="center" label="模板名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="组名">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.groups}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" align="center" label="内容">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  type="primary" size="mini" @click="handleDown(scope.row.id)">下载</el-button>
          <router-link :to="{path:'/mapTempMannger/addTemp',query:{id:scope.row.id}}">
          	<el-button type="success" size="mini">编辑</el-button>
          </router-link>
          <el-button  type="danger" size="mini" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    
    
    <el-dialog title="批量导入" :visible.sync="dialogFormVisible" width="440px">
		  <div class="upload-input-box">
		  	<label for="">选择文件：</label>
		  	<div class="upload-input">
			  	<input type="file" name="fileUpload" class="fileUpload" v-on:change="handleFiles($event)" ref="upload" id="upload" />
			  	<span>{{uploadText}}</span>
		  	</div>
		  </div>
		  
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleUpload">确 定</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
  import { fetchTempList, fetchDelTemp, fetchDownloadtTemp, fetchUploadTemp } from '@/api/mapTempMannger'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]

  // arr to obj ,such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'zoneManger',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          page_size: 10,
          name: ''
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        pvData: [],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        uploadText: '未上传任何文件',
        dialogFormVisible: false,
        fileList: ''
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        var nowQuery=this.listQuery;
      			nowQuery.page--;
        fetchTempList(this.listQuery).then(response => {
        	this.listQuery.page++;
          this.list = response.data.data.content
          this.total = response.data.data.totalElements
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.page_size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'

          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleFiles(obj) {
      	console.log(obj)
					this.fileList = document.getElementById('upload').files[0]
        	this.uploadText = document.getElementById('upload').files[0].name
			},
      handleUpload() {
        let param = new FormData() //创建form对象
        param.append('presentFile', this.fileList)//通过append向form对象添加数据
        let loading = this.$loading()
        fetchUploadTemp(param).then(res=>{
            loading.close()
            console.log(res)
            if(res.data.code===0){
              this.dialogFormVisible = false
              this.upText = "上传文件"
              this.$alert('上传成功！', '消息提示', {
                confirmButtonText: '确定'
              })
            }
          })
    },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464

          }
        })
      },
      handleDownTemp() {

				window.location.href=window.g.ApiUrl + "map/v1/present/export/";

      },
      handleDown(id){
      	fetchDownloadtTemp(id).then(response => {
        	console.log(response)
        })
      },
      handleDel(id){
      	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetchDelTemp(id).then(response => {
          	console.log(response)
            if (response.data.status == 0) {
              this.loadData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败!'
              })
            }
          })
        })
//    	fetchDelTemp(id).then(response => {
//      	console.log(response)
//      })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.upload-input-box{
	overflow: hidden;
	line-height: 32px;
	label{
		float: left;
	}
	.upload-input{
		float:left;
		width: 200px;
		height: 32px;
		border: 1px solid #e5e5e5;
		text-align: center;
		cursor: pointer;
		position: relative;
		border-radius: 5px;
		.fileUpload {
		  width: 100%;
		  height: 100%;
		  position: absolute;
		  top: 0;
		  left: 0;
		  opacity: 0;
		}
	}
}
</style>
