import waves from '@/directive/waves' // 水波纹指令
import {
  pageOrganizationInfo,
  delOrganizationInfo,
  bulkDeleteOrganizationInfo
} from '@/api/infoManager'
import { campusList } from '@/api/campus'
import { mapOrganizationDownloadTemplate } from '@/api/downloadTemplate'
import { mapOrganizationDownload } from '@/api/download'
import { listOrganizationType } from '@/api/typeManager'
import importDialog from '@/components/ImportDialog'
export default {
  name: 'information-organization',
  inject: ['baseUrl'],
  directives: {
    waves
  },
  components: {
    'import-dialog': importDialog
  },
  data() {
    return {
      downloading: false,
      isImport: false,
      isExport: false,
      multipleSelection: [],
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      campus: [],
      types: []
    }
  },
  methods: {
    getList() {
      this.listQuery.page--
      this.listLoading = true
      pageOrganizationInfo(this.listQuery).then(res => {
        this.listQuery.page++
        this.listLoading = false
        if (res.data.status) {
          this.list = res.data.data.content
          this.total = res.data.data.totalElements
        } else {
          this.$message({
            type: 'warning',
            message: '机构信息列表获取失败'
          })
        }
      })
    },
    getCampus() {
      campusList().then(res => {
        if (res.data.status) {
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
    handleEdit(id) {
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
    handleDeletMany() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除选中的机构, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bulkDeleteOrganizationInfo(this.multipleSelection.map(item => item.organizationCode).join(',')).then(res => {
            if (res.data.status) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
            } else {
              this.$message({
                type: 'error',
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
    downloadTemplate() {
      this.downloading = true
      mapOrganizationDownloadTemplate().then(res => {
        this.downloading = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '机构信息template-' + new Date().toLocaleString() + '.xlsx')
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
      mapOrganizationDownload({ userId: window.cmips_userId }).then(res => {
        this.isExport = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '机构信息-' + new Date().toLocaleString() + '.xlsx')
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    },
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOrganizationInfo(fileid).then(res => {
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      })
    }
  },
  watch: {
    compusCode() {
      listOrganizationType({ campusCode: this.listQuery.campusCode }).then(res => {
        if (res.data.status) {
          this.types = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: '分类信息获取失败'
          })
        }
      })
    }
  },
  computed: {
    compusCode() {
      return this.listQuery.campusCode
    }
  },
  beforeMount() {
    this.getList()
    this.getCampus()
  }
}
