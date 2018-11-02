import request from '@/utils/request'

export function fetchTileList(query) {
  return request({
    url: '/map/v1/tile/page',
    method: 'get',
    params: query
  })
}
export function fetchTileDelete(id) {
  return request({
    url: `/map/v1/tile/delete/${id}`,
    method: 'delete'
  })
}
export function fetchTileGet(id) {
  return request({
    url: `/map/v1/tile/${id}`,
    method: 'get'
  })
}
export function fetchTilePreview(id) {
  return request({
    url: `/map/v1/tile/preview/${id}`,
    method: 'get'
  })
}
export function fetchTileUpdate(params) {
  return request({
    url: `/map/v1/tile/${params.get('fileid')}`,
    method: 'post',
    data:params,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
export function fetchAddtTile(params) {
  return request({
    url: `/map/v1/tile/create`,
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function fetchDownloadtTile(id){
  return request({
    url: `/map/v1/tile/download/${id}`,
    method: 'get'
  })
}
