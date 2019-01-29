import service from '@/utils/request'

export function campusList(params) {
  return service({
    url: '/mapZone/list',
    method: 'get',
    params: params
  })
}
