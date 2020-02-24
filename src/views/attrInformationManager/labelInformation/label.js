import waves from '@/directive/waves' // 水波纹指令
import {
  pagePointInfo,
  delPointInfo,
  bulkDeletePointInfo
} from '@/api/infoManager'
import { campusList } from '@/api/campus'
import { mapPointDownloadTemplate } from '@/api/downloadTemplate'
import { mapPointDownload } from '@/api/download'
import { queryPonitParentList, listPointType } from '@/api/typeManager'
import importDialog from '@/components/ImportDialog'
export default {
  name: 'information-label',
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
      typeCode: [],
      listQuery: {
        page: 1,
        pageSize: 10
      },
      campus: [],
      parentCategories: [],
      categories: []
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    getList() {
      if (this.listQuery.page < 1) {
        return
      }
      this.listQuery.page--
      this.listLoading = true
      pagePointInfo(this.listQuery).then(res => {
        this.listQuery.page++
        this.listLoading = false
        if (res.data.status) {
          this.list = res.data.data.content
          this.total = res.data.data.totalElements
        } else {
          this.$message({
            type: 'warning',
            message: '标注信息列表获取失败'
          })
        }
      })
    },
    parseCascader(arr) {
      arr.forEach(element => {
        if (element.childrenMapPointTypeList.length > 0) {
          this.parseCascader(element.childrenMapPointTypeList)
        } else {
          delete element.childrenMapPointTypeList
        }
      })
      return arr
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
    handlerSearch() {
      if (this.typeCode.length > 0) {
        this.$set(this.listQuery, 'typeCode', this.typeCode[1])
      } else {
        this.listQuery.typeCode = null
      }
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
    handleDeletMany() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除选中的标注, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bulkDeletePointInfo(this.multipleSelection.map(item => item.pointCode).join(',')).then(res => {
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
      mapPointDownloadTemplate().then(res => {
        this.downloading = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '标注信息template-' + new Date().toLocaleString() + '.xlsx')
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
      mapPointDownload({ userId: window.cmips_userId }).then(res => {
        this.isExport = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '标注信息-' + new Date().toLocaleString() + '.xlsx')
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    },
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该标注, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPointInfo(fileid).then(res => {
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
    this.getList()
    this.getCampus()
    listPointType().then(res => {
      if (res.data.status) {
        this.categories = this.parseCascader(res.data.data)
      } else {
        this.$message({
          type: 'error',
          message: '标注分类获取失败'
        })
      }
    })
    queryPonitParentList().then(res => {
      if (res.data.status) {
        this.parentCategories = res.data.data
      } else {
        this.$message({
          type: 'error',
          message: '父分类获取失败'
        })
      }
    })
  }
}
