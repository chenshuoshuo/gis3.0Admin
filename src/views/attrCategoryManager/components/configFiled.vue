<template>
  <el-dialog title="配置字段" width="1000px" :visible.sync="dialogFormVisible" class="config-filed">
    <div class="tip-box">
      <el-alert
        title="字段中文名建议不超过6个字,最多12个字"
        type="warning"
        :closable="false" class="alert">
      </el-alert>
      <el-button type="primary" style="float:right;" @click="handleSub">提交</el-button>
    </div>
    <div class="fileds-List">
      <div class="title item">
        <div class="name">字段中文名</div>
        <div class="type">字段类型</div>
        <div class="sort">排序序号</div>
        <div class="required">必填</div>
        <div class="display">显示</div>
        <div class="space"></div>
      </div>
      <div class="item" v-for="(item,index) of fields" :key="index">
        <div class="name">
          <el-input type="text" v-model="item.columnCnname" placeholder="请输入内容"></el-input>
        </div>
        <div class="type">
          <el-select v-model="item.columnType" placeholder="请选择">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="sort"><el-input v-model="item.orderid" type="text"></el-input></div>
        <div class="required">
          <el-radio v-model="item.required" :label="true">是</el-radio>
          <el-radio v-model="item.required" :label="false">否</el-radio>
        </div>
        <div class="display">
          <el-radio v-model="item.show" :label="true">是</el-radio>
          <el-radio v-model="item.show" :label="false">否</el-radio>
        </div>
        <div class="space">
          <el-button type="primary" icon="el-icon-plus" circle @click="addColumn" v-if="index === fields.length-1"></el-button>
          <el-button type="danger" icon="el-icon-minus" circle @click="delColumn(item.columnId,index)"></el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      fields: {
        type: Array,
        default: () => []
      }
    },
    model: {
      prop: 'fields',
      event: 'change'
    },
    data() {
      return {
        dialogFormVisible: false,
        types: [
          // 0：文本；1：日期；2：富文本
          { label: '普通文本框', value: 0 },
          { label: '活动文本框', value: 2 }
        ]
      }
    },
    methods: {
      addColumn() {
        this.fields.push({
          'columnCnname': '',
          'columnType': '',
          'required': true,
          'show': true,
          'orderid': 0
        })
        this.$forceUpdate()
        this.$emit('change', this.fields)
      },
      delColumn(id, index) {
        if (this.fields.length === 1) {
          return
        }
        if (id) {
          this.$confirm('此操作将永久删除该字段, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.fields.splice(index, 1)
            this.$emit('del-column', id)
          })
        } else {
          this.fields.splice(index, 1)
        }
      },
      close() {
        this.dialogFormVisible = false
      },
      open() {
        this.dialogFormVisible = true
      },
      handleSub() {
        this.$emit('http-request', this.fields)
      }
    },
    updated() {
      if (this.fields.length === 0) {
        this.addColumn()
      }
    }
  }
</script>

<style lang="scss">
  .config-filed{
    .alert{
      display: inline;
      border-radius: 0;
    }
    .el-dialog__body{
      padding-bottom: 30px;
    }
    .fileds-List{
      margin-top: 40px;
      .title{
        font-size: 18px;
        font-weight: bold;
      }
      .item{
        display: flex;
        align-items: baseline;
        margin-top: 20px;
        div{
          margin-right: 20px;
        }
        .name,.type{
          flex: 3;
        }
        .sort{
          width: 80px;
        }
        .required,.display,.space{
          flex: 2;
        }
      }
    }
  }
</style>
