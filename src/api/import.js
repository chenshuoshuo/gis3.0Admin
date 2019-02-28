import service from '@/utils/request'

export function importExcel(url,data){
  return service({
    url:url,
    method:'post',
    data:data
  })
}