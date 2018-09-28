<template>
  <div class="app-container">
    <el-form :model="addStyleForm" ref="addStyleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="样式名称:">
            <el-input v-model="addStyleForm.name" prop="name" @focus="restName" @blur="checkName"></el-input>
            <span class="error" v-if="formError.name">{{formError.name}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="缩略图:">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <p style="font-size: 14px;color: #999999">建议尺寸：174×116(px)</p>
      </el-form-item>
      <el-form-item label="是否为模板: ">
        <el-radio v-model="addStyleForm.is_template" label="1">是</el-radio>
        <el-radio v-model="addStyleForm.is_template" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="是否发布：">
        <el-radio v-model="addStyleForm.visible" label="1">是</el-radio>
        <el-radio v-model="addStyleForm.visible" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="样式代码: ">
        <el-row :gutter="24">
          <el-col :span="12" style="position: relative">
            <json-editor :value="addStyleForm.content" @changed="getJsonVal" id="jsoncontent"></json-editor>
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

  export default {
    name: 'addStyle',
    components: {JsonEditor, mapboxgl},
    data() {
      return {
        addStyleForm: {
          name: '',
          thumbnail: '',
          content: '',
          is_template: '1',
          visible: '1'
        },
        valid: true,
        formError: {
          name: '',
          thumbnail: '',
          content: '',
          is_template: '1'
        },
        dialogImageUrl: '',
        dialogVisible: false,
        is_Edit:false,
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      restName() {
        this.formError.name = ''
        this.valid = true
      },
      checkName() {
        let re = /[，\s_'’‘\"”“|\\~#$@%^&*!。;\/<>\?？]/
        if (!this.addStyleForm.name) {
          this.formError.name = '请输入样式名称'
          this.valid = false
        }
        if (re.test(this.addStyleForm.name)) {
          this.formError.name = '样式名称不能包含特殊字符'
          this.valid = false
        }
      },
      restCode() {
        this.formError.content = ''
        this.valid = true
      },
      checkCode() {
        if (!this.addStyleForm.content) {
          this.formError.content = "请输入样式代码"
          this.valid = false
        }
      },
      submitForm() {
        this.checkName()
        this.checkCode()
        if (this.valid) {
          this.addStyleForm.is_template == 1 ? this.addStyleForm.is_template = true : this.addStyleForm.is_template = false
          this.addStyleForm.visible == 1 ? this.addStyleForm.visible = true : this.addStyleForm.visible = false
          let loading = this.$loading({text: "加载中"})

          if(this.is_Edit){
          	fetchUpdateStyle(this.id, this.addStyleForm).then(response => {
	            loading.close()
	            if (response.data.code == 0) {
	              this.$alert('区域修改成功！', '消息提示', {
	                confirmButtonText: '确定'
	              })
	            } else {
	              this.$alert('区域修改失败，稍后再试！', '消息提示', {
	                confirmButtonText: '确定'
	              })
	            }
	          })
          }else{
          	alert("添加")
	          fetchAddStyle(this.addStyleForm).then(response => {
	            loading.close()
	            this.resetForm()
	            if (response.data.code == 0) {
	              this.$alert('区域创建成功！', '消息提示', {
	                confirmButtonText: '确定'
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
        this.addStyleForm.is_template = '1'
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
      if (this.$route.query.id) {

				fetchGetStyle(this.$route.query.id).then(response => {

						let updata=response.data.data;

							this.addStyleForm.name=updata.name;
							this.addStyleForm.content=JSON.parse(updata.content);
							this.addStyleForm.is_template=updata.is_template?'1':'0';
							this.addStyleForm.visible=updata.visible?'1':'0';
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
<style scoped>
 @import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
  #map {
    height: 300px;
    width: 100%;
    border: 1px solid #e5e5e5;
  }

  .error {
    color: red;
  }
  #jsoncontent{
  	height: 700px;
  	overflow-y: auto;
  }
  .view-wrap {
    position: absolute;
    right: 5px;
    top: 0;
    z-index: 999;
  }
</style>

