import store from '@/store'
import Axios from 'axios'
const axios = Axios.create({
  timeout: 30000,
  baseURL: process.env.VUE_APP_BASE_URL
})
const Base64 = require('js-base64').Base64

// 登录
export async function $login (data) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + Base64.encode('woperation:123456'),
    Identifier: Base64.encode('woperation:org:user:role')
  }
  return await axios({
    url: 'user/oauth/token',
    method: 'POST',
    params: data,
    headers
  })
}

// 登出
export async function $logout (data) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Bearer ' + store.getters.woptoken,
    Identifier: store.getters.wopidntf
  }
  return await axios({
    url: 'user/oauth/logout',
    method: 'POST',
    params: data,
    headers
  })
}

// 上传文件
export async function $upload (data) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + store.getters.woptoken,
    Identifier: store.getters.wopidntf
  }
  return await axios({
    url: 'message/upload/file',
    method: 'POST',
    data: data,
    headers
  })
}
