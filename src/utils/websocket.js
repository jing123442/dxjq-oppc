import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import router from '@/router'
import store from '@/store'
import { Dialog } from 'vant'

const BASE_URL = process.env.VUE_APP_BASE_URL
let stompClient = null
function connect() {
  if (stompClient == null || !stompClient.connected) {
    const socket = new SockJS(BASE_URL + '/message/websocket')
    stompClient = Stomp.over(socket)
    const headers = {
      access_token: store.getters.mwxtoken,
      identifier: store.getters.mwxidntf
    }
    stompClient.connect(headers, successcb, errorcb)
  }
}
function successcb() {
  stompClient.subscribe(
    '/user/' + store.getters.mwxuser.user_id + '/msg',
    callback
  )
}
function callback(res) {
  const body = JSON.parse(res.body)
  if (body.type == 1) {
    router.push('/perpayOrder')
  } else if (body.type == 0) {
    var content = JSON.parse(body.content)
    Dialog.alert({
      title: content.data,
      message: content.message
    }).then(() => {})
  }
}
async function errorcb() {
  await sleep(8000)
  disconnect()
  await sleep(2000)
  stompClient = null
  connect()
}
function sleep (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
function disconnect() {
  if (stompClient) {
    stompClient.disconnect()
  }
}

export default { connect, disconnect }
