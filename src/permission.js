import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getCookie } from '@/utils/auth' // getToken from cookie
import store from './store' 

NProgress.configure({ showSpinner: false })// NProgress Configuration


const whiteList = ['/mylogin','/myregister']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getCookie("username")) { // determine if there has token
    /* has token*/
    if (to.path === '/mylogin') {
      next({ path: '/' })
      NProgress.done()
    } else {
    	store.dispatch('GenerateRoutes', {  }).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
      next()
    }
    
  } else {
//		next()
    /* 没有token */
   if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
     next()
   } else {
     next('/mylogin') // 否则全部重定向到登录页
     NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
   }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
