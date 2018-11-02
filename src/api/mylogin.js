import request from '@/utils/request'

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}


export function myloginByUsername(username, password) {
  const data = {
    username,
    password
  }
  
  console.log(data)
  
  return request({
    url: '/osm/api/0.6/permissions',
    method: 'get'
  })
}

//export function login() {
//return request({
//  url: '/osm/api/0.6/permissions',
//  method: 'get'
//})
//}
