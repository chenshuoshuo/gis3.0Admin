<template>
<div class="app-container">
  <div class="filter-container">
    <el-form ref="form">
      <el-form-item label="应用名称:">
        <el-input  style="width: 200px;" class="filter-item"  placeholder="请输入" >
        </el-input>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" >搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;"  type="success" icon="el-icon-plus">创建新应用</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!--<div class="conent-wrap">
    <el-collapse accordion>
      <el-collapse-item>
          <template slot="title">
            <div  class="title-content first">
              <div class="name">惯性导航</div>
              <div class="time">创建时间：2018-12-6</div>
              <div class="options">
                <el-button type="primary" icon="el-icon-edit-outline">编辑</el-button>
                <el-button type="primary" icon="el-icon-delete">删除</el-button>
                <el-button icon="el-icon-plus" round>添加新key</el-button>
              </div>
            </div>
          </template>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
  <div class="conent-wrap">
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          <div  class="title-content">
            <div class="name">惯性导航</div>
            <div class="time">创建时间：2018-12-6</div>
            <div class="options">
              <el-button type="primary" icon="el-icon-edit-outline">编辑</el-button>
              <el-button type="primary" icon="el-icon-delete">删除</el-button>
              <el-button icon="el-icon-plus" round>添加新key</el-button>
            </div>
          </div>
        </template>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>-->
</div>
</template>

<script>
    export default {
        name: "authorizList"
    }
</script>
<style scoped lang="scss">
   .conent-wrap{
     margin-top: 30px;
     border:1px solid #ddd;
     border-radius: 10px;
     box-shadow: 0 3px 6px #ddd;
   }
    .fr{
      display: flex;
      flex-direction: row;
      .name{
        font-size: 16px;
        font-weight: bold;
        margin: 0 30px;

      }
      .options{
        flex:1;
        text-align: right;
        button{
          background: transparent;
          color:#fff;
        }
      }
    }
</style>
