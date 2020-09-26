import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 加气站企业列表
  filler_firmList_mode_list: item => app.mode.firmList,
  filler_firmList_page_status: item => app.list.firmList,
  filler_firmList_column: item => columns.firmList,
  filler_firmList_select_list: item => select.firmList,
  // 加气站企业列表---添加加气站
  filler_gasstation_mode_list: item => app.mode.gasstation,
  filler_auth_column: item => columns.fillerAuth,
  filler_s_auth_column: item => columns.fillerSAuth,
  filler_user_column: item => columns.fillerUser,
  // 加气站列表
  filler_info_mode_list: item => app.mode.info,
  filler_info_page_status: item => app.list.info,
  filler_info_column: item => columns.info,
  filler_info_select_list: item => select.info,
  // 加气站列表--打印机列表
  filler_printList_page_status: item => app.list.printList,
  filler_printList_select_list: item => select.printList,
  filler_printList_column: item => columns.printList,
  // 加气站资金账户管理
  filler_account_mode_list: item => item.app.modeDefault,
  filler_account_page_status: item => app.list.account,
  filler_account_column: item => columns.account,
  filler_account_select_list: item => select.account,
  // 加气站资金账户管理--账户流水
  filler_account_list_select_list: item => select.accountList,
  filler_accountList_column: item => columns.accountList,
  // 服务费设置
  filler_price_mode_list: item => item.app.modeDefault,
  filler_price_page_status: item => app.list.price,
  filler_price_column: item => columns.price,
  filler_price_select_list: item => select.price,

  filler_price_log_column: item => columns.priceLog,
  // 服务费设置--服务费变更记录
  filler_serviceChangeRecord_column: item => columns.serviceChangeRecord,
  // 气价维护
  filler_updatePrice_mode_list: item => item.app.modeDefault,
  filler_updatePrice_page_status: item => app.list.updatePrice,
  filler_updatePrice_column: item => columns.updatePrice,
  filler_updatePrice_select_list: item => select.updatePrice,
  // 气价维护--气价变更记录
  filler_lngUpdatePrice_column: item => columns.lngUpdatePrice,

  // 加气站库存查询
  filler_gasStockList_mode_list: item => item.app.modeDefault,
  filler_gasStockList_page_status: item => app.list.gasStockList,
  filler_gasStockList_column: item => columns.gasStockList,
  filler_gasStockList_select_list: item => select.gasStockList,
  // 加气站库存查询--入库记录
  filler_gasStockListRecord_column: item => columns.gasStockListRecord,
  // 加气站库存查询--库存调整
  filler_gas_update_stock_column: item => columns.gasUpdateStock,

  // LNG计划管理
  filler_lngPlan_mode_list: item => item.app.modeDefault,
  filler_lngPlan_page_status: item => app.list.lngPlan,
  filler_lngPlan_column: item => columns.lngPlan,
  filler_lngPlan_select_list: item => select.lngPlan,
  // LNG计划管理--详情
  filler_lngPlanDetail_column: item => columns.lngPlanDetail,
  // LNG计划管理--出港录入
  filler_lngPlanDepartures_column: item => columns.lngPlanDepartures,
  // LNG计划管理--确认到站重量
  filler_lngPlanComplete_column: item => columns.lngPlanComplete
}

export default {
  namespaced: true,
  state,
  getters
}
