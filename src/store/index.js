import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  getters: {
    debug: state => state.app.debug,
    mwxtoken: state => state.user.mwxtoken,
    mwxidntf: state => state.user.mwxidntf,
    mwxuser: state => state.user.mwxuser,
    mwxrole: state => state.user.mwxrole,
    mwxorg: state => state.user.mwxorg
  }
})
