<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">

      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>
      <el-tooltip effect="dark" content="从CMIPS推送到CMGIS" placement="bottom">
        <el-button type="success" class="theme-switch right-menu-item" size="small" :loading="gisSyn" @click="handleCmips">IPS</el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="从CMGIS同步到CMIPS" placement="bottom">
        <el-button type="primary" class="theme-switch right-menu-item" size="small" :loading="mapSyn" @click="handleCmgis">GIS</el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="从CMIPS推送到elsticsearch" placement="bottom">
        <el-button type="warning" class="theme-switch right-menu-item" size="small" :loading="elsSyn" @click="handleEls">Els</el-button>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
          <!-- <i class="el-icon-caret-bottom"></i> -->
        </div>
        <!-- <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu> -->
      </el-dropdown>
    </div>
    <el-dialog
      title="从CMIPS推送到CMGIS"
      :visible.sync="cmips"
      width="450px">
       <el-table :data="campus" :show-header='false' max-height="250">
        <el-table-column prop="name"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" :disabled="gisSyn" :loading="scope.row.pushing" @click="handlePush(scope.row)">推送</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      title="从CMGIS同步到CMIPS"
      :visible.sync="cmgis"
      width="450px">
       <el-table :data="campus" :show-header='false' max-height="250">
        <el-table-column prop="name"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" :disabled="mapSyn" :loading="scope.row.syncing" @click="handleSync(scope.row)">同步</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      title="从CMIPS推送到elsticsearch"
      :visible.sync="elsticsearch"
      width="450px">
       <el-table :data="campus" :show-header='false' max-height="250">
        <el-table-column prop="name"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" :loading="scope.row.pushing" @click="handleElsPush(scope.row)">推送</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-menu>
</template>

<script>
// import { logout } from '@/api/mylogin'
import { campusList, taskState } from '@/api/campus'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import { pushDataToGis, mapSynchronize, pushDataToEls } from '@/api/synData'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  data() {
    return {
      campus: [],
      cmips: false,
      cmgis: false,
      elsticsearch: false,
      mapSyn: false,
      gisSyn: false,
      elsSyn: false,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  },
  beforeMount() {
    campusList().then(res => {
      if (res.data.status) {
        this.campus = res.data.data.content
        this.campus.forEach(item => {
          item.pushing = false
          item.syncing = false
        })
      }
    })
  },
  methods: {
    handleSync(row) {
      taskState(row.groupId).then(response => {
        if (response.data.status && response.data.data.status == 2) {
          row.syncing = true
          this.mapSyn = true
          const id = row.zones.filter(item => item.mapZoneByZoneId.is2D)[0].zoneId
          mapSynchronize(id).then(res => {
            this.mapSyn = false
            row.syncing = false
            if (res.data.status) {
              if (!res.data.data.synStatus) {
                this.$notify({
                  title: '失败',
                  message: res.data.data.errMsg,
                  type: 'error'
                })
              } else {
                this.$notify({
                  title: '成功',
                  message: '地图数据同步成功',
                  type: 'success'
                })
              }
            } else {
              this.$notify({
                title: '失败',
                message: '地图数据同步失败',
                type: 'error'
              })
            }
          })
        } else {
          this.$notify({
            title: '失败',
            message: response.data.data.message,
            type: 'error'
          })
        }
      })
    },
    handlePush(row) {
      row.pushing = true
      this.gisSyn = true
      const id = row.zones.filter(item => item.mapZoneByZoneId.is2D)[0].zoneId
      pushDataToGis(id).then(res => {
        this.gisSyn = false
        row.pushing = false
        if (res.data.status) {
          if (!res.data.data.synStatus) {
            this.$notify({
              title: '失败',
              message: res.data.data.errMsg,
              type: 'error'
            })
          } else {
            this.$notify({
              title: '成功',
              message: '地图数据推送成功',
              type: 'success'
            })
          }
        } else {
          this.$notify({
            title: '失败',
            message: '地图数据推送失败',
            type: 'error'
          })
        }
      })
    },
    handleElsPush(row) {
      this.$set(row, 'pushing', true)
      this.elsSyn = true
      const id = row.zones.filter(item => item.mapZoneByZoneId.is2D)[0].zoneId
      pushDataToEls(id).then(res => {
        this.elsSyn = false
        this.$set(row, 'pushing', false)
        if (res.data.status) {
          this.$notify({
            title: '成功',
            message: '地图数据推送成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '失败',
            message: '地图数据推送失败',
            type: 'error'
          })
        }
      })
    },
    handleCmips() {
      this.cmips = true
    },
    handleCmgis() {
      this.cmgis = true
    },
    handleEls() {
      this.elsticsearch = true
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      // console.log('11111', this.$store.dispatch('LogOut'))
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      // })
      location.reload()
    }
  }
}
</script>

<style>
  .navbar .el-dialog__body{
    padding: 0 10px;
  }
  .navbar .el-dialog__header{
    padding: 10px;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .el-button--small{
    padding: 6px 4px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
