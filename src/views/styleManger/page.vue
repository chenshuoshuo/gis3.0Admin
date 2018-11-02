<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form">
        <el-form-item label="样式名称:">
          <el-input style="width: 200px;" class="filter-item" placeholder="请输入" v-model="listQuery.name">
          </el-input>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handlerSearch">搜索</el-button>
          <router-link to="/styleManger/addStyle">
            <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-menu">新增模板
            </el-button>
          </router-link>
        </el-form-item>
      </el-form>
      <div class="all">共搜索到了{{total}}条数据</div>
      <div class="main-content">
        <div class="list" v-for=" (item,index) in list" :key="index">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="left"><img :src="item.icon" alt=""></div>
            </el-col>
            <el-col :span="15">
              <div class="right">
                <div class="right-top">
                  <p class="title">{{item.name}}</p>
                  <div class="options">
                    <el-button type="primary" icon="el-icon-star-off" size="medium" v-if="!item.is_template"
                               @click.native="setTemplate(item)">设为模板
                    </el-button>
                    <el-button type="primary" icon="el-icon-star-on" size="medium" v-if="item.is_template" style="background:#fff;color: #66b1ff;">样式模板
                    </el-button>
                    <router-link :to="{path:'/styleManger/addStyle/'+item.id}">
                    	<el-button type="success" icon="el-icon-edit" size="medium">编辑</el-button>
                    </router-link>
                    <el-button type="danger" icon="el-icon-delete" size="medium" @click="handlerDelete(item)">删除
                    </el-button>
                  </div>
                </div>
                <div class="right-bottom">最后编辑于 {{item.create_time}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {fetchList, fetchDelete, fetchUpdateStyle} from "../../api/style"

  export default {
    name: 'styleManger',
    data() {
      return {
        list: [],
        total: 0,
        listQuery: {
          page: 0,
          pageSize: 20,
          name: ''
        }
      }
    },
    methods: {
      loadData() {
        let loading = this.$loading({text: "加载中"})
        fetchList(this.listQuery).then(response => {
          loading.close()
          this.list = response.data.data.content
          this.total = response.data.data.totalElements
        })
      },
      deletData(item) {
        this.$confirm('此操作将永久删除'+item.name+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetchDelete(item.id).then(response => {
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
      handlerSearch() {
        this.loadData()
      },
      handlerEdit(id) {
        this.editData(id)
      },
      handlerDelete(id) {
        this.deletData(id)
      },
      setTemplate(item) {
        this.$alert('确认设为模板？', '消息提示', {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action == "confirm") {
              item.is_template = true
              fetchUpdateStyle(item.id, item).then(res => {
                this.$message("设置成功！")
              })
            }
          }
        })
      }
    },
    mounted() {
      this.loadData()
    }
  }
</script>

<style scoped>
  .main-content {
    width: 90%;
    margin: 0 auto;
  }

  .list {
    width: 100%;
    height: 150px;
    border: 1px solid #eee;
    box-shadow: 0px 5px 5px #ddd;
    margin-top: 30px;
  }

  .all {
    font-size: 14px;
    color: #777;
  }

  .left {
    margin: 17px;
  }
	
	.left img{
		width: 100%;
		max-height: 112px;
    object-fit: contain;
	}
	
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #606226;
    text-indent: 30px;
  }

  .right-top {
    display: flex;
    flex-direction: row;
    height: 80px;
    width: 130%;
    align-items: center;
    justify-content: space-between;
  }

  .right-bottom {
    height: 50px;
    line-height: 50px;
    width: 130%;
    background: #f8f8f8;
    color: #909399;
    font-style: 14px;
    text-indent: 30px;
    border-radius: 5px;
  }
</style>

