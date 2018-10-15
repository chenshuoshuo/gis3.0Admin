import request from '@/utils/request'

export function fetchZoneList(query) {
  return request({
    url: '/map/v1/zone/page',
    method: 'post',
    params: query
  })
}

export function fetchAddZone(query) {
  return request({
    url: '/map/v1/zone',
    method: 'put',
    params: query
  })
}

export function fetchDelZone(id) {
  return request({
    url: `/map/v1/zone/${id}`,
    method: 'delete'
  })
}
export function fetchZone(id) {
  return request({
    url: `/map/v1/zone/${id}`,
    method: 'get'
  })
}
export function fetchUpdataZone(query) {
  return request({
    url: `/map/v1/zone/${query.id}`,
    method: 'post',
    params: query
  })
}

export function uploadIcon(pic){
  return request({
    url: `/map/v1/zone/uploadIcon`,
    method: 'put',
    data:pic,
    headers:{'Content-Type':'multipart/form-data'}
  })
}
