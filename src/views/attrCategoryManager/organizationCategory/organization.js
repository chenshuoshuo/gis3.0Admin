import waves from '@/directive/waves' // 水波纹指令
import { getToken } from '@/utils/auth'
import {
  pageOrganizationType,
  createOrganizationType,
  deleteOrganizationType,
  bulkDeleteOrganizationType,
  infoOrganizationType,
  updateOrganizationType,
  addMapOtExtendsDefine,
  getMapOtExtendsDefine,
  delMapOtExtendsDefine
} from '@/api/typeManager'
import { campusList } from '@/api/campus'
import { mapOrganizationTypeDownloadTemplate } from '@/api/downloadTemplate'
import { mapOrganizationTypeDownload } from '@/api/download'
import configFiled from '../components/configFiled'
import importDialog from '@/components/ImportDialog'
export default {
  inject: ['baseUrl'],
  components: {
    configFiled,
    'import-dialog': importDialog
  },
  directives: {
    waves
  },
  data() {
    return {
      picUrl: '',
      searchIconUrl: '',
      typeCode: '',
      state: '',
      isSub: false,
      downloading: false,
      token: getToken(),
      isImport: false,
      isExport: false,
      fields: [],
      // baseUrl: window.g.BASE_IPS,
      showForm: false,
      multipleSelection: [],
      campus: [],
      rules: {
        campusCode: [
          { required: true, message: '请选择校区' }
        ],
        menuIcon: [
          { required: true, message: '请上传图片' }
        ],
        searchIcon: [
          { required: true, message: '请上传图片' }
        ],
        typeName: [
          { required: true, message: '请填写类别名称', tigger: 'blur' }
        ],
        orderId: [
          { type: 'number', required: true, message: '请填写排序,必须由数字组成', tigger: 'blur' }
        ]
      },
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      showReviewer: false,
      formData: {}
    }
  },
  methods: {
    getList() {
      this.listQuery.page--
      this.listLoading = true
      pageOrganizationType(this.listQuery).then(res => {
        this.listLoading = false
        this.listQuery.page++
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
          const arr = res.data.data.content.filter(item => item.zones.filter(element => element.mapZoneByZoneId.is2D).length > 0)
          this.campus = arr.map(item => {
            item.zones = item.zones.filter(element => element.mapZoneByZoneId.is2D)
            return item
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
      delMapOtExtendsDefine({
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
      addMapOtExtendsDefine(params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.getList()
          this.showForm = false
          this.$refs.config.close()
        } else {
          this.$message({
            type: 'warning',
            message: '提交失败'
          })
        }
      })
    },
    handleEdit(id) {
      this.state = 'edit'
      infoOrganizationType(id).then(res => {
        if (res.data.code === 200) {
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
      getMapOtExtendsDefine(typeCode).then(res => {
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
    handleRefreash() {

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
        this.$confirm('此操作将永久删除选中的机构类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bulkDeleteOrganizationType(this.multipleSelection.map(item => item.typeCode).join(',')).then(res => {
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
        createOrganizationType(this.formData).then(res => {
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
        updateOrganizationType(this.formData).then(res => {
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
            })
          }
        }).finally(() => {
          this.isSub = false
        })
      }
    },
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该机构类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrganizationType(fileid).then(res => {
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
      mapOrganizationTypeDownloadTemplate().then(res => {
        this.downloading = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '机构类别template-' + new Date().toLocaleString() + '.xlsx')
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
      mapOrganizationTypeDownload({ userId: window.cmips_userId }).then(res => {
        this.isExport = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '机构类别-' + new Date().toLocaleString() + '.xlsx')
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
