<template>
  <div class="import-box">
    <el-dialog
      title="导入"
      :visible.sync="showUpload"
      width="300px">
      <div class="file-choice">
        <el-form :show-message="false" ref="form" :model="form">
          <el-form-item prop="fileName" required>
            <el-input type="text" v-model="form.fileName" readonly/>
          </el-form-item>
        </el-form>
        <div class="upload-button">
          <el-upload
            action=""
            ref="upload"
            :http-request="handleImport"
            accept=".xlsx"
            :limit="1"
            :show-file-list="false">
            <el-button size="small" class="upload" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subFile" :loading="hasFile">确认上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { importExcel } from '@/api/import'
  export default {
    props: {
      uploadUrl: {
        type: String,
        require: true
      },
      update:{
        type: Function,
        require: true
      }
    },
    data() {
      return {
        file: null,
        hasFile: false,
        showUpload: false,
        progressValue: 0,
        form:{
          fileName: '',
        }
      }
    },
    methods: {
      openUpload() {
        this.showUpload = true
      },
      handleImport(params) {
        this.file = params.file
        this.form.fileName = this.file.name
      },
      createWebSocket() {
        const url = new URL(window.g.BASE_IPS)
        const ws = new WebSocket('ws://' + url.host + '/cmips/websocket')
        // 建立 web socket 连接成功触发事件
        ws.onopen = () => {
          // 使用 send() 方法发送数据
          ws.send(window.cmips_userId)
          this.$notify({
            title: '成功',
            message: 'webSocket建立连接',
            type: 'success'
          })
        }
        // 接收服务端数据时触发事件
        ws.onmessage = (evt) => {
          var received_msg = evt.data
          console.log('接收到数据', received_msg)
        }

        // 断开 web socket 连接成功触发事件
        ws.onclose = () => {
          this.$notify.error({
            title: '错误',
            message: 'webSocket链接已断开'
          })
        }
      },
      subFile() {
        this.$refs.form.validate(val=>{
          if (val) {
            this.hasFile = true
            const form = new FormData()
            form.append('file', this.file)
            form.append('userId', window.cmips_userId)
            importExcel(this.uploadUrl,form).then(res => {
              if (res.data.code === 0) {
                this.$notify({
                  title: '成功',
                  message: '数据导入成功',
                  type: 'success'
                })
                this.file = null
                this.hasFile = false
                this.showUpload = false
                this.form.fileName = ''
                this.$refs.upload.clearFiles()
                this.update()
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '数据导入失败'
                })
                this.hasFile = false
              }
            })
          }
        })
        // this.createWebSocket()
      }
    }
  }
</script>

<style lang="scss">
  .import-box{
    .file-choice{
      position: relative;
    }
    .el-dialog__body{
      padding: 10px 20px;
    }
    .el-dialog__footer{
      text-align: center;
    }
    .upload{
      position: absolute;
      top:0;
      right: 0;
      padding: 11px 15px;
    }
  }
</style>