import service from '@/utils/request'

// 机构类别
export function pageOrganizationType(params) {
  return service({
    url: '/mapOrganizationType/pageQuery',
    method: 'get',
    params: params
  })
}
export function createOrganizationType(data) {
  return service({
    url: '/mapOrganizationType/add',
    method: 'PUT',
    data: data
  })
}
export function deleteOrganizationType(typeCode) {
  return service({
    url: `/mapOrganizationType/delete/${typeCode}`,
    method: 'delete'
  })
}
export function bulkDeleteOrganizationType(typeCodes) {
  return service({
    url: `/mapOrganizationType/bulkDelete?ids=${typeCodes}`,
    method: 'delete'
  })
}
export function infoOrganizationType(typeCode) {
  return service({
    url: `/mapOrganizationType/get/${typeCode}`,
    method: 'get'
  })
}
export function listOrganizationType(params) {
  return service({
    url: `/mapOrganizationType/listQuery`,
    method: 'get',
    params: params
  })
}
export function updateOrganizationType(data) {
  return service({
    url: '/mapOrganizationType/update',
    method: 'PUT',
    data: data
  })
}
export function typeUploadImg(params) {
  return service({
    url: '/mapOrganizationType/uploadImg',
    method: 'post',
    params: params
  })
}
// 机构属性扩展
export function addMapOtExtendsDefine(params) {
  return service({
    url: '/mapOtExtendsDefine/save',
    method: 'PUT',
    data: params
  })
}
export function getMapOtExtendsDefine(typeCode) {
  return service({
    url: `/mapOtExtendsDefine/list/${typeCode}`,
    method: 'get'
  })
}
export function delMapOtExtendsDefine(params) {
  return service({
    url: `/mapOtExtendsDefine/delete`,
    method: 'delete',
    data: params
  })
}

// 标注类别管理
export function pagePointType(params) {
  return service({
    url: '/mapPointType/pageQuery',
    method: 'get',
    params: params
  })
}
export function createPointType(data) {
  return service({
    url: '/mapPointType/add',
    method: 'PUT',
    data: data
  })
}
export function deletePointType(typeCode) {
  return service({
    url: `/mapPointType/delete/${typeCode}`,
    method: 'delete'
  })
}
export function bulkDeletePointType(typeCodes) {
  return service({
    url: `/mapPointType/bulkDelete?ids=${typeCodes}`,
    method: 'delete'
  })
}
export function infoPointType(typeCode) {
  return service({
    url: `/mapPointType/get/${typeCode}`,
    method: 'get'
  })
}
export function listPointType(params) {
  return service({
    url: `/mapPointType/listQuery`,
    method: 'get',
    params: params
  })
}
export function updatePointType(data) {
  return service({
    url: '/mapPointType/update',
    method: 'PUT',
    data: data
  })
}
export function pointTypeUploadImg(params) {
  return service({
    url: '/mapPointType/uploadImg',
    method: 'post',
    params: params
  })
}
export function queryPonitParentList() {
  return service({
    url: '/mapPointType/queryParentList',
    method: 'get'
  })
}

// 标注属性扩展
export function addMapPtExtendsDefine(params) {
  return service({
    url: '/mapPtExtendsDefine/save',
    method: 'PUT',
    data: params
  })
}
export function getMapPtExtendsDefine(typeCode) {
  return service({
    url: `/mapPtExtendsDefine/list/${typeCode}`,
    method: 'get'
  })
}
export function delMapPtExtendsDefine(params) {
  return service({
    url: `/mapPtExtendsDefine/delete`,
    method: 'delete',
    data: params
  })
}

// 大楼类别管理
export function pageBuildingType(params) {
  return service({
    url: '/mapBuildingType/pageQuery',
    method: 'get',
    params: params
  })
}
export function createBuildingType(data) {
  return service({
    url: '/mapBuildingType/add',
    method: 'PUT',
    data: data
  })
}
export function deleteBuildingType(typeCode) {
  return service({
    url: `/mapBuildingType/delete/${typeCode}`,
    method: 'delete'
  })
}
export function bulkDeleteBuildingType(typeCodes) {
  return service({
    url: `/mapBuildingType/bulkDelete?ids=${typeCodes}`,
    method: 'delete'
  })
}
export function infoBuildingType(typeCode) {
  return service({
    url: `/mapBuildingType/get/${typeCode}`,
    method: 'get'
  })
}
export function listBuildingType(params) {
  return service({
    url: `/mapBuildingType/queryList`,
    method: 'get',
    params: params
  })
}
export function updateBuildingType(data) {
  return service({
    url: '/mapBuildingType/update',
    method: 'PUT',
    data: data
  })
}
// 大楼属性类别扩展
export function addMapBtExtendsDefine(params) {
  return service({
    url: '/mapBtExtendsDefine/save',
    method: 'PUT',
    data: params
  })
}
export function getMapBtExtendsDefine(typeCode) {
  return service({
    url: `/mapBtExtendsDefine/list/${typeCode}`,
    method: 'get'
  })
}
export function delMapBtExtendsDefine(params) {
  return service({
    url: `/mapBtExtendsDefine/delete`,
    method: 'delete',
    data: params
  })
}

// 房间类别管理
export function pageRoomType(params) {
  return service({
    url: '/mapRoomType/pageQuery',
    method: 'get',
    params: params
  })
}
export function createRoomType(data) {
  return service({
    url: '/mapRoomType/add',
    method: 'PUT',
    data: data
  })
}
export function deleteRoomType(typeCode) {
  return service({
    url: `/mapRoomType/delete/${typeCode}`,
    method: 'delete'
  })
}
export function bulkDeleteRoomType(typeCodes) {
  return service({
    url: `/mapRoomType/bulkDelete?ids=${typeCodes}`,
    method: 'delete'
  })
}
export function infoRoomType(typeCode) {
  return service({
    url: `/mapRoomType/get/${typeCode}`,
    method: 'get'
  })
}
export function listRoomType(params) {
  return service({
    url: `/mapRoomType/queryList`,
    method: 'get',
    params: params
  })
}
export function updateRoomType(data) {
  return service({
    url: '/mapRoomType/update',
    method: 'PUT',
    data: data
  })
}
// 房间类别属性扩展
export function addMapRtExtendsDefine(params) {
  return service({
    url: '/mapRtExtendsDefine/save',
    method: 'PUT',
    data: params
  })
}
export function getMapRtExtendsDefine(typeCode) {
  return service({
    url: `/mapRtExtendsDefine/list/${typeCode}`,
    method: 'get'
  })
}
export function delMapRtExtendsDefine(params) {
  return service({
    url: `/mapRtExtendsDefine/delete`,
    method: 'delete',
    data: params
  })
}

// 其他类别管理
export function pageOthersPolygonType(params) {
  return service({
    url: '/mapOthersPolygonType/pageQuery',
    method: 'get',
    params: params
  })
}
export function createOthersPolygonType(data) {
  return service({
    url: '/mapOthersPolygonType/add',
    method: 'PUT',
    data: data
  })
}
export function deleteOthersPolygonType(typeCode) {
  return service({
    url: `/mapOthersPolygonType/delete/${typeCode}`,
    method: 'delete'
  })
}
export function bulkDeleteOthersPolygonType(typeCodes) {
  return service({
    url: `/mapOthersPolygonType/bulkDelete?ids=${typeCodes}`,
    method: 'delete'
  })
}
export function infoOthersPolygonType(typeCode) {
  return service({
    url: `/mapOthersPolygonType/get/${typeCode}`,
    method: 'get'
  })
}
export function listOthersPolygonType(params) {
  return service({
    url: `/mapOthersPolygonType/listQuery`,
    method: 'get',
    params: params
  })
}
export function updateOthersPolygonType(data) {
  return service({
    url: '/mapOthersPolygonType/update',
    method: 'PUT',
    data: data
  })
}
// 其他类别属性扩展
export function addMapOptExtendsDefine(params) {
  return service({
    url: '/mapOptExtendsDefine/save',
    method: 'PUT',
    data: params
  })
}
export function getMapOptExtendsDefine(typeCode) {
  return service({
    url: `/mapOptExtendsDefine/list/${typeCode}`,
    method: 'get'
  })
}
export function delMapOptExtendsDefine(params) {
  return service({
    url: `/mapOptExtendsDefine/delete`,
    method: 'delete',
    data: params
  })
}
