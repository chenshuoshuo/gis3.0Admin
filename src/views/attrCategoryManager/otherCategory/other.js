import waves from '@/directive/waves' // 水波纹指令
import {
  pageOthersPolygonType,
  createOthersPolygonType,
  deleteOthersPolygonType,
  bulkDeleteOthersPolygonType,
  infoOthersPolygonType,
  updateOthersPolygonType,
  addMapOptExtendsDefine,
  getMapOptExtendsDefine,
  delMapOptExtendsDefine
} from '@/api/typeManager'
import { mapOthersPolygonTypeDownloadTemplate } from '@/api/downloadTemplate'
import { mapOthersPolygonTypeDownload } from '@/api/download'
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
        page: 1,
        page_size: 10
      },
      formData: {
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.page--
      pageOthersPolygonType(this.listQuery).then(res => {
        this.listQuery.page++
        this.listLoading = false
        if (res.data.status) {
          this.list = res.data.data.content
          this.total = res.data.data.totalElements
        } else {
          this.$message({
            type: 'warning',
            message: '其他类别列表获取失败，请重试'
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
      delMapOptExtendsDefine({
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
      addMapOptExtendsDefine(params).then(res => {
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
      infoOthersPolygonType(id).then(res => {
        if (res.data.status) {
          this.formData = res.data.data
          this.showForm = true
        } else {
          this.$message({
            type: 'warning',
            message: '其他类别信息获取失败，请重试'
          })
        }
      })
    },
    handleConfig(typeCode) {
      this.typeCode = typeCode
      getMapOptExtendsDefine(typeCode).then(res => {
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
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.listQuery.page = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
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
        this.$confirm('此操作将永久删除选中的其他分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bulkDeleteOthersPolygonType(this.multipleSelection.map(item => item.typeCode).join(',')).then(res => {
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
          createOthersPolygonType(this.formData).then(res => {
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
          updateOthersPolygonType(this.formData).then(res => {
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
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOthersPolygonType(fileid).then(res => {
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
      mapOthersPolygonTypeDownloadTemplate().then(res => {
        this.downloading = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '其他类别template-' + new Date().toLocaleString() + '.xlsx')
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
      mapOthersPolygonTypeDownload({ userId: window.cmips_userId }).then(res => {
        this.isExport = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '其他类别-' + new Date().toLocaleString() + '.xlsx')
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
