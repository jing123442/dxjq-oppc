import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'

// columns
import * as userList from './columns/user/index'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    userColumns: userList.user,
    userSelect: userList.select
  },
  getters: {
    // user columns
    user_op_mode_list: state => state.app.modeDefault,
    user_op_page_status: state => state.app.listDefault,
    user_op_column: state => state.userColumns.op,
    user_op_select_list: state => state.userSelect.op,

    // localstorage
    debug: state => state.app.debug,
    mwxtoken: state => state.user.mwxtoken,
    mwxidntf: state => state.user.mwxidntf,
    mwxuser: state => state.user.mwxuser,
    mwxrole: state => state.user.mwxrole,
    mwxorg: state => state.user.mwxorg,

    // layout
    permission_routers: state => state.user.routers,
    sidebar: state => state.app.sidebar,
    prefix: state => state.app.systemprefix,
    suffix: state => state.app.systemsuffix,

    // list 参数
    query_params: state => state.app.queryParams,
    response_success: state => state.app.responseSuccess
  }
})
