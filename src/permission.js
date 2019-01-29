import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import store from './store'
import { getToken, getRefresh, getExpirationDate, autoGetToken, setToken, removeRefresh } from '@/utils/auth'
import { refreshToken, getUserInfo } from '@/api/zk'
import { Message } from 'element-ui'
// import axios from 'axios'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/404', '/401']

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (store.getters.addRouters.length > 0) {
      next()
    } else {
      var userinfoStr = window.atob(getToken().split('.')[1])
      const userInfo = JSON.parse(userinfoStr)
      getUserInfo(userInfo.user_name).then(res => {
        if (res.data.code === 0) {
          window.cmips_userId = res.data.data.userId
          const roles = res.data.data.authorities.filter(item => item.type === 'ips_menu')
          store.dispatch('GenerateRoutes', roles).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        } else {
          Message({
            type: 'error',
            message: '用户信息获取失败'
          })
          next('/mylogin')
        }
      }).catch(() => {
        Message({
          type: 'error',
          message: '用户信息获取失败'
        })
      }).finally(() => {
        router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
      })
    }
    if (to.path === '/mylogin') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (getRefresh()) { // 如果有更新token
      refreshToken(getRefresh()).then(res => {
        setToken(res.data.access_token, res.data.expires_in)
        autoGetToken(getRefresh())
        next('/')
      }).catch(() => {
        Message({
          type: 'error',
          message: '自动登录失败'
        })
        removeRefresh()
        next({ ...to, replace: true })
      })
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        Message({
          type: 'error',
          message: '请登录之后再操作'
        })
        next('/401')
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
// 页面刷新时重新设置定时器自动更新token
window.onload = function() {
  if (getExpirationDate()) {
    autoGetToken(getRefresh())
  }
}
