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
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  { path: '/mylogin', component: () => import('@/views/login'), hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/information-manager',
    redirect: '/information-manager/organization',
    component: Layout,
    alwaysShow: true,
    name: 'information-manager',
    meta: {
      title: 'information-manager',
      icon: 'menu'
    },
    children: [
      {
        path: 'organization',
        component: () => import('@/views/attrInformationManager/organizationInformation'),
        name: 'information-organization',
        meta: {
          title: 'information-organization'
        }

      },
      {
        path: 'createOrganization',
        component: () => import('@/views/attrInformationManager/organizationInformation/createOrganization'),
        name: 'create-organization',
        hidden: true,
        meta: {
          title: 'create-organization',
          guidePath: true,
          jumpPath: '/information-manager/organization'
        }
      },
      {
        path: 'label',
        component: () => import('@/views/attrInformationManager/labelInformation'),
        name: 'information-label',
        meta: {
          title: 'information-label'
        }
      },
      {
        path: 'createLabel',
        component: () => import('@/views/attrInformationManager/labelInformation/createLabel'),
        name: 'create-label',
        hidden: true,
        meta: {
          title: 'create-label',
          guidePath: true,
          jumpPath: '/information-manager/label'
        }
      },
      {
        path: 'building',
        component: () => import('@/views/attrInformationManager/buildingInformation'),
        name: 'information-building',
        meta: {
          title: 'information-building'
        }
      },
      {
        path: 'createBuilding',
        component: () => import('@/views/attrInformationManager/buildingInformation/createBuilding'),
        name: 'create-building',
        hidden: true,
        meta: {
          title: 'create-building',
          guidePath: true,
          jumpPath: '/information-manager/building'
        }
      },
      {
        path: 'room',
        component: () => import('@/views/attrInformationManager/roomInformation'),
        name: 'information-room',
        meta: {
          title: 'information-room'
        }
      },
      {
        path: 'createRoom',
        component: () => import('@/views/attrInformationManager/roomInformation/createRoom'),
        name: 'edit-room',
        hidden: true,
        meta: {
          title: 'edit-room',
          guidePath: true,
          jumpPath: '/information-manager/room'
        }
      },
      {
        path: 'other',
        component: () => import('@/views/attrInformationManager/otherInformation'),
        name: 'information-other',
        meta: {
          title: 'information-other'
        }
      },
      {
        path: 'createOthers',
        component: () => import('@/views/attrInformationManager/otherInformation/createOhter'),
        name: 'edit-other',
        hidden: true,
        meta: {
          title: 'edit-other',
          guidePath: true,
          jumpPath: '/information-manager/other'
        }
      }
    ]
  },
  {
    path: '/category-manager',
    redirect: '/category-manager/organization',
    component: Layout,
    alwaysShow: true,
    name: 'category-manager',
    meta: {
      title: 'category-manager',
      icon: 'category'
    },
    children: [
      {
        path: 'organization',
        component: () => import('@/views/attrCategoryManager/organizationCategory'),
        name: 'category-organization',
        meta: {
          title: 'category-organization'
        }
      },
      {
        path: 'label',
        component: () => import('@/views/attrCategoryManager/labelCategory'),
        name: 'category-label',
        meta: {
          title: 'category-label'
        }
      },
      {
        path: 'building',
        component: () => import('@/views/attrCategoryManager/buildingCategory'),
        name: 'category-building',
        meta: {
          title: 'category-building'
        }
      },
      {
        path: 'room',
        component: () => import('@/views/attrCategoryManager/roomCategory'),
        name: 'category-room',
        meta: {
          title: 'category-room'
        }
      },
      {
        path: 'other',
        component: () => import('@/views/attrCategoryManager/otherCategory'),
        name: 'category-other',
        meta: {
          title: 'category-other'
        }
      }
    ]
  },
  {
    path: '/panoramic-roaming',
    redirect: '/panoramic-roaming/aerialPhoto',
    component: Layout,
    alwaysShow: true,
    name: 'panoramic-roaming',
    meta: {
      title: 'panoramic-roaming',
      icon: 'quanjing'
    },
    children: [
      {
        path: 'aerialPhoto',
        component: () => import('@/views/panoramicRoaming/campusAerialPhotography'),
        name: 'aerial-photo',
        meta: {
          title: 'aerial-photo'
        }
      },
      {
        path: 'groundPanorama',
        component: () => import('@/views/panoramicRoaming/groundPanorama'),
        name: 'ground-panorama',
        meta: {
          title: '地面全景'
        }
      },
      {
        path: 'creategroundPanorama',
        component: () => import('@/views/panoramicRoaming/groundPanorama/create'),
        name: 'add-panorama',
        meta: {
          title: '编辑地面全景',
          guidePath: true,
          jumpPath: '/panoramic-roaming/groundPanorama'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/map-correction',
    redirect: '/map-correction/correction',
    component: Layout,
    alwaysShow: true,
    name: 'map-correction',
    meta: {
      title: 'map-correction',
      icon: 'correct'
    },
    children: [
      {
        path: 'correction',
        component: () => import('@/views/correctionManager'),
        name: 'correction',
        meta: {
          title: 'correction'
        }
      }
    ]
  },
  {
    path: '/suggestions-manager',
    redirect: '/suggestions-manager/suggestions',
    component: Layout,
    alwaysShow: true,
    name: 'suggestions-manager',
    meta: {
      title: 'suggestions-manager',
      icon: 'wechat'
    },
    children: [
      {
        path: 'suggestions',
        component: () => import('@/views/suggestionsManager'),
        name: 'suggestions',
        meta: {
          title: 'suggestions'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
