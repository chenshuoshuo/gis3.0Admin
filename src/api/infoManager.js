import service from '@/utils/request'

// 机构信息
export function pageOrganizationInfo(params) {
  return service({
    url: '/mapOrganization/pageQuery',
    method: 'get',
    params: params
  })
}
export function addOrganizationInfo(data) {
  return service({
    url: '/mapOrganization/add',
    method: 'PUT',
    data: data
  })
}
export function updateOrganizationInfo(data) {
  return service({
    url: '/mapOrganization/update',
    method: 'PUT',
    data: data
  })
}
export function getOrganizationInfo(typeCode) {
  return service({
    url: `/mapOrganization/get/${typeCode}`,
    method: 'get'
  })
}
export function delOrganizationInfo(typeCode) {
  return service({
    url: `/mapOrganization/delete/${typeCode}`,
    method: 'delete'
  })
}
export function bulkDeleteOrganizationInfo(params) {
  return service({
    url: `/mapOrganization/bulkDelete?ids=${params}`,
    method: 'delete'
  })
}
// 标注
export function pagePointInfo(params) {
  return service({
    url: '/mapPoint/pageQuery',
    method: 'get',
    params: params
  })
}
export function addPointInfo(data) {
  return service({
    url: '/mapPoint/add',
    method: 'PUT',
    data: data
  })
}
export function updatePointInfo(data) {
  return service({
    url: '/mapPoint/update',
    method: 'PUT',
    data: data
  })
}
export function getPointInfo(typeCode) {
  return service({
    url: `/mapPoint/get/${typeCode}`,
    method: 'get'
  })
}
export function delPointInfo(typeCode) {
  return service({
    url: `/mapPoint/delete/${typeCode}`,
    method: 'delete'
  })
}
export function bulkDeletePointInfo(params) {
  return service({
    url: `/mapPoint/bulkDelete?ids=${params}`,
    method: 'delete'
  })
}
// 大楼
export function pageBuildingInfo(params) {
  return service({
    url: '/mapBuilding/pageQuery',
    method: 'get',
    params: params
  })
}
export function addBuildingInfo(data) {
  return service({
    url: '/mapBuilding/add',
    method: 'PUT',
    data: data
  })
}
export function updateBuildingInfo(data) {
  return service({
    url: '/mapBuilding/update',
    method: 'PUT',
    data: data
  })
}
export function getBuildingInfo(typeCode) {
  return service({
    url: `/mapBuilding/get/${typeCode}`,
    method: 'get'
  })
}
export function delBuildingInfo(typeCode) {
  return service({
    url: `/mapBuilding/delete/${typeCode}`,
    method: 'delete'
  })
}
export function bulkDeleteBuildingInfo(params) {
  return service({
    url: `/mapBuilding/bulkDelete?ids=${params}`,
    method: 'delete'
  })
}
// 房间
export function pageRoomInfo(params) {
  return service({
    url: '/mapRoom/pageQuery',
    method: 'get',
    params: params
  })
}
export function addRoomInfo(data) {
  return service({
    url: '/mapRoom/add',
    method: 'PUT',
    data: data
  })
}
export function updateRoomInfo(data) {
  return service({
    url: '/mapRoom/update',
    method: 'PUT',
    data: data
  })
}
export function getRoomInfo(typeCode) {
  return service({
    url: `/mapRoom/get/${typeCode}`,
    method: 'get'
  })
}
export function delRoomInfo(typeCode) {
  return service({
    url: `/mapRoom/delete/${typeCode}`,
    method: 'delete'
  })
}
export function bulkDeleteRoomInfo(params) {
  return service({
    url: `/mapRoom/bulkDelete?ids=${params}`,
    method: 'delete'
  })
}
// 其他
export function pageOthersInfo(params) {
  return service({
    url: '/mapOthersPolygon/pageQuery',
    method: 'get',
    params: params
  })
}
export function addOthersInfo(data) {
  return service({
    url: '/mapOthersPolygon/add',
    method: 'PUT',
    data: data
  })
}
export function updateOthersInfo(data) {
  return service({
    url: '/mapOthersPolygon/update',
    method: 'PUT',
    data: data
  })
}
export function getOthersInfo(typeCode) {
  return service({
    url: `/mapOthersPolygon/get/${typeCode}`,
    method: 'get'
  })
}
export function delOthersInfo(typeCode) {
  return service({
    url: `/mapOthersPolygon/delete/${typeCode}`,
    method: 'delete'
  })
}
export function bulkDeleteOthersInfo(params) {
  return service({
    url: `/mapOthersPolygon/bulkDelete?ids=${params}`,
    method: 'delete'
  })
}
