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
    if (to.path === '/mylogin') {
      next('/')
      NProgress.done()
    } else {
      if(store.getters.addRouters.length===0){
        store.dispatch('GenerateRoutes').then(()=>{
          router.addRoutes(store.getters.addRouters)
          next({...to,replace:true});
        });
      }else{
        next();
      }
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
