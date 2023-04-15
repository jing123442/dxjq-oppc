import Axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const axios = Axios.create({
  timeout: 30000,
  baseURL: process.env.VUE_APP_BASE_URL
})
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + store.getters.woptoken
    config.headers.Identifier = store.getters.wopidntf
    store.getters.debug && console.log('axios.interceptors.request.use...', config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    store.getters.debug && console.log('axios.interceptors.response.use...', response)
    if (response.config.responseType === 'blob') { // 导出文件
      if (response.status === 200) {
        return Promise.resolve(response.data)
      } else {
        var message = '文件导出失败！'
        Message({
          message: message,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(message)
      }
    } else {
      return Promise.resolve(response.data)
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400 : err.message = '请求错误(400)'; break
        case 401: err.message = '未授权，请重新登录(401)'; break
        case 403: err.message = '拒绝访问(403)'; break
        case 404: err.message = '请求出错(404)'; break
        case 408: err.message = '请求超时(408)'; break
        case 500: err.message = '服务器错误(500)'; break
        case 501: err.message = '服务未实现(501)'; break
        case 502: err.message = '网络错误(502)'; break
        case 503: err.message = '服务不可用(503)'; break
        case 504: err.message = '网络超时(504)'; break
        case 505: err.message = 'HTTP版本不受支持(505)'; break
        default: err.message = `连接出错(${err.response.status})!`
      }
    } else {
      err.message = '连接服务器失败!'
    }
    Message({
      message: err.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(err.message)
  }
)
export default ({ url, method = 'POST', data = {}, params = {}, responseType = 'json' }) => {
  return axios({ url, method, data, params, responseType })
}
