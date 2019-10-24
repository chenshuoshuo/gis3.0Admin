import waves from '@/directive/waves' // 水波纹指令
import treeTable from '@/components/TreeTable'
import treeToArray from './customEval'
import { getToken } from '@/utils/auth'
import {
  pagePointType,
  createPointType,
  deletePointType,
  bulkDeletePointType,
  infoPointType,
  updatePointType,
  addMapPtExtendsDefine,
  getMapPtExtendsDefine,
  delMapPtExtendsDefine,
  queryPonitParentList
} from '@/api/typeManager'
import { campusList } from '@/api/campus'
import { mapPointTypeDownloadTemplate } from '@/api/downloadTemplate'
import { mapPointTypeDownload } from '@/api/download'
import configFiled from '../components/configFiled'
import importDialog from '@/components/ImportDialog'
export default {
  inject: ['baseUrl'],
  components: {
    configFiled,
    treeTable,
    importDialog
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
      func: treeToArray,
      rasterIcon: '',
      token: getToken(),
      vectorIcon: '',
      state: '',
      columns: [
        {
          text: '类别名称',
          value: 'typeName',
          width: 200,
          position: 'left'
        },
        {
          text: '编号',
          value: 'typeCode'
        },
        {
          text: '二维图标',
          value: 'vectorIcon',
          type: 'icon'
        },
        {
          text: '三维图标',
          value: 'rasterIcon',
          type: 'icon'
        }

      ],
      showForm: false,
      multipleSelection: [],
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      parentCategorys: [],
      campus: [],
      showReviewer: false,
      formData: {
      }
    }
  },
  methods: {
    getList() {
      this.listQuery.page--
      this.listLoading = true
      pagePointType(this.listQuery).then(res => {
        this.listQuery.page++
        this.listLoading = false
        if (res.data.status) {
          this.list = res.data.data.content
          this.total = res.data.data.totalElements
          this.$forceUpdate()
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
        if (res.data.status) {
          this.campus = res.data.data
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleAdd() {
      this.state = 'add'
      this.getParentCategorys()
      this.showForm = true
    },
    handleClose() {
      this.picUrl = ''
      this.$refs.postForm.clearValidate()
      this.formData = {}
    },
    handleDelColumn(id) {
      delMapPtExtendsDefine({
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
      addMapPtExtendsDefine(params).then(res => {
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
      this.getParentCategorys()
      infoPointType(id).then(res => {
        if (res.data.status) {
          this.formData = res.data.data
          this.rasterIcon = this.formData.vectorIcon ? this.baseUrl + this.formData.rasterIcon : ''
          this.vectorIcon = this.formData.vectorIcon ? this.baseUrl + this.formData.vectorIcon : ''
          this.showForm = true
        } else {
          this.$message({
            type: 'warning',
            message: '机构类别信息获取失败，请重试'
          })
        }
      })
    },
    getParentCategorys() {
      queryPonitParentList().then(res => {
        if (res.data.status) {
          this.parentCategorys = res.data.data
        } else {
          this.$message({
            type: 'warning',
            message: '父级分类获取失败'
          })
        }
      })
    },
    handleConfig(typeCode) {
      this.typeCode = typeCode
      getMapPtExtendsDefine(typeCode).then(res => {
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
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleVectorIcon(res, file) {
      if (res.status) {
        this.vectorIcon = URL.createObjectURL(file.raw)
        this.formData.vectorIcon = res.data
      } else {
        this.$message({
          type: 'error',
          message: '图片上传失败'
        })
      }
    },
    handleRasterIcon(res, file) {
      if (res.status) {
        this.formData.rasterIcon = res.data
        this.rasterIcon = URL.createObjectURL(file.raw)
      } else {
        this.$message({
          type: 'error',
          message: '图片上传失败'
        })
      }
    },
    handleDeletMany() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除选中的标注类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bulkDeletePointType(this.multipleSelection.map(item => item.typeCode).join(',')).then(res => {
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
      this.$refs.postForm.validate(val => {
        if (val) {
          this.save()
        }
      })
    },
    save() {
      this.isSub = true
      if (this.state === 'add') {
        createPointType(this.formData).then(res => {
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
        updatePointType(this.formData).then(res => {
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
    },
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该标注类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePointType(fileid).then(res => {
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
      mapPointTypeDownloadTemplate().then(res => {
        this.downloading = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '标注类别template-' + new Date().toLocaleString() + '.xlsx')
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    },
    handleImportExecel() {
      this.$refs.upload.openUpload()
    },
    handleExport() {
      this.isExport = true
      mapPointTypeDownload({ userId: window.cmips_userId }).then(res => {
        this.isExport = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '标注类别-' + new Date().toLocaleString() + '.xlsx')
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
