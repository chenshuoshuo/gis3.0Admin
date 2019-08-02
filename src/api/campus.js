import axios from 'axios'
import cmgis from '@/utils/cmgis'

export function campusList() {
  return new Promise((resolve, reject) => {
    axios.get(window.g.BASE_GIS + '/map/v2/group?page=0&pageSize=10000').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function taskState(zonid) {
  return cmgis({
    url: `/map/v2/geo/flush/${zonid}`,
    method: 'post'
  })
}
