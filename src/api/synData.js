import service from '@/utils/request'

export function mapBuildingSynData(userId) {
  return service({
    url: '/mapBuilding/synData',
    method: 'get',
    params: userId
  })
}
export function mapRoomSynData(userId) {
  return service({
    url: '/mapRoom/synData',
    method: 'get',
    params: userId
  })
}
export function mapOthersPolygonSynData(userId) {
  return service({
    url: '/mapOthersPolygon/synData',
    method: 'get',
    params: userId
  })
}
