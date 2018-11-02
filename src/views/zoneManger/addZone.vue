<template>
  <div class="addZone">
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="padding-right: 20px">
      <el-row :gutter="10">
        <el-col :md="5" :sm="8">
          <el-form-item label="是否是二维:" prop="is2D">
            <el-select v-model="ruleForm.is2D" placeholder="请选择地图类型">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="5" :sm="8">
          <el-form-item label="地图名称:" prop="name">
            <el-input v-model="ruleForm.name" placeholder="地图名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5" :sm="8">
          <el-form-item label="地图样式:" prop="styleId">
            <el-select v-model="ruleForm.styleId" placeholder="请选择地图样式">
              <el-option
					      v-for="item in styleList"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="5" :sm="8">
          <el-form-item label="默认地图等级:" prop="defaultZoom">
            <el-input v-model="ruleForm.defaultZoom" placeholder="默认地图等级" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5">
          <el-form-item label="最小等级:" prop="minZoom">
            <el-input v-model="ruleForm.minZoom" placeholder="最小等级" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5" :sm="8">
          <el-form-item label="最大等级:" prop="maxZoom">
            <el-input v-model="ruleForm.maxZoom" placeholder="最大等级" type="number"></el-input>
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
          class="avatar-uploader"
          action=""
          :http-request="upload"
          :show-file-list="false"
          :on-change="beforeAvatarUpload"
          >
          <img v-if="ruleForm.icon" :src="ruleForm.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">建议尺寸88 x 88(px)</div>
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
  import { fetchAddZone, fetchZone, fetchUpdataZone, uploadIcon } from "../../api/zone";
  import { fetchList } from "../../api/style"

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
          bboxLeftBottomLon: '',
          bboxLeftBottomLat: '',
          bboxRightTopLon: '',
          bboxRightTopLat: '',
          center_lon: '',
          center_lat: '',
          is2D: '',
          name: '',
          styleId: '',
          defaultZoom: '',
          minZoom: '',
          maxZoom: '',
          bbox: '',
          center: '',
          id: '',
          icon:''
        },
        addForm: {
        	
        },
        styleList: [],
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
      beforeAvatarUpload(param) {
				let file  = param.raw;
	      let reader = new FileReader();
	      reader.readAsDataURL(file);
	      reader.onload = ()=>{
	      		this.ruleForm.icon = reader.result;
	      }
      },
      upload(param){
        let self = this;
      },
      resetForm(formName) {
        this.ruleForm = {};
        this.$refs['ruleForm'].resetFields();
      },
      creatZone() {
        this.submitLoading = true
        this.addForm.bbox = `${this.ruleForm.bboxLeftBottomLon},${this.ruleForm.bboxLeftBottomLat},${this.ruleForm.bboxRightTopLon},${this.ruleForm.bboxLeftBottomLat}`
        this.addForm.center = `${this.ruleForm.center_lon},${this.ruleForm.center_lat}`
        this.addForm.is2D = this.ruleForm.is2D==1?true:false
        this.addForm.defaultZoom = this.ruleForm.defaultZoom
        this.addForm.icon = this.ruleForm.icon
        this.addForm.maxZoom = this.ruleForm.maxZoom
        this.addForm.minZoom = this.ruleForm.minZoom
        this.addForm.name = this.ruleForm.name
        this.addForm.styleId = this.ruleForm.styleId
        fetchAddZone(this.addForm).then(response => {
          this.submitLoading = false
          if (response.data.code === 0) {
            this.$alert('区域创建成功！', '消息提示', {
              confirmButtonText: '确定'
            }).then(()=>{
              this.resetForm('ruleForm')
              this.$router.push({
                path:'/zoneManger/page'
              })
            })
          }
          
        })
      },
      updateZone() {
        this.submitLoading = true
        this.addForm.bbox = `${this.ruleForm.bboxLeftBottomLon},${this.ruleForm.bboxLeftBottomLat},${this.ruleForm.bboxRightTopLon},${this.ruleForm.bboxLeftBottomLat}`
        this.addForm.center = `${this.ruleForm.center_lon},${this.ruleForm.center_lat}`
        this.addForm.is2D = this.ruleForm.is2D==1?true:false
        this.addForm.defaultZoom = this.ruleForm.defaultZoom
        this.addForm.icon = this.ruleForm.icon
        this.addForm.maxZoom = this.ruleForm.maxZoom
        this.addForm.minZoom = this.ruleForm.minZoom
        this.addForm.name = this.ruleForm.name
        this.addForm.id = this.ruleForm.id
        this.addForm.styleId = this.ruleForm.styleId
        fetchUpdataZone(this.addForm).then(response => {
          this.submitLoading = false
          if (response.data.code === 0) {
            this.$alert('区域更新成功！', '消息提示', {
              confirmButtonText: '确定',
              callback: ()=>{
                this.resetForm('ruleForm')
                this.$router.push({
                  path:'/zoneManger/page'
                })
              }
            })

          }
        })
      }
    },
    mounted(){
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
          this.ruleForm.defaultZoom = response.data.data.defaultZoom
          this.ruleForm.minZoom = response.data.data.minZoom
          this.ruleForm.maxZoom = response.data.data.maxZoom
          this.ruleForm.icon = response.data.data.icon
          this.ruleForm.is2D = response.data.data.is2D?1:0
          this.ruleForm.styleId = response.data.data.styleId
          this.ruleForm.name = response.data.data.name
          this.ruleForm.id = response.data.data.id
        })
      }
      
      let styleQuery={page:0,pageSize:100};
      fetchList(styleQuery).then(response => {
	      this.styleList = response.data.data.content
	    })
    }
  }
</script>


<style lang="scss">
  .addZone {
    margin-top: 20px;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
