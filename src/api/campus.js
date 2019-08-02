import axios from 'axios'

export function campusList() {
  return new Promise((resolve, reject) => {
    axios.get(window.g.BASE_GIS + '/map/v2/group?page=0&pageSize=10000').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function taskState(ids) {
  return new Promise((resolve, reject) => {
    axios.get(window.g.BASE_GIS + `/map/v3/task/zone/${ids}`).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
