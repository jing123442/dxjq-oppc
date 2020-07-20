import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'

// columns
import * as userList from './columns/user/index'
import * as busList from './columns/business/index'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    userColumns: userList.columns,
    userSelect: userList.select,
    busColumns: busList.columns,
    busSelect: busList.select,
    busApp: busList.app
  },
  getters: {
    // user columns
    user_op_mode_list: state => state.app.modeDefault,
    user_op_page_status: state => state.app.listDefault,
    user_op_column: state => state.userColumns.op,
    user_op_select_list: state => state.userSelect.op,
    // 物流公司用户管理
    user_carrier_mode_list: state => state.app.modeDefault,
    user_carrier_page_status: state => state.app.listDefault,
    user_carrier_column: state => state.userColumns.carrier,
    user_carrier_select_list: state => state.userSelect.carrier,

    // 加气站公司用户管理
    user_cashier_mode_list: state => state.app.modeDefault,
    user_cashier_page_status: state => state.app.listDefault,
    user_cashier_column: state => state.userColumns.cashier,
    user_cashier_select_list: state => state.userSelect.cashier,

    // 加气站公司用户管理
    bus_org_mode_list: state => state.busApp.mode.org,
    bus_org_page_status: state => state.app.listDefault,
    bus_org_column: state => state.busColumns.org,
    bus_org_select_list: state => state.busSelect.org,

    // localstorage
    debug: state => state.app.debug,
    woptoken: state => state.user.woptoken,
    wopidntf: state => state.user.wopidntf,
    wopuser: state => state.user.wopuser,
    woprole: state => state.user.woprole,
    woporg: state => state.user.woporg,

    // dialog width
    add_edit_dialog_form: stare => '70%',
    del_dialog_form: stare => '40%',

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
