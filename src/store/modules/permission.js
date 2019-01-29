import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(route, roles) {
  var flag = false
  roles.forEach(element => {
    if (element.content === route.name) {
      flag = true
    }
  })
  return flag
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    if (hasPermission(route, roles)) {
      if (route.children) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      res.push(route)
    }
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        accessedRouters.push({
          path: '',
          redirect: accessedRouters[0].path,
          hidden: true
        })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
