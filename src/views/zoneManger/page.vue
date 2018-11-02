<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form">
        <el-form-item label="地图名称:">
          <el-input style="width: 200px;" class="filter-item" placeholder="请输入" v-model="listQuery.name">
          </el-input>
          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索
          </el-button>

            <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus"> <router-link to="/zoneManger/addZone">添加地图样式</router-link>
            </el-button>

          <el-button class="filter-item" type="danger" :loading="downloadLoading" v-waves icon="el-icon-delete"
                     @click="handleDeletMany">删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <P class="total">共搜索到{{total}}条数据</P>
    <div class="propgress" v-if="propgress">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row
              style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" ref="multipleTable">
      </el-table-column>
      <el-table-column width="88px" align="center" label="地图ICON">
        <template slot-scope="scope">
          <span ><img class="icon" :src="scope.row.icon" alt=""></span>
        </template>
      </el-table-column>
      <el-table-column width="" label="地图名称" align="center">
        <template slot-scope="scope">
          <span >{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="地图类型">
        <template slot-scope="scope">
          <span>{{scope.row.is2D?"2D":"3D"}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" label="默认地图等级" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.defaultZoom}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最小地图等级" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.minZoom}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最大地图等级" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.maxZoom}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="地图样式" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.style_id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间" min-width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="{path:'/zoneManger/addZone',query: {id: scope.row.id}}">
            <el-button type="success" size="mini">编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,40]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
	import Axios from 'axios'
  import { fetchZoneList, fetchDelZone } from '@/api/zone'
  import waves from '@/directive/waves' // 水波纹指令
  import {parseTime} from '@/utils'
  let Base64 = require('js-base64').Base64;

  const calendarTypeOptions = [
    {key: 'CN', display_name: 'China'},
    {key: 'US', display_name: 'USA'},
    {key: 'JP', display_name: 'Japan'},
    {key: 'EU', display_name: 'Eurozone'}
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
        multipleSelection: [],
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        propgress: false,
        percentage: 0,
        listQuery: {
          page: 1,
          pageSize: 10
        },
        importanceOptions: [1, 2, 3],
        showReviewer: false,
        temp: {
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
        rules: {
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          title: [{required: true, message: 'title is required', trigger: 'blur'}]
        },
        downloadLoading: false
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
    	
        fetchZoneList(nowQuery).then(response => {
        	this.listLoading = false
        	if(response.status){
        		this.listQuery.page++;
		        this.list = response.data.data.content
		        this.total = response.data.data.total
        	}
        })
				
      },
      handleFilter() {
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleModifyStatus(row) {
        this.$confirm('此操作将永久删除'+row.name+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetchDelZone(row.id).then(response => {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
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
                this.propgress = false
                fetchDelZone(this.multipleSelection[i].id).then(response => {
                  this.getList()
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                })
              }else {
                fetchDelZone(this.multipleSelection[i].id).then(response => {

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
      }
    }
  }
</script>
<style scoped>
  p.total {
    font-size: 14px;
    color: #999;
    margin-bottom: 20px;
  }
  .icon{
    width: 100%;
  }
</style>
