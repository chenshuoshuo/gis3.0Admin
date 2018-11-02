<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form">
        <el-form-item label="地图名称:">
          <el-input style="width: 200px;" class="filter-item" placeholder="请输入" v-model="listQuery.name">
          </el-input>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handlerSearch">搜索</el-button>
          <el-button class="filter-item" type="primary" v-waves icon="el-icon-upload2" @click="dialogFormVisible = true">上传
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-for="item in list" @click="slotChange(item.id)">
    	<el-collapse accordion>
			  <el-collapse-item :title="item.name" :name="item.id">
			    <template slot="title">
			     	<span class="zone-title">地区：{{item.name}}</span>
			     	<el-button class="zone-delete-btn" type="danger" v-waves icon="el-icon-delete" @click.stop="handlerDelete(item)">删除
	          </el-button>
			    </template>
			    <el-table :key='tableKey' :data="rasterList" v-loading="listLoading" element-loading-text="给我一点时间" border fit
	              highlight-current-row
	              style="width: 100%">
			      <el-table-column
			        type="selection"
			        width="55">
			      </el-table-column>
			      <el-table-column width="" label="名称" align="center">
			        <template slot-scope="scope">
			          <span >{{scope.row.refName}}</span>
			        </template>
			      </el-table-column>
			      <el-table-column width="110px" align="center" label="id">
			        <template slot-scope="scope">
			          <span>{{scope.row.id}}</span>
			        </template>
			      </el-table-column>
			      <el-table-column width="110px" align="center" label="zoneId">
			        <template slot-scope="scope">
			          <span>{{scope.row.zoneId}}</span>
			        </template>
			      </el-table-column>
			      <el-table-column align="center" label="操作" width="200px" class-name="small-padding fixed-width">
			        <template slot-scope="scope">
			          <el-button type="danger" size="mini" @click.stop="handleDeleteSingle(scope.row)">删除</el-button>
			        </template>
			      </el-table-column>
			    </el-table>
			  </el-collapse-item>
			  
			</el-collapse>
    </div>
    
    <el-dialog title="批量导入" :visible.sync="dialogFormVisible" width="440px">
    	<div class="upload-input-box">
		  	<label for="">mapId：</label>
	    	<el-select v-model="mapId" placeholder="请选择">
			    <el-option
			      v-for="item in list"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
		  	
		  </div>
		  <div class="upload-input-box">
		  	<label for="">上传dbfFile：</label>
		  	<div class="upload-input">
			  	<input type="file" name="fileDbfFile" class="fileUpload" v-on:change="handleDbfFileFiles($event)" ref="dbfFile" id="dbfFile" />
			  	<span>{{uploadText.dbfFile}}</span>
		  	</div>
		  </div>
		  <div class="upload-input-box">
		  	<label for="">上传shpFile：</label>
		  	<div class="upload-input">
			  	<input type="file" name="fileShpFile" class="fileUpload" v-on:change="handleShpFileFiles($event)" ref="shpFile" id="shpFile" />
			  	<span>{{uploadText.shpFile}}</span>
		  	</div>
		  </div>
		  <div class="upload-input-box">
		  	<label for="">上传shxFile：</label>
		  	<div class="upload-input">
			  	<input type="file" name="fileShpFile" class="fileUpload" v-on:change="handleShxFileFiles($event)" ref="shxFile" id="shxFile" />
			  	<span>{{uploadText.shxFile}}</span>
		  	</div>
		  </div>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleSureUpload">确 定</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
  import {fetchZoneList, fetchRasterGet,fetchUploadRaster,fetchDeleteSingle} from "@/api/3dDataAdmin";
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'tdlist',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: [],
        total: null,
        listLoading: false,
        listQuery: {
        	name:'',
        	only_raster:true,
          page: 1,
          pageSize: 10
        },
        rasterListQuery: {
        	zone_id: '',
          page: 0,
          page_size: 100
        },
        rasterList: [],
        mapId:'',
        uploadText: {
        	dbfFile:'未上传任何文件',
        	shpFile:'未上传任何文件',
        	shxFile:'未上传任何文件'
        },
        dialogFormVisible: false,
        fileList: {}
      }

    },
    methods: {
    	handlerSearch() {
        this.loadData()
      },
    	loadData() {
        let loading = this.$loading({text: "加载中"})
        let listQuery=this.listQuery
        		listQuery.page--;
        fetchZoneList(listQuery).then(response => {
          loading.close()
          this.listQuery.page++;
          this.list = response.data.data.content
          this.total = response.data.data.totalElements
        })
      },
      handleDbfFileFiles(obj) {
					this.fileList.dbfFile = document.getElementById('dbfFile').files[0]
        	this.uploadText.dbfFile = document.getElementById('dbfFile').files[0].name
			},
			handleShpFileFiles(obj) {
					this.fileList.shpFile = document.getElementById('shpFile').files[0]
        	this.uploadText.shpFile = document.getElementById('shpFile').files[0].name
			},
			handleShxFileFiles(obj) {
					this.fileList.shxFile = document.getElementById('shxFile').files[0]
        	this.uploadText.shxFile = document.getElementById('shxFile').files[0].name
			},
      handleSureUpload() {
        let param = new FormData() //创建form对象
        param.append('mapId', this.mapId)
        param.append('dbfFile', this.fileList.dbfFile)
        param.append('shpFile', this.fileList.shpFile)
        param.append('shxFile', this.fileList.shxFile)
        let loading = this.$loading()
        fetchUploadRaster(param).then(res=>{
            loading.close()
            if(res.data.code==0){
              this.mapId = ''
              this.uploadText.dbfFile = "上传文件"
              this.uploadText.shpFile = "上传文件"
              this.uploadText.shxFile = "上传文件"
              this.$alert('上传成功！', '消息提示', {
                confirmButtonText: '确定'
              }).then(()=>{
                this.dialogFormVisible = false
              })
            }
          })
    },
			handlerDelete(row){
      	this.$confirm('此操作将永久删除'+row.name+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetchRasterDelete(row.id).then(response => {
            if (response.data.code == 0) {
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
     },
     handleDeleteSingle(row){
     		this.$confirm('此操作将永久删除'+row.refName+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetchDeleteSingle(row.id).then(response => {
            if (response.data.code == 0) {
              this.loadData()
              this.slotChange(this.rasterListQuery.zone_id)
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
     },
     slotChange(id){
     	this.rasterListQuery.zone_id=id
     	fetchRasterGet(this.rasterListQuery).then(response => {
					this.rasterList = response.data.data.content
        })
     }
    },
    mounted() {
      this.loadData()
    }
  }
</script>

<style lang="scss">
	.zone-title{
		font-size: 18px;
	}
  .zone-delete-btn {
    float: right;
    margin: 6px 10px 0 0;
  }
  .upload-input-box{
		overflow: hidden;
		line-height: 32px;
		margin-top: 8px;
		label{
			float: left;
			width: 100px;
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
