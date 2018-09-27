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

export function fetchGetStyle(id) {
  return request({
    url: `/map/v1/style/${id}`,
    method: 'get'
  })
}

export function fetchUpdateStyle(id, query) {
	alert(`/map/v1/style/${id}`)
	console.log(query)
  return request({
    url: `/map/v1/style/${id}`,
    method: 'post',
    params: query
  })
}
