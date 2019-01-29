import service from '@/utils/request'
export function mapSynchronize() {
  return service({
    url: `/portalInit/initAll`,
    method: 'get'
  })
}
