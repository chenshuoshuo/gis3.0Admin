import service from '@/utils/request'

export function mapOrganizationDownloadTemplate() {
  return service({
    url: '/mapOrganization/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
export function mapOrganizationTypeDownloadTemplate() {
  return service({
    url: '/mapOrganizationType/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
export function mapPointDownloadTemplate() {
  return service({
    url: '/mapPoint/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
export function mapPointTypeDownloadTemplate() {
  return service({
    url: '/mapPointType/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
export function mapBuildingTypeDownloadTemplate() {
  return service({
    url: '/mapBuildingType/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
export function mapBuildingDownloadTemplate() {
  return service({
    url: '/mapBuilding/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
export function mapRoomDownloadTemplate() {
  return service({
    url: '/mapRoom/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
export function mapRoomTypeDownloadTemplate() {
  return service({
    url: '/mapRoomType/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
export function mapOthersPolygonDownloadTemplate() {
  return service({
    url: '/mapOthersPolygon/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
export function mapOthersPolygonTypeDownloadTemplate() {
  return service({
    url: '/mapOthersPolygonType/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
