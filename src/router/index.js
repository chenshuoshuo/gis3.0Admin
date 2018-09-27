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
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout

  }]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/zoneManger',
    component: Layout,
    redirect: '/zoneManger/page',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '区域管理',
      icon: 'clipboard',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'page',
      component: () => import('@/views/zoneManger/page'),
      name: 'pageZoneManger',
      meta: {
        title: '区域列表',
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    },{
      path: 'addZone/:id?',
      component: () => import('@/views/zoneManger/addZone/'),
      name: 'addZone',
      hidden: true,
      meta: {
        title: '添加地图区域',
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/styleManger',
    component: Layout,
    redirect: '/styleManger/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '样式管理',
      icon: 'documentation'
    },
    children: [{
      path: 'page',
      component: () => import('@/views/styleManger/page'),
      name: 'styleManger',
      meta: {
        title: '样式管理'
      }}, {
      path: 'addStyle',
      component: () => import('@/views/styleManger/addStyle'),
      name: 'addStyle',
      hidden: true,
      meta: { title: '新增'}}]
  },
  {
    path: '/mapTempMannger',
    component: Layout,
    alwaysShow: true,
    redirect: '/mapTempMannger/list',
    name: 'mapTempMannger',
    meta: {
      title: '地图模板管理',
      icon: 'component'
    },
    children: [
      { path: 'list', component: () => import('@/views/mapTempMannger/list'), name: 'mapTempMannger', meta: { title: '地图模板管理', icon: 'component' }}
    ]
  },
  {
    path: '/3dTileMannger',
    component: Layout,
    alwaysShow: true,
    redirect: '/3dTileMannger/3dist',
    name: '3dTileMannger',
    meta: {
      title: '三维瓦片管理',
      icon: 'table'
    },
    children: [
      { path: '3dlist', component: () => import('@/views/3dTileMannger/3dlist'), name: '3dTileMannger', meta: { title: '三维瓦片管理' }},
      { path: 'upTitle', component: () => import('@/views/3dTileMannger/upTitle'), name: 'upTitle', hidden: true, meta: { title: '上传瓦片' }}
    ]
  },
  {
    path: '/authorManager',
    component: Layout,
    alwaysShow: true,
    redirect: '/authorManager/authorizList',
    name: 'authorManager',
    meta: {
      title: '授权管理',
      icon: 'lock'
    },
    children: [
      { path: 'authorizList', component: () => import('@/views/authorManager/authorizList'), name: 'authorizList', meta: { title: '授权管理', noCache: true }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export function getConstantRouterMap(){
  return asyncRouterMap;
}
