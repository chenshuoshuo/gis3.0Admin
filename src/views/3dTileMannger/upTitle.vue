<template>
  <div class="app-wrap">
    <div class="form-item">
      <span class="label">地图名称：</span>
      <el-select v-model="formUpTitle.zoneid" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="form-item">
      <div class="updec">
        <span class="label">上传文件：</span>
        <el-button type="primary" icon="el-icon-upload2" style="position: relative;background: #42b983 ; border: none">
          <input type="file" accept=".zip" @change="getFile($event)" ref="upload" id="upload"
                 style="position: absolute;left:0;top:0;width: 100%;height: 100%;opacity: 0"/>{{upText}}
        </el-button>
        <span class="formdesc">仅支持扩展名：.zip</span>
      </div>
    </div>
    <div class="form-item" style="margin: 70px">
      <el-button type="primary" @click="handleUpload">提交</el-button>
      <el-button>重置</el-button>
    </div>


  </div>
</template>
<script>
  import {fetchZoneList} from "../../api/zone"
  import {fetchAddtTile,fetchTileGet,fetchTileUpdate} from "../../api/tile"

  export default {
    name: "upTitle",
    data() {
      return {
        options: [],
        upText: '上传文件',
        formUpTitle: {
          zoneid: '',
          file: '',
          name: '',
          fileid:''
        },
        listQuery: {
          page: 1,
          pageSize: 20
        }
      }
    },
    methods: {
      getFile(event) {
        this.formUpTitle.file = document.getElementById('upload').files[0]
        this.upText = document.getElementById('upload').files[0].name
      },
      getZoneList() {
        fetchZoneList(this.listQuery).then(response => {
          this.options = response.data.data.list
        })
      },
      handleUpload() {
        let loading = this.$loading()
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].id == this.formUpTitle.zoneid) {
            this.formUpTitle.name = this.options[i].name
            break
          }
        }
        let param = new FormData() //创建form对象
        param.append('zipFile', this.formUpTitle.file)//通过append向form对象添加数据
        param.append('zoneid', this.formUpTitle.zoneid)
        param.append('name', this.formUpTitle.name)
        if(this.formUpTitle.fileid){
          param.append('fileid',this.formUpTitle.fileid)
          fetchTileUpdate(param).then(res=>{
            if(res.data.code===0){
              this.formUpTitle.zoneid = ''
              this.upText = "上传文件"
              loading.close()
              this.$alert('3d瓦片更新成功！', '消息提示', {
                confirmButtonText: '确定'
              }).then(()=>{
                this.$router.push({
                  path:"/3dTileMannger/3dlist"
                })
              })
            }
          })
        }else{
          fetchAddtTile(param).then(res => {
            this.formUpTitle.zoneid = ''
            this.upText = "上传文件"
            loading.close()
            this.$alert('3d瓦片创建成功！', '消息提示', {
              confirmButtonText: '确定'
            }).then(()=>{
              this.$router.push({
                path:"/3dTileMannger/3dlist"
              })
            })
          })
        }
        
      }
    },
    mounted() {
      this.getZoneList()
      if(this.$route.params.id){
        fetchTileGet(this.$route.params.id).then(res=>{
          if(res.data){
            this.formUpTitle.fileid = res.data.data.fileid;
            this.formUpTitle.name = res.data.data.name;
            this.formUpTitle.zoneid = res.data.data.zoneid;
          }
        })
      }
    }
  }

</script>

<style scoped>
  .app-wrap {
    margin: 40px;
  }

  .form-item {
    margin-bottom: 30px;
    position: relative;
  }

  .label {
    font-size: 14px;
    color: #666;
  }

  .formdesc {
    font-size: 12px;
    color: #ccc;
    margin-left: 20px;
  }
</style>
