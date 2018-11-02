import request from '@/utils/request'

export function fetchZoneList(query) {
  return request({
    url: '/map/v1/zone/page',
    method: 'get',
    params: query
  })
}
export function fetchDeleteSingle(id) {
return request({
    url: `/map/v1/raster/${id}`,
    method: 'delete'
})
}
export function fetchRasterDelete(id) {
return request({
    url: `/map/v1/raster/map/${id}`,
    method: 'delete'
})
}
export function fetchRasterGet(query) {
return request({
    url: `/map/v1/raster/`,
    method: 'get',
    params: query
})
}

export function fetchUploadRaster(params) {
return request({
    url: `/map/v1/raster/upload`,
    method: 'post',
    data:params,
    headers: {
      "Content-Type": "multipart/form-data"
    }
})
}

