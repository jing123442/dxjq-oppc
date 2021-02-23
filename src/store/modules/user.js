import app from './app'
import { $login, $logout } from '@/service/main'
import { $menuTree } from '@/service/user'
import { menuList } from '@/utils/menu'
import { setLocalStorage, getLocalStorage, removeSelfAllLocalStorage } from '@/utils/storage'

const Base64 = require('js-base64').Base64

const user = {
  state: {
    woptoken: getLocalStorage('woptoken') || '',
    wopidntf: getLocalStorage('wopidntf') || '',
    wopuser: JSON.parse(getLocalStorage('wopuser')) || {},
    woprole: getLocalStorage('woprole') || '',
    woporg: getLocalStorage('woporg') || '',
    routers: JSON.parse(getLocalStorage('menu_tree')) || []
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
    },
    setrouters: (state, payload) => {
      state.routers = payload
    }
  },
  actions: {
    login({ dispatch, commit, state }, data) {
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
            // 用户登录唯一性
            sessionStorage.setItem(process.env.VUE_APP_SESSION_ID, user.user_id)
            // 当前菜单树
            $menuTree({ clientId: 'woperation', roleId: roleId }).then(response => {
              const menuData = app.state.menuType ? response.data : menuList()
              setLocalStorage('menu_tree', JSON.stringify(menuData))
              commit('setrouters', menuData)
            })

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

            // 重置文件操作头参数
            const headers = {
              Authorization: 'Bearer ' + token,
              Identifier: identifier
            }
            dispatch('setFileHeaders', headers)
            dispatch('setFileSuccessHeaders', headers)
            dispatch('setFileDelHeaders', headers)
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
          user_id: sessionStorage.getItem(process.env.VUE_APP_SESSION_ID)
        }
        $logout(data).then(response => {
          removeSelfAllLocalStorage()

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
        removeSelfAllLocalStorage()

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
