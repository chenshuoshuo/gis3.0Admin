import service from '@/utils/request'

export function pageFeedback(params) {
  return service({
    url: '/feedback/search',
    method: 'get',
    params: params
  })
}
export function delFeedback(id) {
  return service({
    url: `/feedback/delete/${id}
    `,
    method: 'delete'
  })
}
export function bulkDeleteFeedback(data) {
  return service({
    url: `/feedback/deleteAll
    `,
    method: 'delete',
    data: data
  })
}
