import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { 
    path:'',
    redirect:'/attr-manager',
    hidden:true
  },
  {
    path:'/attr-manager',
    redirect:'/attr-manager/organization',
    component:Layout,
    alwaysShow:true,
    name: 'attr-manager',
    meta: {
      title: 'attr-manager',
      icon: 'category'
    },
    children:[
      { 
        path:"organization",
        component:() => import('@/views/attrCategoryManager/organizationCategory'),
        name:'attr-organization',
        meta: {
          title: 'attr-organization'
        }
      },
      { 
        path:"label",
        component:() => import('@/views/attrCategoryManager/labelCategory'),
        name:'attr-label',
        meta: {
          title: 'attr-label'
        }
      },
      { 
        path:"building",
        component:() => import('@/views/attrCategoryManager/buildingCategory'),
        name:'attr-building',
        meta: {
          title: 'attr-building'
        }
      },
      { 
        path:"room",
        component:() => import('@/views/attrCategoryManager/roomCategory'),
        name:'attr-room',
        meta: {
          title: 'attr-room'
        }
      },
      { 
        path:"other",
        component:() => import('@/views/attrCategoryManager/otherCategory'),
        name:'attr-other',
        meta: {
          title: 'attr-other'
        }
      },
    ]
  },
  {
    path:'/panoramic-roaming',
    redirect:'/panoramic-roaming/aerialPhoto',
    component:Layout,
    alwaysShow:true,
    name: 'panoramic-roaming',
    meta: {
      title: 'panoramic-roaming',
      icon: 'cam'
    },
    children:[
      {
        path:'aerialPhoto',
        component:()=>import('@/views/panoramicRoaming/campusAerialPhotography'),
        name:'aerial-photo',
        meta: {
          title:'aerial-photo'
        }
      },
    ]
  },
  {
    path:'/map-correction',
    redirect:'/map-correction/correction',
    component:Layout,
    alwaysShow:true,
    name: 'map-correction',
    meta: {
      title: 'map-correction',
      icon: 'write'
    },
    children:[
      {
        path:'correction',
        component:()=>import('@/views/correctionManager'),
        name:'correction',
        meta: {
          title:'correction'
        }
      },
    ]
  },
  {
    path:'/suggestions-manager',
    redirect:'/suggestions-manager/suggestions',
    component:Layout,
    alwaysShow:true,
    name: 'suggestions-manager',
    meta: {
      title: 'suggestions-manager',
      icon: 'sugg'
    },
    children:[
      {
        path:'suggestions',
        component:()=>import('@/views/suggestionsManager'),
        name:'suggestions',
        meta: {
          title:'suggestions'
        }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
