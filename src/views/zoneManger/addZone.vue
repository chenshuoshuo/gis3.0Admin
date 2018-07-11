<template>
  <div class="addZone">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="padding-right: 20px">
      <el-row :gutter="10">
        <el-col :md="5" :sm="8">
          <el-form-item label="是否是二维" prop="is_2d">
            <el-select v-model="ruleForm.is_2d" placeholder="请选择地图类型">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="5" :sm="8">
          <el-form-item label="地图名称:" prop="name">
            <el-input v-model="ruleForm.name" placeholder="地图名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5" :sm="8">
          <el-form-item label="地图样式" prop="style_id">
            <el-select v-model="ruleForm.style_id" placeholder="请选择地图样式">
              <el-option label="样式一" value="1"></el-option>
              <el-option label="样式二" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="5" :sm="8">
          <el-form-item label="默认地图等级:" prop="default_zoom">
            <el-input v-model="ruleForm.default_zoom" placeholder="默认地图等级" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5">
          <el-form-item label="最小等级:" prop="min_zoom">
            <el-input v-model="ruleForm.min_zoom" placeholder="最小等级" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5" :sm="8">
          <el-form-item label="最大等级:" prop="max_zoom">
            <el-input v-model="ruleForm.max_zoom" placeholder="最大等级" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="2">
        <el-col :md="5" :sm="8">
          <el-form-item label="包围盒子:" prop="bboxLeftBottomLon">
            <el-input v-model="ruleForm.bboxLeftBottomLon" placeholder="左下角经度" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5" :sm="8">
          <el-form-item prop="bboxLeftBottomLat">
            <el-input v-model="ruleForm.bboxLeftBottomLat" placeholder="左下角纬度" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5" :sm="8">
          <el-form-item prop="bboxRightTopLon">
            <el-input v-model="ruleForm.bboxRightTopLon" placeholder="右上角经度" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5" :sm="8">
          <el-form-item prop="bboxRightTopLat">
            <el-input v-model="ruleForm.bboxRightTopLat" placeholder="右上角纬度" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="2">
        <el-col :md="5" :sm="10">
          <el-form-item label="地图中心点:" prop="center_lon">
            <el-input v-model="ruleForm.center_lon" placeholder="中心点经度" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5" :sm="10">
          <el-form-item prop="center_lat">
            <el-input v-model="ruleForm.center_lat" placeholder="中心点纬度" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地图ICON:" prop="icon">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="medium"  v-loading.fullscreen.lock="submitLoading">提交</el-button>
        <el-button @click="resetForm('ruleForm')" size="medium">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { fetchAddZone, fetchZone, fetchUpdataZone } from "../../api/zone";

  export default {
    name: 'addZone',
    data() {
      /**
       * @param rule 规则
       * @param value 输入值
       * @param callback 回调
       */
      let vaildName = (rule, value, callback) => {
        let re = /[，\s_'’‘\"”“|\\~#$@%^&*!。;\/<>\?？]/
        if (!value) {
          callback(new Error('请输入地图名称'))
        } else if (re.test(value)) {
          callback(new Error('地图名称不能包含特殊字符'))
        } else {
          callback()
        }
      }

      let vaildZoom = (rule, value, callback) => {
        let regPos = /^\d+(\.\d+)?$/
        let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
        if (!value) {
          callback(new Error('请输入正确的地图等级'))
        } else if (!regPos.test(value) && !regNeg.test(value)) {
          callback(new Error('地图等级必须为数字！'))
        } else if (value > 25 || value < 0) {
          callback(new Error('请输入0-25之间的数字'))
        } else {
          callback()
        }
      }

      let vaildlon = (rule, value, callback) => {
        let regPos = /^\d+(\.\d+)?$/
        let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
        if (!value) {
          callback(new Error('请输入正确的经度值'))
        } else if (!regPos.test(value) && !regNeg.test(value)) {
          callback(new Error('经度值必须为数字！'))
        } else if (value > 180 || value < -180) {
          callback(new Error('请输入-180-180之间的数字'))
        } else {
          callback()
        }
      }
      let vaildlat = (rule, value, callback) => {
        let regPos = /^\d+(\.\d+)?$/
        let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
        if (!value) {
          callback(new Error('请输入正确的纬度值'))
        } else if (!regPos.test(value) && !regNeg.test(value)) {
          callback(new Error('纬度值必须为数字！'))
        } else if (value > 90 || value < -90) {
          callback(new Error('请输入-90-90之间的数字'))
        } else {
          callback()
        }
      }
      return {
        submitLoading: false,
        ruleForm: {
          name: '',
          style_id: '',
          default_zoom: '',
          min_zoom: '',
          max_zoom: '',
          bbox: '',
          bboxLeftBottomLon: '',
          bboxLeftBottomLat: '',
          bboxRightTopLon: '',
          bboxRightTopLat: '',
          center: '',
          center_lon: '',
          center_lat: '',
          id: ''

        },
        rules: {
          name: [
            { validator: vaildName, trigger: 'blur' }
          ],
          style_id: [
            { required: true, message: '请选择地图样式', trigger: 'change' }
          ],
          default_zoom: [
            { validator: vaildZoom, trigger: 'blur' }
          ],
          min_zoom: [
            { validator: vaildZoom, trigger: 'blur' }
          ],
          max_zoom: [
            { validator: vaildZoom, trigger: 'blur' }
          ],
          bboxLeftBottomLon: [
            { validator: vaildlon, trigger: 'blur' }
          ],
          bboxLeftBottomLat: [
            { validator: vaildlat, trigger: 'blur' }
          ],
          bboxRightTopLon: [
            { validator: vaildlon, trigger: 'blur' }
          ],
          bboxRightTopLat: [
            { validator: vaildlat, trigger: 'blur' }
          ],
          center_lon: [
            { validator: vaildlon, trigger: 'blur' }
          ],
          center_lat: [
            { validator: vaildlat, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.id) {
              this.updateZone()
            }else {
              this.creatZone()
            }
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      creatZone() {
        this.submitLoading = true
        this.ruleForm.bbox = `${this.ruleForm.bboxLeftBottomLon},${this.ruleForm.bboxLeftBottomLat},${this.ruleForm.bboxRightTopLon},${this.ruleForm.bboxLeftBottomLat}`
        this.ruleForm.center = `${this.ruleForm.center_lon},${this.ruleForm.center_lat}`
        fetchAddZone(this.ruleForm).then(response => {
          this.submitLoading = false
          if (response.data.code === 0) {
            this.$alert('区域创建成功！', '消息提示', {
              confirmButtonText: '确定'
            })
            this.resetForm('ruleForm')
          }
        })
      },
      updateZone() {
        this.submitLoading = true
        this.ruleForm.bbox = `${this.ruleForm.bboxLeftBottomLon},${this.ruleForm.bboxLeftBottomLat},${this.ruleForm.bboxRightTopLon},${this.ruleForm.bboxLeftBottomLat}`
        this.ruleForm.center = `${this.ruleForm.center_lon},${this.ruleForm.center_lat}`
        fetchUpdataZone(this.ruleForm).then(response => {
          this.submitLoading = false
          if (response.data.code === 0) {
            this.$alert('区域更新成功！', '消息提示', {
              confirmButtonText: '确定',
              callback: ()=>{
                this.resetForm('ruleForm')
                this.$router.back()
              }
            })

          }
        })
      }
    },
    mounted() {
      if (this.$route.query.id) {
        fetchZone(this.$route.query.id).then(response => {
          let bbox = response.data.data.bbox.split(',')
          let center = response.data.data.center.split(',')
          this.ruleForm.bboxLeftBottomLon = bbox[0]
          this.ruleForm.bboxLeftBottomLat = bbox[1]
          this.ruleForm.bboxRightTopLon = bbox[2]
          this.ruleForm.bboxRightTopLat = bbox[3]
          this.ruleForm.center_lon = center[0]
          this.ruleForm.center_lat = center[1]
          this.ruleForm.default_zoom = response.data.data.default_zoom
          this.ruleForm.min_zoom = response.data.data.min_zoom
          this.ruleForm.max_zoom = response.data.data.max_zoom
          this.ruleForm.icon = response.data.data.icon
          this.ruleForm.is_2d = response.data.data.is_2d
          this.ruleForm.style_id = response.data.data.style_id
          this.ruleForm.name = response.data.data.name
          this.ruleForm.id = response.data.data.id
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .addZone {
    margin-top: 20px;
  }
</style>
