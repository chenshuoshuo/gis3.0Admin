<template>
  <div class="app-container add-style">
    <el-form :model="uploadStyleForm" ref="uploadStyleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="样式名称:">
            <el-input v-model="uploadStyleForm.name" prop="name" @focus="restName" @blur="checkName"></el-input>
            <span class="error" v-if="formError.name">{{formError.name}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="缩略图:">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="upload"
          :show-file-list="false"
          :on-change="beforeAvatarUpload"
          >
          <img v-if="uploadStyleForm.icon" :src="uploadStyleForm.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">建议尺寸172 x 116(px)</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否为模板: ">
        <el-radio v-model="uploadStyleForm.template" label="1">是</el-radio>
        <el-radio v-model="uploadStyleForm.template" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="是否发布：">
        <el-radio v-model="uploadStyleForm.visible" label="1">是</el-radio>
        <el-radio v-model="uploadStyleForm.visible" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="样式代码: ">
        <el-row :gutter="24">
          <el-col :span="12" style="position: relative">
            <json-editor v-model="uploadStyleForm.content" @changed="getJsonVal" id="jsoncontent"></json-editor>
            <div class="view-wrap">
              <el-button @click="viewMap" type="success">运行</el-button>
            </div>
            <span class="error" v-if="formError.content">{{formError.content}}</span>
          </el-col>
          <el-col :span="10">
            <div ref="basicMapbox" id='map'></div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" size="medium">提交</el-button>
        <el-button @click="resetForm" size="medium">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
	import Axios from 'axios'
  import JsonEditor from '@/components/JsonEditor'
	import mapboxgl from 'mapbox-gl'
  import {fetchAddStyle, fetchUpdateStyle, fetchGetStyle} from "../../api/style";
  import { uploadIcon } from '@/api/zone'

  export default {
    name: 'addStyle',
    components: {JsonEditor, mapboxgl},
    data() {
      return {
        uploadStyleForm: {
          name: '',
          thumbnail: '',
          content: '',
          template: '1',
          visible: '1',
          icon:"",
          id:"",
          createTime:""
        },
        addStyleForm: {
          
        },
        valid: true,
        formError: {
          name: '',
          thumbnail: '',
          content: '',
          template: '1'
        },
        dialogImageUrl: '',
        dialogVisible: false,
        is_Edit:false,
      }
    },
    methods: {
      upload(param){
//      let self = this;
//      var fileObj = param.file;
//      var form = new FormData();
//      form.append("iconFile", fileObj);
//      uploadIcon(form).then(res=>{
//        if(res.data.code===0){
//          this.uploadStyleForm.icon = res.data.data.url
//          this.$forceUpdate();
//        }
//      })
      },
			beforeAvatarUpload(param) {
				let file  = param.raw;
	      let reader = new FileReader();
	      reader.readAsDataURL(file);
	      reader.onload = ()=>{
	      		this.uploadStyleForm.icon = reader.result;
	      }
      },
      restName() {
        this.formError.name = ''
        this.valid = true
      },
      checkName() {
        let re = /[，\s_'’‘\"”“|\\~#$@%^&*!。;\/<>\?？]/
        if (!this.uploadStyleForm.name) {
          this.formError.name = '请输入样式名称'
          this.valid = false
        }
        if (re.test(this.uploadStyleForm.name)) {
          this.formError.name = '样式名称不能包含特殊字符'
          this.valid = false
        }
      },
      restCode() {
        this.formError.content = ''
        this.valid = true
      },
      checkCode() {
        if (!this.uploadStyleForm.content) {
          this.formError.content = "请输入样式代码"
          this.valid = false
        }
      },
      submitForm() {
        this.checkName()
          this.checkCode()
        if (this.valid) {
          
          let loading = this.$loading({text: "加载中"})
          if(this.is_Edit){
          	this.uploadStyleForm.template == '1' ? this.uploadStyleForm.template = true : this.uploadStyleForm.template = false
	          this.uploadStyleForm.visible == '1' ? this.uploadStyleForm.visible = true : this.uploadStyleForm.visible = false
          	fetchUpdateStyle(this.id, this.uploadStyleForm).then(response => {
	            loading.close()
	            if (response.data.code == 0) {
	              this.$alert('区域修改成功！', '消息提示', {
	                confirmButtonText: '确定',
	                callback: ()=>{
		                this.$router.push({
		                  path:'/styleManger/page'
		                })
		              }
	              })
	            } else {
	              this.$alert('区域修改失败，稍后再试！', '消息提示', {
	                confirmButtonText: '确定'
	              })
	            }
	          })
          }else{
          	
	          this.addStyleForm.template=this.uploadStyleForm.template
	          this.addStyleForm.visible=this.uploadStyleForm.visible
	          
	          this.addStyleForm.template=this.addStyleForm.template == '1' ? true : false
	          this.addStyleForm.visible=this.addStyleForm.visible == '1' ? true : false
	          
          	this.addStyleForm.name=this.uploadStyleForm.name
          	this.addStyleForm.content=this.uploadStyleForm.content
          	this.addStyleForm.icon=this.uploadStyleForm.icon
	          fetchAddStyle(this.addStyleForm).then(response => {
	            loading.close()
	            this.resetForm()
	            if (response.data.code == 0) {
	              this.$alert('区域创建成功！', '消息提示', {
	                confirmButtonText: '确定',
	                callback: ()=>{
		                this.$router.push({
		                  path:'/styleManger/page'
		                })
		              }
	              })
	            } else {
	              this.$alert('区域创建失败，稍后再试！', '消息提示', {
	                confirmButtonText: '确定'
	              })
	            }
	          })
          }

        }
      },
      resetForm() {
        this.addStyleForm.name = ''
        this.addStyleForm.thumbnail = ''
        this.addStyleForm.content = ''
        this.addStyleForm.template = '1'
        this.valid = true
        this.formError.name = ''
        this.formError.content = ''
        this.addStyleForm.visible = '1'
      },
      getJsonVal(val) {
       	this.restCode()
        this.valid = true
        this.addStyleForm.content = val
      },
      viewMap() {
	      this.map.setStyle(JSON.parse(this.addStyleForm.content))
     }
    },
    mounted() {
      if (this.$route.params.id) {

				fetchGetStyle(this.$route.params.id).then(response => {
          let updata=response.data.data;
          this.uploadStyleForm.name=updata.name;
          this.uploadStyleForm.content=JSON.parse(updata.content);
          this.uploadStyleForm.template=updata.template?'1':'0';
          this.uploadStyleForm.visible=updata.visible?'1':'0';
          this.uploadStyleForm.icon=updata.icon
          this.uploadStyleForm.id=updata.id
          this.uploadStyleForm.createTime=updata.createTime
          this.id=updata.id;
          this.is_Edit=true;
          let _this=this;
          setTimeout(function(){
            _this.viewMap();
          },50)
	      })
      }
      
      mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZXd1IiwiYSI6ImNpdTR0cndlNDAwMWYyenM0emNlY2wzdXIifQ.b6ES6ewS-L7PXgrX4HoWUA'
      this.map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: {}
      })

    }

  }
</script>
<style>
  .add-style .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .add-style .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .add-style .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .add-style .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style scoped>
 @import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
  .add-style #map {
    height: 300px;
    width: 100%;
    border: 1px solid #e5e5e5;
  }

  .add-style .error {
    color: red;
  }
  .add-style #jsoncontent{
  	height: 700px;
  	overflow-y: auto;
  }
  .add-style .view-wrap {
    position: absolute;
    right: 5px;
    top: 0;
    z-index: 999;
  }
</style>

