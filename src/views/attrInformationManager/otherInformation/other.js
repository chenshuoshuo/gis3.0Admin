import waves from '@/directive/waves' // 水波纹指令
import {
  pageOthersInfo,
  delOthersInfo,
  bulkDeleteOthersInfo
} from '@/api/infoManager'
import { campusList } from '@/api/campus'
import { mapOthersPolygonDownloadTemplate } from '@/api/downloadTemplate'
import { mapOthersPolygonSynData } from '@/api/synData'
import { mapOthersPolygonDownload } from '@/api/download'
import { listOthersPolygonType } from '@/api/typeManager'
import importDialog from '@/components/ImportDialog'
export default {
  name: 'information-other',
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
      isRefreash: false,
      multipleSelection: [],
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      campus: [],
      categories: []
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    getList() {
      this.listQuery.page--
      this.listLoading = true
      pageOthersInfo(this.listQuery).then(res => {
        this.listLoading = false
        this.listQuery.page++
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
    handleRefreash() {
      this.isRefreash = true
      mapOthersPolygonSynData({ userId: window.cmips_userId }).then(res => {
        this.isRefreash = false
        if (res.data.status) {
          this.$notify({
            title: '成功',
            message: '其他数据刷新成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '其他信息刷新失败'
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
    handleDeletMany() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除选中的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bulkDeleteOthersInfo(this.multipleSelection.map(item => item.polygonCode).join(',')).then(res => {
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
      mapOthersPolygonDownloadTemplate().then(res => {
        this.downloading = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '其他信息template-' + new Date().toLocaleString() + '.xlsx')
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
      mapOthersPolygonDownload({ userId: window.cmips_userId }).then(res => {
        this.isExport = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '其他信息-' + new Date().toLocaleString() + '.xlsx')
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    },
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOthersInfo(fileid).then(res => {
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
  beforeMount() {
    // this.getList()
    this.getCampus()
    listOthersPolygonType().then(res => {
      if (res.data.status) {
        this.categories = res.data.data
      } else {
        this.$message({
          type: 'error',
          message: '类别获取失败'
        })
      }
    })
  }
}
