<template>
<div class="app-container authoriz-list">
  <div class="filter-container">
    <el-form ref="form">
      <el-form-item label="应用名称:">
        <el-input  style="width: 200px;" class="filter-item"  placeholder="请输入" >
        </el-input>
        <el-button class="filter-item" type="primary" icon="el-icon-search" >搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus">创建新应用</el-button>
        <!-- 编辑应用 -->
        <el-dialog :visible.sync="editApp" width="20%">
          <div slot="title" class="dialog-header">
            <i class="el-icon-edit-outline"></i>编辑应用
          </div>
          <el-form label-width="100px">
            <el-form-item label="应用名称：" required>
              <el-input autocomplete="off" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editApp = false">取 消</el-button>
            <el-button type="primary" @click="editApp = false">修改</el-button>
          </div>
        </el-dialog>
        <!-- 添加key -->
        <el-dialog :visible.sync="addKey" width="35%" class="add-key">
          <div slot="title" class="dialog-header">
            <i class="el-icon-plus"></i>为{{appName}}添加key
          </div>
          <el-form label-width="180px" label-position="left">
            <el-form-item label="应用名称：" required>
              <el-input autocomplete="off" v-model="keyForm.appName" placeholder="支持汉字、数字、字母、下划线、中划线，不超过15个"></el-input>
            </el-form-item>
            <el-form-item label="服务平台：" required>
              <el-radio-group v-model="keyForm.platform">
                <el-radio :label="1">Android平台</el-radio>
                <el-radio :label="2">IOS平台</el-radio>
                <el-radio :label="3">Web端(JS API)</el-radio>
                <el-radio :label="4">Web服务</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 安卓 -->
            <div v-if="keyForm.platform==1">
              <el-form-item required>
                <span slot="label">
                  发布版安全码SHA1：<br/>
                  <a href="#" class="get-way">如何获取</a>
                </span>
                <el-input autocomplete="off" placeholder="请输入发布版安全码SHA1"></el-input>
              </el-form-item>
              <el-form-item label="调试版安全码SHA1：" required>
                <el-input autocomplete="off" placeholder="请输入调试版安全码SHA1"></el-input>
              </el-form-item>
              <el-form-item required>
                <span slot="label">
                  PackageName：<br/>
                  <a href="#" class="get-way">如何获取</a>
                </span>
                <el-input autocomplete="off" placeholder="请输入包名：如com.test.sdlk"></el-input>
              </el-form-item>
            </div>
            <!-- ios -->
            <div v-if="keyForm.platform==2">
              <el-form-item required>
                <span slot="label">
                  安全Bundle ID：<br/>
                  <a href="#" class="get-way">如何获取</a>
                </span>
                <el-input autocomplete="off" placeholder="请输入安全妈Bundle ID"></el-input>
              </el-form-item>
            </div>
            <!-- web端 -->
            <div v-if="keyForm.platform==3">
              <el-form-item label="域名白名单：">
                <el-input
                  type="textarea"
                  :rows="5"
                  :placeholder="`非必填，留空表示无域名限制${'\n'}添加域名白名单后，只有白名单的域名可访问服务${'\n'}域名填写格式，如：www.amap.com，多个域名请每行写一条`"
                  v-model="textarea">
                </el-input>
              </el-form-item>
            </div>
            <!-- web服务 -->
            <div v-if="keyForm.platform==4">
              <el-form-item label="IP白名单：">
                <el-input
                  type="textarea"
                  :rows="4"
                  :placeholder="`非必填，留空表示无IP限制${'\n'}添加IP白名单后，只有白名单的IP可访问服务${'\n'}IP应该设定为服务器出口IP段，支持设定IP段，如202.202.0.*多个IP请每行写一条`"
                  v-model="textarea">
                </el-input>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addKey = false">取 消</el-button>
            <el-button type="primary" @click="addKey = false">修改</el-button>
          </div>
          <div class="tip">
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div slot="content">
                <p>规范命名会让数据统计和数据分析更准确</p>
                <p>建议命名方式:<span style="color:rgb(64,159,255)">[应用名+应用场景]</span></p>
                <p>如:神州专车-司机端;神州专车-Demo等</p>
              </div>
              <span class="el-icon-question">命名规范</span>
            </el-tooltip>
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
  <div class="conent-wrap">
    <el-collapse accordion>
      <el-collapse-item v-for="(item,index) in authoriz" :key="index">
          <template slot="title">
            <div  class="title-content first">
              <div class="name">{{item.name}}</div>
              <div class="time">创建时间：{{item.time|parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
              <div class="options">
                <el-button type="text" icon="el-icon-edit-outline" @click.stop="handleEdit">编辑</el-button>
                <el-button type="text" icon="el-icon-delete" @click.stop="handleDelete">删除</el-button>
                <el-button type="text" icon="el-icon-plus" round class="add-key" @click.stop="handleAdd(item)">添加新key</el-button>
              </div>
            </div>
          </template>
          <el-table
            :data="item.data"
            border
            style="width: 100%;">
            <el-table-column align="center" prop="name" label="key名称">
            </el-table-column>
            <el-table-column align="center" prop="key" label="key" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" prop="bind" label="绑定服务">
            </el-table-column>
            <el-table-column  align="center" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary" size="small">设置</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</div>
</template>

<script>
    import { parseTime } from '@/utils'
    export default {
        name: "authorizList",
        data(){
          return{
            editApp:false,
            addKey:false,
            appName:'',
            keyForm:{
              platform:1
            },
            authoriz:[
              {name:"惯性导航",time:new Date().getTime(),data:[{name:"这是key名称",key:"abcdefghadfadfadfahtregsfgsr",bind:"Android平台"}]},
              {name:"惯性导航",time:new Date().getTime(),data:[{name:"这是key名称",key:"abcdefghadfadfadfahtregsfgsr",bind:"Android平台"}]},
              {name:"惯性导航",time:new Date().getTime(),data:[{name:"这是key名称",key:"abcdefghadfadfadfahtregsfgsr",bind:"Android平台"}]},
              {name:"惯性导航",time:new Date().getTime(),data:[{name:"这是key名称",key:"abcdefghadfadfadfahtregsfgsr",bind:"Android平台"}]},
              {name:"惯性导航",time:new Date().getTime(),data:[{name:"这是key名称",key:"abcdefghadfadfadfahtregsfgsr",bind:"Android平台"}]},
              {name:"惯性导航",time:new Date().getTime(),data:[{name:"这是key名称",key:"abcdefghadfadfadfahtregsfgsr",bind:"Android平台"}]},
            ]
          }
        },
        methods:{
          handleEdit(){
            this.editApp = true;
          },
          handleDelete(){

          },
          handleAdd(params){
            this.addKey = true;
            this.appName = params.name;
          }
        }
    }
</script>
<style lang="scss">
    .authoriz-list{
      .el-collapse{
        border:0;
      }
      .add-key{
        .el-form-item{
          margin-bottom: 20px;
        }
        .el-radio+.el-radio{
          margin: 0;
          margin-right: 20px;
        }
        .el-radio{
          margin-right:20px;
          line-height: 2em;
        }
        .el-form-item__label{
          line-height: 1.8em;
        }
        .el-dialog__body{
          padding-right: 100px;
          padding-bottom: 10px;
        }
        .el-dialog__footer{
          padding-right: 100px;
        }
        .get-way::before{
          content: '';
          margin-right: 12px;
        }
        .get-way{
          color: rgb(64, 158, 255);
        }
      }
      
      div.is-active{
        background-color: #409EFF;
        color: #fff;
        border-radius: 6px 6px 0 0;
        border-bottom: 0;
        .options button{
          color: #fff;
          background: transparent;
        }
      }
      .tip{
        position: absolute;
        top: 84px;
        right: 20px;
        color: rgb(42,197,248)
      }
      .dialog-header{
        font-size: 16px;
        color: #fff;
        .el-icon-edit-outline{
          vertical-align: middle;
          margin-right: 4px;
        }
      }
      .el-dialog__header{
        background-color: rgb(64, 158, 255);
        padding: 6px 20px;
      }
      .el-dialog__headerbtn{
        top: 16px;
      }
      .el-dialog__close{
        color: #fff;
        &:hover{
          color: #fdfdfd;
        }
      }
      .el-collapse-item{
        margin-top: 16px;
        border: 1px solid #ebeef5;
        border-radius: 6px;
        box-shadow: 0 3px 6px #ddd;
        .el-collapse-item__header{
          border-radius: 6px;
          border-bottom: 0;
          &:hover{
            background-color: rgba(64, 158, 255, .85);
            color: #fff;
            button{
              color: #fff;
              background: transparent;
            }
          }
        }
      }
      .el-collapse-item__wrap{
        border:0;
      }
      .el-table::before{
        height: 0;
      }
      .el-collapse-item__content{
        padding: 0;
      }
      .el-table--border, .el-table--group{
        border: 0;
      }
    } 
</style>

<style scoped lang="scss">
    .conent-wrap{
      margin-top: 30px;
    }
    .title-content{
      display: flex;
      flex-direction: row;
      padding-right: 20px;
      border-radius:6px;
      .name{
        font-size: 16px;
        font-weight: bolder;
        margin: 0 30px;
      }
      .options{
        flex:1;
        text-align: right;
        button{
          background: transparent;
        }
        button.add-key{
          border: 1px solid #dcdfe6;
        }
      }
    }
</style>
