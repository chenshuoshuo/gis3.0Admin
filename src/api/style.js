import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/map/v1/style/page',
    method: 'post',
    params: query
  })
}
export function fetchDelete(id) {
  return request({
    url: `/map/v1/style/${id}`,
    method: 'delete'
  })
}
export function fetchAddStyle(query) {
  return request({
    url: `/map/v1/style`,
    method: 'put',
    params: query
  })
}
