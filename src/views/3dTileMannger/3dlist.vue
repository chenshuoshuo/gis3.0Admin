<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form">
        <el-form-item label="地图名称:">
          <el-input style="width: 200px;" class="filter-item" placeholder="请输入" v-model="listQuery.name">
          </el-input>
          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handlerSearch">搜索
          </el-button>
          <router-link to="/3dTileMannger/upTitle">
            <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-upload2">上传瓦片
            </el-button>
          </router-link>
          <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete"
                     @click="handleDeletMany">删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row
              style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column width="200px" align="center" label="地图ID">
        <template slot-scope="scope">
          <span>{{scope.row.zoneid}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="地图名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="文件大小">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column width="300px" label="上传时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDownload(scope.row)" style="background: #10bfa4;border:none">下载</el-button>
          <router-link :to="{path:'/3dTileMannger/updateTile/'+scope.row.fileid}">
            <el-button type="success" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          </router-link>
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
  import {fetchTileList, fetchTileDelete,fetchDownloadtTile} from "@/api/tile";
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'tdlist',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        multipleSelection: [],
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          pageSize: 10,
          name: ''
        },
        showReviewer: false,
      }

    },
    methods: {
      getList() {
        this.listLoading = true
        fetchTileList(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        })
      },
      handleDownload(param){
        fetchDownloadtTile(param.fileid).then(res=>{
          if(res.data){
            window.location.href = res.config.url;
          }else{
            this.$message({
              message: '没有可供下载的瓦片',
              type: 'warning'
            })
          }
        })
        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
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
                fetchTileDelete(this.multipleSelection[i].fileid).then(response => {
                  this.getList()
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                })
              } else {
                fetchTileDelete(this.multipleSelection[i]['fileid']).then(response => {

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
          fetchTileDelete(fileid).then(response => {
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
      this.getList()
    }
  }
</script>

