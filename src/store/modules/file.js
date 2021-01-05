import { getLocalStorage } from '@/utils/storage'

const file = {
  state: {
    fileHost: process.env.VUE_APP_FILE_HOST,
    fileUrl: process.env.VUE_APP_BASE_URL + 'message/upload/image',
    fileHeaders: {
      Authorization: 'Bearer ' + getLocalStorage('woptoken'),
      Identifier: getLocalStorage('wopidntf')
    },
    fileSuccess: {
      key: 'code',
      value: 0,
      message: 'message',
      filename: 'data'
    },
    successAxios: {
      base: {
        url: 'user/org_pic/add',
        method: 'post'
      },
      params: {
        picPath: 'data',
        picType: { type: 'value', value: 100 },
        orgId: { type: 'row', value: 'gasstationId' }
      },
      axios: {
        timeout: 30000,
        baseURL: process.env.VUE_APP_BASE_URL,
        headers: {
          Authorization: 'Bearer ' + getLocalStorage('woptoken'),
          Identifier: getLocalStorage('wopidntf')
        }
      }
    },
    deleteAxios: {
      base: {
        url: 'user/org_pic/delete_org_pic',
        method: 'post'
      },
      params: {
        id: 'id'
      },
      axios: {
        timeout: 30000,
        baseURL: process.env.VUE_APP_BASE_URL,
        headers: {
          Authorization: 'Bearer ' + getLocalStorage('woptoken'),
          Identifier: getLocalStorage('wopidntf')
        }
      }
    }
  },
  mutations: {
    setheaders: (state, payload) => {
      state.fileHeaders.Authorization = payload.Authorization
      state.fileHeaders.Identifier = payload.Identifier
    },
    setsuccessheaders: (state, payload) => {
      state.successAxios.axios.headers.Authorization = payload.Authorization
      state.successAxios.axios.headers.Identifier = payload.Identifier
    },
    setdelheaders: (state, payload) => {
      state.deleteAxios.axios.headers.Authorization = payload.Authorization
      state.deleteAxios.axios.headers.Identifier = payload.Identifier
    }
  },
  actions: {
    setFileHeaders: ({ commit, state }, headers) => {
      commit('setheaders', headers)
    },
    setFileSuccessHeaders: ({ commit, state }, headers) => {
      if (state.successAxios && state.successAxios.axios && state.successAxios.axios.headers) {
        commit('setsuccessheaders', headers)
      }
    },
    setFileDelHeaders: ({ commit, state }, headers) => {
      if (state.deleteAxios && state.deleteAxios.axios && state.deleteAxios.axios.headers) {
        commit('setdelheaders', headers)
      }
    }
  }
}

export default file
