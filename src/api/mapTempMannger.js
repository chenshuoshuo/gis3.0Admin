import request from '@/utils/request'

export function fetchTempList(query) {
  return request({
    url: '/map/v1/present/',
    method: 'get',
    params: query
  })
}

export function fetchAddTemp(query) {
  return request({
    url: '/map/v1/present/',
    method: 'put',
    data: query
  })
}

export function fetchDelTemp(id) {
  return request({
    url: `/map/v1/present/${id}`,
    method: 'delete'
  })
}
export function fetchTemp(id) {
  return request({
    url: `/map/v1/present/${id}`,
    method: 'get'
  })
}
export function fetchUpdataTemp(query) {
  return request({
    url: `/map/v1/present/${query.id}`,
    method: 'post',
    data: query
  })
}

export function fetchDownloadtTemp(id){
  return request({
    url: `/map/v1/present/${id}.zip`,
    method: 'get'
  })
}

export function fetchUploadTemp(params) {
  return request({
    url: '/map/v1/present/import/',
    method: 'post',
    data:params,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
