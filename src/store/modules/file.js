import { getSessionStorage } from '@/utils/storage'

const file = {
  state: {
    fileHost: process.env.VUE_APP_FILE_HOST,
    fileUrl: process.env.VUE_APP_BASE_URL + 'message/upload/image',
    fileHeaders: function() {
      return function() {
        return {
          Authorization: 'Bearer ' + getSessionStorage('woptoken'),
          Identifier: getSessionStorage('wopidntf')
        }
      }
    },
    fileUEditorConfig: {
      UEDITOR_HOME_URL: './UEditor/',
      serverUrl: process.env.VUE_APP_BASE_URL + 'message/upload/image',
      imageActionName: 'file',
      imageMaxSize: 1048576, // 最大限制1M
      imageAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
      imageUrlPrefix: process.env.VUE_APP_FILE_HOST,
      headers: function() {
        return  {
          Authorization: 'Bearer ' + getSessionStorage('woptoken'),
          Identifier: getSessionStorage('wopidntf')
        }
      }
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
          Authorization: 'Bearer ' + getSessionStorage('woptoken'),
          Identifier: getSessionStorage('wopidntf')
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
          Authorization: 'Bearer ' + getSessionStorage('woptoken'),
          Identifier: getSessionStorage('wopidntf')
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
