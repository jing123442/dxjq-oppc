import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'

// columns
import * as userList from './columns/user/index'
import * as busList from './columns/business/index'
import * as fillerList from './columns/filler/index'
import * as carrierList from './columns/carrier/index'
import * as policyList from './columns/policy/index'
import * as settlementList from './columns/settlement/index'
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
    busApp: busList.app,
    fillerColumns: fillerList.columns,
    fillerSelect: fillerList.select,
    fillerApp: fillerList.app,
    carrierColumns: carrierList.columns,
    carrierSelect: carrierList.select,
    carrierApp: carrierList.app,
    policyColumns: policyList.columns,
    policySelect: policyList.select,
    policyApp: policyList.app,
    settlementColumns: settlementList.columns,
    settlementSelect: settlementList.select,
    settlementApp: settlementList.app
  },
  getters: {
    // 平台用户管理
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

    // 平台公司
    bus_org_mode_list: state => state.busApp.mode.org,
    bus_org_page_status: state => state.app.listDefault,
    bus_org_column: state => state.busColumns.org,
    bus_org_select_list: state => state.busSelect.org,

    // 加气站企业列表
    filler_firmList_mode_list: state => state.fillerApp.mode.firmList,
    filler_firmList_page_status: state => state.app.listDefault,
    filler_firmList_column: state => state.fillerColumns.firmList,
    filler_firmList_select_list: state => state.fillerSelect.firmList,

    // 加气站列表
    filler_gapList_mode_list: state => state.fillerApp.mode.gapList,
    filler_gapList_page_status: state => state.app.listDefault,
    filler_gapList_column: state => state.fillerColumns.gapList,
    filler_gapList_select_list: state => state.fillerSelect.gapList,

    // 加气站资金账户管理
    filler_account_mode_list: state => state.fillerApp.mode.modeDefault,
    filler_account_page_status: state => state.app.listDefault,
    filler_account_column: state => state.fillerColumns.account,
    filler_account_select_list: state => state.fillerSelect.account,

    // 服务费设置
    filler_sevicePrice_mode_list: state => state.fillerApp.mode.modeDefault,
    filler_sevicePrice_page_status: state => state.app.listDefault,
    filler_sevicePrice_column: state => state.fillerColumns.sevicePrice,
    filler_sevicePrice_select_list: state => state.fillerSelect.sevicePrice,

    // 气价维护
    filler_updatePrice_mode_list: state => state.fillerApp.mode.modeDefault,
    filler_updatePrice_page_status: state => state.app.listDefault,
    filler_updatePrice_column: state => state.fillerColumns.updatePrice,
    filler_updatePrice_select_list: state => state.fillerSelect.updatePrice,

    // 物流公司
    carrier_logistics_mode_list: state => state.carrierApp.mode.modeDefault,
    carrier_logistics_page_status: state => state.app.listDefault,
    carrier_logistics_column: state => state.carrierColumns.logistics,
    carrier_logistics_select_list: state => state.carrierSelect.logistics,

    // 公司账户
    carrier_firmAccount_mode_list: state => state.carrierApp.mode.modeDefault,
    carrier_firmAccount_page_status: state => state.app.listDefault,
    carrier_firmAccount_column: state => state.carrierColumns.firmAccount,
    carrier_firmAccount_select_list: state => state.carrierSelect.firmAccount,

    // 车辆管理
    carrier_vehicle_mode_list: state => state.carrierApp.mode.modeDefault,
    carrier_vehicle_page_status: state => state.app.listDefault,
    carrier_vehicle_column: state => state.carrierColumns.vehicle,
    carrier_vehicle_select_list: state => state.carrierSelect.vehicle,

    // 车辆资金账户管理
    carrier_truckAccount_mode_list: state => state.carrierApp.mode.modeDefault,
    carrier_truckAccount_page_status: state => state.app.listDefault,
    carrier_truckAccount_column: state => state.carrierColumns.truckAccount,
    carrier_truckAccount_select_list: state => state.carrierSelect.truckAccount,

    // 充值记录
    carrier_rechargeRecord_mode_list: state => state.carrierApp.mode.modeDefault,
    carrier_rechargeRecord_page_status: state => state.app.listDefault,
    carrier_rechargeRecord_column: state => state.carrierColumns.rechargeRecord,
    carrier_rechargeRecord_select_list: state => state.carrierSelect.rechargeRecord,

    // 圈存管理
    carrier_inventoryManager_mode_list: state => state.carrierApp.mode.modeDefault,
    carrier_inventoryManager_page_status: state => state.app.listDefault,
    carrier_inventoryManager_column: state => state.carrierColumns.inventoryManager,
    carrier_inventoryManager_select_list: state => state.carrierSelect.inventoryManager,

    // 加气订单管理
    carrier_orderManager_mode_list: state => state.carrierApp.mode.modeDefault,
    carrier_orderManager_page_status: state => state.app.listDefault,
    carrier_orderManager_column: state => state.carrierColumns.orderManager,
    carrier_orderManager_select_list: state => state.carrierSelect.orderManager,

    // 物流公司价格配置
    policy_firmPrice_mode_list: state => state.policyApp.mode.modeDefault,
    policy_firmPrice_page_status: state => state.app.listDefault,
    policy_firmPrice_column: state => state.policyColumns.firmPrice,
    policy_firmPrice_select_list: state => state.policySelect.firmPrice,

    // 物流公司价格配置
    policy_gasPrice_mode_list: state => state.policyApp.mode.modeDefault,
    policy_gasPrice_page_status: state => state.app.listDefault,
    policy_gasPrice_column: state => state.policyColumns.gasPrice,
    policy_gasPrice_select_list: state => state.policySelect.gasPrice,

    // 价格变更记录
    policy_record_mode_list: state => state.policyApp.mode.modeDefault,
    policy_record_page_status: state => state.app.listDefault,
    policy_record_column: state => state.policyColumns.record,
    policy_record_select_list: state => state.policySelect.record,

    // 液源地配置
    policy_sourceConfig_mode_list: state => state.policyApp.mode.modeDefault,
    policy_sourceConfig_page_status: state => state.app.listDefault,
    policy_sourceConfig_column: state => state.policyColumns.sourceConfig,
    policy_sourceConfig_select_list: state => state.policySelect.sourceConfig,

    // 加气站库存查询
    policy_gasStockList_mode_list: state => state.policyApp.mode.modeDefault,
    policy_gasStockList_page_status: state => state.app.listDefault,
    policy_gasStockList_column: state => state.policyColumns.gasStockList,
    policy_gasStockList_select_list: state => state.policySelect.gasStockList,

    // LNG计划管理
    policy_lngPlan_mode_list: state => state.policyApp.mode.modeDefault,
    policy_lngPlan_page_status: state => state.app.listDefault,
    policy_lngPlan_column: state => state.policyColumns.lngPlan,
    policy_lngPlan_select_list: state => state.policySelect.lngPlan,

    // 加气站服务费汇总
    settlement_servicePrice_mode_list: state => state.settlementApp.mode.modeDefault,
    settlement_servicePrice_page_status: state => state.app.listDefault,
    settlement_servicePrice_column: state => state.settlementColumns.servicePrice,
    settlement_servicePrice_select_list: state => state.settlementSelect.servicePrice,

    // 物流公司加气费汇总
    settlement_gasPrice_mode_list: state => state.settlementApp.mode.modeDefault,
    settlement_gasPrice_page_status: state => state.app.listDefault,
    settlement_gasPrice_column: state => state.settlementColumns.gasPrice,
    settlement_gasPrice_select_list: state => state.settlementSelect.gasPrice,

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
