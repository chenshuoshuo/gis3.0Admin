<template>
  <div class="app-container role-manager">
    <div class="filter-container">
        <el-form ref="form" label-position="left"  :inline="true">
            <el-form-item label="角色名称:">
                <el-input class="filter-item" placeholder="请输入" v-model="listQuery.username">
                </el-input>
            </el-form-item>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handlerSearch">搜索
            </el-button>
            <router-link to="/systemSetting/editRole">
                <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit">添加
                </el-button>
            </router-link>
            <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="handleDeletMany">删除
            </el-button>
        </el-form>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row
              style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column width="200px" align="center" label="角色名称">
        <template slot-scope="scope">
          <span>{{scope.row.rolename}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="功能权限" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.permission}}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" label="更新时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.update_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleModifyStatus(scope.row.fileid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  export default {
    directives: {
      waves
    },
    data() {
      return {
        multipleSelection: [],
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          pageSize: 10,
          username: '',
          phone:''
        },
        showReviewer: false,
        list:[
            {rolename:"系统管理员",permission:"全部功能",role:"admin",update_time:new Date().getTime()},
            {rolename:"系统管理员",permission:"全部功能",role:"admin",update_time:new Date().getTime()},
            {rolename:"系统管理员",permission:"全部功能",role:"admin",update_time:new Date().getTime()},
            {rolename:"系统管理员",permission:"全部功能",role:"admin",update_time:new Date().getTime()},
            {rolename:"系统管理员",permission:"全部功能",role:"admin",update_time:new Date().getTime()},
            {rolename:"系统管理员",permission:"全部功能",role:"admin",update_time:new Date().getTime()},
        ]
      }

    },
    methods: {
      getList() {
        this.listLoading = true
        fetchTitleList(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        })
      },
      handleSelectionChange(val) {

        this.multipleSelection = val
        console.log(this.multipleSelection)
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
            for (let i = 0; i < this.multipleSelection.length; i++) {
              this.percentage = (i + 1) / this.multipleSelection.length

              if ((i + 1) == this.multipleSelection.length) {
                fetchTitleDelete(this.multipleSelection[i].fileid).then(response => {
                  this.getList()
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                })
              } else {
                fetchTitleDelete(this.multipleSelection[i]['fileid']).then(response => {

                })
              }
            }
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
          fetchTitleDelete(fileid).then(response => {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
      }

    },
    mounted() {
      //this.getList()
    }
  }
</script>

