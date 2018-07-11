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
        <el-row :gutter="10">
          <el-col :span="10" style="position: relative">
            <json-editor :value="addStyleForm.content" @changed="getJsonVal"></json-editor>
            <div class="view-wrap">
              <el-button @click="viewMap" type="success">运行</el-button>
            </div>
            <span class="error" v-if="formError.content">{{formError.content}}</span>
          </el-col>
          <el-col :span="10">
            <vue-mapbox-map id='map'
                            :access-token='scene.accessToken'
                            :interactive='false'
                            :geocoder='false'
                            :lng='scene.lng'
                            :lat='scene.lat'
                            :zoom='scene.zoom'
                            :pitch='scene.pitch'
                            :bearing='scene.bearing'
                            :mapStyle="scene.mapStyle"
            ></vue-mapbox-map>
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
  import JsonEditor from '@/components/JsonEditor'
  import VueMapboxMap from 'vue-mapbox-map'
  import {fetchAddStyle} from "../../api/style";

  export default {
    name: 'addStyle',
    components: {JsonEditor, VueMapboxMap},
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
        scene: {
          accessToken: "pk.eyJ1IjoiZnJlZXd1IiwiYSI6ImNpdTR0cndlNDAwMWYyenM0emNlY2wzdXIifQ.b6ES6ewS-L7PXgrX4HoWUA",
          lng: 104.06073229826927,
          lat: 30.597184959710276,
          zoom: 13,
          pitch: 20,
          bearing: 0,
          mapStyle: 'mapbox://sprites/mapbox/streets-v8'
        }
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
        this.mapStyle = this.addStyleForm.content
      }
    }

  }
</script>
<style scoped>
  @import url("https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css");
  @import url("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css");
  #map {
    height: 300px;
    width: 100%;
  }

  .error {
    color: red;
  }
  .view-wrap {
    position: absolute;
    right: 5px;
    top: 0;
    z-index: 999;
  }
</style>

