import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/map/v1/style/page',
    method: 'get',
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
    url: `/map/v1/style/`,
    method: 'put',
    data:query
  })
}

export function fetchGetStyle(id) {
  return request({
    url: `/map/v1/style/${id}`,
    method: 'get'
  })
}

export function fetchUpdateStyle(id, query) {
  return request({
    url: `/map/v1/style/${id}`,
    method: 'post',
    data: query
  })
}


