<template>
  <div class="menu-wrapper">
    <h1 class="menu-title" :class="{'display-none':isCollapse}">
      <img src="../../../../assets/images/logo.png" alt="" />
    </h1>
    <h1 class="menu-title" :class="{'display-none':(!isCollapse)}">
      <img src="../../../../assets/images/min-logo.png" alt="" />
    </h1>
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
    <div class="support">
      <!-- <span v-if="!isCollapse">版本：&nbsp;V{{version}}</span> -->
    </div>
  </div>
</template>

<script>
const packgeJson = require('../../../../../package.json')
import { mapGetters } from 'vuex'
import { generateTitle } from '@/utils/i18n'
import { saveVerManager } from '@/api/zk'
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // version: packgeJson.version
      version: packgeJson.version.split('.')[0] + '.' + packgeJson.version.split('.')[1] + '.' + packgeJson.version.split('.')[2].split('').join('.')
    }
  },
  mounted() {
    this.saveVerManager()
  },
  methods: {
    saveVerManager() {
      saveVerManager({
        systemName: '地图门户管理',
        moduleName: 'Web后台管理系统',
        version: this.version
      }).then().catch(e => console.log(e))
    },
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    generateTitle
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped lang="scss">
  .menu-title{
    font-size: 16px;
    img{
      width: 100%;
      height: 48px;
    }
  }
  .display-none{
    display: none;
    -visibility: hidden;
  }
</style>


