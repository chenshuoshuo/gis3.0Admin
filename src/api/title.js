import request from '@/utils/request'

export function fetchTitleList(query) {
  return request({
    url: '/map/v1/tile/page',
    method: 'post',
    params: query
  })
}
export function fetchTitleDelete(id) {
  return request({
    url: `/map/v1/tile/${id}`,
    method: 'delete'
  })
}
export function fetchAddtTitle(query) {
  return request({
    url: `/map/v1/tile`,
    method: 'put',
    params: query
  })
}
