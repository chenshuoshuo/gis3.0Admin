import waves from '@/directive/waves' // 水波纹指令
import {
  pageBuildingInfo,
  delBuildingInfo,
  bulkDeleteBuildingInfo
} from '@/api/infoManager'

import { mapBuildingDownload } from '@/api/download'
import { mapBuildingDownloadTemplate } from '@/api/downloadTemplate'
import { mapBuildingSynData } from '@/api/synData'
import { listBuildingType } from '@/api/typeManager'
import { campusList } from '@/api/campus'
export default {
  inject: ['baseUrl'],
  directives: {
    waves
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
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.page--
      pageBuildingInfo(this.listQuery).then(res => {
        this.listQuery.page++
        this.listLoading = false
        if (res.data.code === 200) {
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
        if (res.data.code === 200) {
          this.campus = res.data.data
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handlerSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleRefreash() {
      this.isRefreash = true
      mapBuildingSynData({ userId: window.cmips_userId }).then(res => {
        this.isRefreash = false
        if (res.data.code === 0) {
          this.$notify({
            title: '成功',
            message: '大楼数据刷新成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '大楼信息刷新失败'
          })
        }
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDeletMany() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bulkDeleteBuildingInfo(this.multipleSelection.map(item => item.buildingCode).join(',')).then(res => {
            if (res.data.code === 200) {
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
      mapBuildingDownloadTemplate().then(res => {
        this.downloading = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '大楼信息template-' + new Date().toLocaleString() + '.xlsx')
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
      mapBuildingDownload({ userId: window.cmips_userId }).then(res => {
        this.isExport = false
        if (res.data) {
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', '大楼信息-' + new Date().toLocaleString() + '.xlsx')
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    },
    handleModifyStatus(fileid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBuildingInfo(fileid).then(res => {
          if (res.data.code === 200) {
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
    listBuildingType().then(res => {
      if (res.data.code === 200) {
        this.categories = res.data.data
      } else {
        this.$message({
          type: 'error',
          message: '分类信息获取失败'
        })
      }
    })
  }
}