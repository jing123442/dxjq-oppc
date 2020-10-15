import { $login, $logout } from '@/service/main'
import { menuList } from '@/utils/menu'
import app from '../modules/app'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/storage'

const Base64 = require('js-base64').Base64

const user = {
  state: {
    woptoken: getLocalStorage('woptoken') || '',
    wopidntf: getLocalStorage('wopidntf') || '',
    wopuser: JSON.parse(getLocalStorage('wopuser')) || {},
    woprole: getLocalStorage('woprole') || '',
    woporg: getLocalStorage('woporg') || '',
    routers: menuList()
  },

  mutations: {
    setwoptoken: (state, payload) => {
      state.woptoken = payload
    },
    setwopidntf: (state, payload) => {
      state.wopidntf = payload
    },
    setwopuser: (state, payload) => {
      state.wopuser = payload
    },
    setwoprole: (state, payload) => {
      state.woprole = payload
    },
    setwoporg: (state, payload) => {
      state.woporg = payload
    }
  },
  actions: {
    login({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        $login(data).then(response => {
          if (response.data.code === 0) {
            const token = response.data.data.access_token
            const user = response.data.data.user
            const orgId = user.authorities[0].orgId
            const roleId = user.authorities[0].roles[0].roleId
            const identifier = Base64.encode(
              'woperation:' + orgId + ':' + user.user_id + ':' + roleId
            )

            setLocalStorage('woptoken', token)
            setLocalStorage('wopuser', JSON.stringify(user))
            setLocalStorage('wopidntf', identifier)
            setLocalStorage('woporg', orgId)
            setLocalStorage('woprole', roleId)
            commit('setwoptoken', token)
            commit('setwopidntf', identifier)
            commit('setwopuser', user)
            commit('setwoprole', roleId)
            commit('setwoporg', orgId)

            // 更新上传文件头信息
            app.state.fileHeaders.Authorization = 'Bearer ' + getLocalStorage('woptoken')
            app.state.fileHeaders.Identifier = getLocalStorage('wopidntf')
          }

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        const data = {
          client_id: 'woperation',
          user_id: state.wopuser.user_id
        }
        $logout(data).then(response => {
          removeLocalStorage('woptoken')
          removeLocalStorage('wopuser')
          removeLocalStorage('wopidntf')
          removeLocalStorage('woporg')
          removeLocalStorage('woprole')
          removeLocalStorage('location_pointer')
          commit('setwoptoken')
          commit('setwopidntf')
          commit('setwopuser')
          commit('setwoprole')
          commit('setwoporg')

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    clear({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeLocalStorage('woptoken')
        removeLocalStorage('wopuser')
        removeLocalStorage('wopidntf')
        removeLocalStorage('woporg')
        removeLocalStorage('woprole')
        removeLocalStorage('location_pointer')
        commit('setwoptoken')
        commit('setwopidntf')
        commit('setwopuser')
        commit('setwoprole')
        commit('setwoporg')
        resolve()
      })
    }
  }
}

export default user
