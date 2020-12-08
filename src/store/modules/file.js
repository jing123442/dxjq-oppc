import { getLocalStorage } from '@/utils/storage'

const file = {
  state: {
    fileHost: process.env.VUE_APP_FILE_HOST,
    fileUrl: process.env.VUE_APP_BASE_URL + 'message/upload/file',
    fileHeaders: function () {
      return {
        Authorization: 'Bearer ' + getLocalStorage('woptoken'),
        Identifier: getLocalStorage('wopidntf')
      }
    },
    fileSuccess: {
      key: 'code',
      value: 0,
      message: 'message',
      filename: 'data'
    },
    successAxios: {
      url: 'user/org_pic/add',
      method: 'post',
      axios: {
        timeout: 30000,
        baseURL: process.env.VUE_APP_BASE_URL,
        headers: function() {
          return {
            Authorization: 'Bearer ' + getLocalStorage('woptoken'),
            Identifier: getLocalStorage('wopidntf')
          }
        }
      }
    },
    deleteAxios: process.env.VUE_APP_BASE_URL + 'user/org_pic/delete_org_pic'
  },
  mutations: {},
  actions: {}
}

export default file
