import service from '@/utils/request'

export function mapOrganizationDownload(userId) {
  return service({
    url: '/mapOrganization/download',
    method: 'get',
    params: userId,
    responseType: 'blob'
  })
}
export function mapOrganizationTypeDownload(userId) {
  return service({
    url: '/mapOrganizationType/download',
    method: 'get',
    params: userId,
    responseType: 'blob'
  })
}
export function mapPointDownload(userId) {
  return service({
    url: '/mapPoint/download',
    method: 'get',
    params: userId,
    responseType: 'blob'
  })
}
export function mapPointTypeDownload(userId) {
  return service({
    url: '/mapPointType/download',
    method: 'get',
    params: userId,
    responseType: 'blob'
  })
}
export function mapBuildingTypeDownload(userId) {
  return service({
    url: '/mapBuildingType/download',
    method: 'get',
    params: userId,
    responseType: 'blob'
  })
}
export function mapBuildingDownload(userId) {
  return service({
    url: '/mapBuilding/download',
    method: 'get',
    params: userId,
    responseType: 'blob'
  })
}
export function mapRoomDownload(userId) {
  return service({
    url: '/mapRoom/download',
    method: 'get',
    params: userId,
    responseType: 'blob'
  })
}
export function mapRoomTypeDownload(userId) {
  return service({
    url: '/mapRoomType/download',
    method: 'get',
    params: userId,
    responseType: 'blob'
  })
}
export function mapOthersPolygonDownload(userId) {
  return service({
    url: '/mapOthersPolygon/download',
    method: 'get',
    params: userId,
    responseType: 'blob'
  })
}
export function mapOthersPolygonTypeDownload(userId) {
  return service({
    url: '/mapOthersPolygonType/download',
    method: 'get',
    params: userId,
    responseType: 'blob'
  })
}
