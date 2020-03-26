import service from '@/utils/zk'

export function refreshToken(refreshToken) {
  return service({
    url: `/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}&client_id=cmccr-h5&client_secret=cmccr-h5`,
    method: 'GET'
  })
}

export function getUserInfo(username) {
  return service({
    url: `/center/user/name/${username}`,
    method: 'get'
  })
}
// 保存版本接口
export function saveVerManager(data) {
  return service({
    url: `/center/ccrVersionSystem/v1/save`,
    method: 'put',
    params: data
  })
}
