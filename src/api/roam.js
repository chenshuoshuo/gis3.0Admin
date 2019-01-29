import service from '@/utils/request'

export function addRoam(params) {
  return service({
    url: '/roam/add',
    method: 'post',
    data: params
  })
}
export function updateRoam(id, params) {
  return service({
    url: `/roam/update/${id}`,
    method: 'put',
    data: params
  })
}
export function delRoam(id, params) {
  return service({
    url: `/roam/delete/${id}`,
    method: 'delete'
  })
}
export function infoRoam(id, params) {
  return service({
    url: `/roam/get/${id}`,
    method: 'get'
  })
}
export function bulkDeleteRoam(params) {
  return service({
    url: `/roam/deleteAll`,
    method: 'delete',
    data: params
  })
}
export function pageRoam(params) {
  return service({
    url: `/roam/search`,
    method: 'get',
    params: params
  })
}
