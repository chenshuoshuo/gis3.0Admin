import waves from '@/directive/waves' // 水波纹指令
import {
  pageRoomType,
  createRoomType,
  deleteRoomType,
  bulkDeleteRoomType,
  infoRoomType,
  updateRoomType,
  addMapRtExtendsDefine,
  getMapRtExtendsDefine,
  delMapRtExtendsDefine
} from '@/api/typeManager'
import { mapBuildingTypeDownloadTemplate } from '@/api/downloadTemplate'
import { mapRoomTypeDownload } from '@/api/download'
import configFiled from '../components/configFiled'
export default {
  inject: ['baseUrl'],
  components: {
    configFiled
  },
  directives: {
    waves
  },
  data() {
    return {
      downloading: false,
      isImport: false,
      isExport: false,
      fields: [],
      state: '',
      showForm: false,
      multipleSelection: [],
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 0,
        page_size: 10
      },
      showReviewer: false,
      formData: {
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      // this.listQuery.page--
      pageRoomType(this.listQuery).then(res => {
        // this.listQuery.page++
        this.listLoading = false
        if (res.data.status) {
          this.list = res.data.data.content
          this.total = res.data.data.totalElements
        } else {
          this.$message({
            type: 'warning',
            message: '机构类别列表获取失败，请重试'
          })
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleAdd() {
      this.state = 'add'
      this.showForm = true
    },
    handleClose() {
      this.picUrl = ''
      this.searchIconUrl = ''
      this.$refs.postForm.clearValidate()
      this.formData = {}
    },
    handleDelColumn(id) {
      delMapRtExtendsDefine({
        'columnId': id,
        'typeCode': this.typeCode
      }).then(res => {
        if (res.data.status) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        } else {
          this.$message({
            type: 'warning',
            message: '删除失败'
          })
        }
      })
    },
    handleConfigSub(params) {
      params.forEach(element => {
        element.typeCode = this.typeCode
      })
      addMapRtExtendsDefine(params).then(res => {
        if (res.data.status) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getList()
          this.showForm = false
          this.$refs.config.close()
        } else {
          this.$message({
            type: 'warning',
            message: '添加失败'
          })
        }
      })
    },
    handleEdit(id) {
      this.state = 'edit'
      infoRoomType(id).then(res => {
        if (res.data.status) {
          this.formData = res.data.data
          this.picUrl = this.baseUrl + this.formData.menuIcon
          this.searchIconUrl = this.baseUrl + this.formData.searchIcon
          this.showForm = true
        } else {
          this.$message({
            type: 'warning',
            message: '机构类别信息获取失败，请重试'
          })
        }
      })
    },
    handleConfig(typeCode) {
      this.typeCode = typeCode
      getMapRtExtendsDefine(typeCode).then(res => {
        if (res.data.status) {
          this.fields = res.data.data
          this.$refs.config.open()
        } else {
          this.$message({
            type: 'warning',
            message: '获取扩展字段失败'
          })
        }
      })
    },
    handlerSearch() {
      this.listQuery.page = 0
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      // this.listQuery.page = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val - 1
      this.getList()
    },
    handleAvatarSuccess(res, file) {
      this.formData.menuIcon = res.data
      this.picUrl = URL.createObjectURL(file.raw)
    },
    handleSearchSuccess(res, file) {
      this.formData.searchIcon = res.data
      this.searchIconUrl = URL.createObjectURL(file.raw)
    },
    handleDeletMany() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除选中的房间类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bulkDeleteRoomType(this.multipleSelection.map(item => item.typeCode).join(',')).then(res => {
            if (res.data.status) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败'
              })
            }
          })
        })
      } else {
        this.$alert('请选择要删除的数据', '消息提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    handleSubmit() {
      this.$refs['postForm'].validate(valid => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    save() {
      this.$refs.postForm.validate(val => {
        this.isSub = true
        if (this.state === 'add') {
          createRoomType(this.formData).then(res => {
            if (res.data.status) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.getList()
              this.showForm = false
            } else {
              this.$message({
                type: 'warning',
                message: '添加失败'
              })
            }
          }).finally(() => {
            this.isSub = false
          })
        } else if (this.state === 'edit') {
          updateRoomType(this.formData).then(res => {
            if (res.data.status) {
              this.$message({
                type: 'success',
                message: '更新成功'
              })
              this.getList()
              this.showForm = false
            } else {
              this.$message({
                type: 'warning',
                message: '更新失败'
              }).finally(() => {
                this.isSub = false
              })
            }
          })
        }
      })
    },
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该房间类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoomType(fileid).then(res => {
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败'
            })
          }
        })
      })
    },
    downloadTemplate() {
      this.downloading = true
      mapBuildingTypeDownloadTemplate().then(res => {
        this.downloading = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '房间类别template-' + new Date().toLocaleString() + '.xlsx')
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    },
    handleImport() {

    },
    handleExport() {
      this.isExport = true
      mapRoomTypeDownload({ userId: window.cmips_userId }).then(res => {
        this.isExport = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '房间类别-' + new Date().toLocaleString() + '.xlsx')
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    }

  },
  beforeMount() {
    this.getList()
  }
}
