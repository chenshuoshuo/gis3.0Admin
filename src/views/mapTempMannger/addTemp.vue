<template>
  <div class="app-container">
    <el-form :model="updateTempForm" ref="updateTempForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="模板名称:">
            <el-input v-model="updateTempForm.name" prop="name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="组名:">
	          <el-input v-model="updateTempForm.groups"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="内容:">
	          <el-input
						  type="textarea"
						  :rows="10"
						  placeholder="请输入内容"
						  v-model="updateTempForm.content">
						</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm" size="medium" v-loading.fullscreen.lock="submitLoading">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
	import { fetchTemp, fetchUpdataTemp, fetchAddTemp } from '@/api/mapTempMannger'
	
  export default {
    data() {
      return {
      	submitLoading: false,
        updateTempForm: {
        	content:"",
        	groups:"",
					id:"",
					name:""
        }
      }
    },
    methods: {
      submitForm() {
      	if(this.$route.query.id){
      		fetchUpdataTemp(this.updateTempForm).then(response => {
	          this.submitLoading = false
	          if (response.data.code === 0) {
	            this.$alert('模板编辑成功！', '消息提示', {
	              confirmButtonText: '确定',
	              callback: ()=>{
	                this.$router.push({
	                  path:'/mapTempMannger/list'
	                })
	              }
	            })
	
	          }
	        })
      	}else{
      		let addTempForm={};
      				addTempForm.content=this.updateTempForm.content;
      				addTempForm.groups=this.updateTempForm.groups;
      				addTempForm.name=this.updateTempForm.name;
      		fetchAddTemp(addTempForm).then(response => {
	          this.submitLoading = false
	          if (response.data.code === 0) {
	            this.$alert('模板创建成功！', '消息提示', {
	              confirmButtonText: '确定'
	            }).then(()=>{
	              this.$router.push({
	                path:'/mapTempMannger/list'
	              })
	            })
	          }
	          
	        })
      		
      	}
      }
    },
    mounted() {
      if(this.$route.query.id){
        fetchTemp(this.$route.query.id).then(res=>{
          if(res.status){
          	this.updateTempForm = res.data.data;
          }
        })
      }

    }

  }
</script>
<style scoped>
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
  
  .add-group-list{
  	list-style: none;
  	padding: 5px 0;
  	margin: 0;
  	border-bottom: 1px solid #CAD3DF;
  	width: 430px;
  	min-height: 41px;
  }
  .add-group-list li{
  	background: #EDF5FF;
  	border: 1px solid #D3E7FF;
  	color: #56A3FF;
  	border-radius: 3px;
  	float: left;
  	margin-right: 10px;
  	font-size: 12px;
  	padding-left: 10px;
  	line-height: 28px;
  }
  .del-group-btn{
		width: 28px;
		height: 28px;
		float: right;
		background: url(../../assets/images/del-group-btn.png) no-repeat center;
		cursor: pointer;
	}
</style>

