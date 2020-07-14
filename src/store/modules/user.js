import { $login, $logout } from '@/service/main'
import { menuList } from '@/utils/menu'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/storage'

const Base64 = require('js-base64').Base64

const user = {
  state: {
    mwxtoken: getLocalStorage('mwxtoken') || '',
    mwxidntf: getLocalStorage('mwxidntf') || '',
    mwxuser: JSON.parse(getLocalStorage('mwxuser')) || {},
    mwxrole: getLocalStorage('mwxrole') || '',
    mwxorg: getLocalStorage('mwxorg') || '',
    routers: menuList()
  },

  mutations: {
    setmwxtoken: (state, payload) => {
      state.mwxtoken = payload
    },
    setmwxidntf: (state, payload) => {
      state.mwxidntf = payload
    },
    setmwxuser: (state, payload) => {
      state.mwxuser = payload
    },
    setmwxrole: (state, payload) => {
      state.mwxrole = payload
    },
    setmwxorg: (state, payload) => {
      state.mwxorg = payload
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

            setLocalStorage('mwxtoken', token)
            setLocalStorage('mwxuser', JSON.stringify(user))
            setLocalStorage('mwxidntf', identifier)
            setLocalStorage('mwxorg', orgId)
            setLocalStorage('mwxrole', roleId)
            commit('setmwxtoken', token)
            commit('setmwxidntf', identifier)
            commit('setmwxuser', user)
            commit('setmwxrole', roleId)
            commit('setmwxorg', orgId)
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
          client_id: 'mwxservice',
          user_id: state.mwxuser.user_id
        }
        $logout(data).then(response => {
          removeLocalStorage('mwxtoken')
          removeLocalStorage('mwxuser')
          removeLocalStorage('mwxidntf')
          removeLocalStorage('mwxorg')
          removeLocalStorage('mwxrole')
          removeLocalStorage('location_pointer')
          commit('setmwxtoken')
          commit('setmwxidntf')
          commit('setmwxuser')
          commit('setmwxrole')
          commit('setmwxorg')

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    clear({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeLocalStorage('mwxtoken')
        removeLocalStorage('mwxuser')
        removeLocalStorage('mwxidntf')
        removeLocalStorage('mwxorg')
        removeLocalStorage('mwxrole')
        removeLocalStorage('location_pointer')
        commit('setmwxtoken')
        commit('setmwxidntf')
        commit('setmwxuser')
        commit('setmwxrole')
        commit('setmwxorg')
        resolve()
      })
    }
  }
}

export default user
