import store from '@/store'
import Axios from 'axios'
const axios = Axios.create({
  timeout: 30000,
  baseURL: process.env.VUE_APP_BASE_URL
})
const Base64 = require('js-base64').Base64

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

export async function $logout (data) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Bearer ' + store.getters.mwxtoken,
    Identifier: store.getters.mwxidntf
  }
  return await axios({
    url: 'user/oauth/logout',
    method: 'POST',
    params: data,
    headers
  })
}
