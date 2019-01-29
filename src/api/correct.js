import service from '@/utils/request'

export function addCorrect(params) {
  return service({
    url: '/correct/add',
    method: 'get',
    params: params
  })
}
export function pageCorrect(params) {
  return service({
    url: '/correct/search',
    method: 'get',
    params: params
  })
}
export function delCorrect(id) {
  return service({
    url: `/correct/delete/${id}`,
    method: 'delete'
  })
}
export function blukDeleteCorrect(params) {
  return service({
    url: `/correct/deleteAll`,
    method: 'delete',
    data: params
  })
}
