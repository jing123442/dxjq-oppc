/* eslint-disable */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getDefaultHeader() {
  var access_token = localStorage.getItem("access_token")
  var user_info = JSON.parse(localStorage.getItem("user_info"))
  var Authorization = "Bearer " + access_token;
  var user_id = user_info.user_id
  var org_id = user_info.authorities[0].orgId;
  var current_roleId = localStorage.getItem("current_roleId")
  var identifier = Base64.encode("woperation:" + org_id + ":" + user_id + ":" + current_roleId)
  var headers = {
    'Authorization': Authorization,
    'identifier': identifier
  }
  return headers
}
