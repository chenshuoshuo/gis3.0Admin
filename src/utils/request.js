import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
// import store from '@/store'
// import { getCookie } from '@/utils/auth'
// const Base64 = require('js-base64').Base64
// process.env.BASE_API = baseURLStr
// create an axios instance Authorization

const service = axios.create({
  baseURL: window.g.BASE_IPS
})
// request interceptor
service.interceptors.request.use(config => {
  if (getToken()) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, error => {
  // Do something with request error
// console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    // 成功请求
    var params = new URLSearchParams()
    params.append('method', response.config.method)
    params.append('successed', true)
    params.append('url', response.config.url)
    axios.put(`${window.g.BASE_CCR}/center/record/v1/add`, params)
    return Promise.resolve(response)
  },
  error => {
    console.log('err' + error) // for debug
    var params = new URLSearchParams()
    params.append('method', error.config.method)
    params.append('successed', false)
    params.append('url', error.config.url)
    params.append('exception', JSON.stringify(error.response.data))
    axios.put(`${window.g.BASE_CCR}/center/record/v1/add`, params)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
