import waves from '@/directive/waves' // 水波纹指令
import {
  pageBuildingType,
  createBuildingType,
  deleteBuildingType,
  bulkDeleteBuildingType,
  infoBuildingType,
  updateBuildingType,
  addMapBtExtendsDefine,
  getMapBtExtendsDefine,
  delMapBtExtendsDefine
} from '@/api/typeManager'
import { campusList } from '@/api/campus'
import { mapBuildingTypeDownloadTemplate } from '@/api/downloadTemplate'
import { mapBuildingTypeDownload } from '@/api/download'
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
      state: '',
      downloading: false,
      isImport: false,
      isExport: false,
      fields: [],
      showForm: false,
      multipleSelection: [],
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
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
      this.listQuery.page--
      pageBuildingType(this.listQuery).then(res => {
        this.listQuery.page++
        this.listLoading = false
        if (res.data.code === 200) {
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
    getCampus() {
      campusList().then(res => {
        if (res.data.code === 200) {
          this.campus = res.data.data
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
      delMapBtExtendsDefine({
        'columnId': id,
        'typeCode': this.typeCode
      }).then(res => {
        if (res.data.code === 200) {
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
      addMapBtExtendsDefine(params).then(res => {
        if (res.data.code === 200) {
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
      infoBuildingType(id).then(res => {
        if (res.data.code === 200) {
          this.formData = res.data.data
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
      getMapBtExtendsDefine(typeCode).then(res => {
        if (res.data.code === 200) {
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
        this.$confirm('此操作将永久删除选中的大楼类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bulkDeleteBuildingType(this.multipleSelection.map(item => item.typeCode).join(',')).then(res => {
            if (res.data.code === 200) {
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
      this.isSub = true
      if (this.state === 'add') {
        createBuildingType(this.formData).then(res => {
          if (res.data.code === 200) {
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
        updateBuildingType(this.formData).then(res => {
          if (res.data.code === 200) {
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
    },
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该大楼类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBuildingType(fileid).then(res => {
          if (res.data.code === 200) {
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
          aLink.setAttribute('download', '大楼类别template-' + new Date().toLocaleString() + '.xlsx')
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
      mapBuildingTypeDownload({ userId: window.cmips_userId }).then(res => {
        this.isExport = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '大楼类别-' + new Date().toLocaleString() + '.xlsx')
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
    this.getCampus()
  }
}
