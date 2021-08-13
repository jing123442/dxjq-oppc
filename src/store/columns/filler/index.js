import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 加气站企业列表
  filler_firmList_mode_list: item => app.mode.firmList,
  filler_firmList_page_status: item => app.list.firmList,
  filler_firmList_column: item => columns.firmList,
  filler_filler_child_column: item => columns.fillerChild,
  filler_firmList_select_list: item => select.firmList,
  // 加气站企业列表---添加加气站
  filler_manage_mode_list: item => app.mode.orgManageInfo,
  filler_gasstation_mode_list: item => app.mode.gasstation,
  filler_user_column: item => columns.fillerUser,
  // 加气站列表
  filler_info_mode_list: item => app.mode.info,
  filler_info_page_status: item => app.list.info,
  filler_info_column: item => columns.info,
  // 加气站认证列表
  filler_auth_list_column: item => columns.fillerAuthList,
  filler_info_select_list: item => select.info,
  // 加气站列表--打印机列表
  filler_printList_page_status: item => app.list.printList,
  filler_printList_select_list: item => select.printerList,
  filler_printList_column: item => columns.printList,
  filler_printList_modeList: item => item.app.printList,
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
  filler_lngPlan_mode_list: item => app.mode.lngPlan,
  filler_lngPlan_page_status: item => app.list.lngPlan,
  filler_lngPlan_column: item => columns.lngPlan,
  filler_lngPlan_select_list: item => select.lngPlan,
  // LNG计划管理--变更记录
  filler_lng_plan_change_list_column: item => columns.lngPlanChangeInfo,
  // LNG计划管理--变更计划
  filler_lng_plan_change_mode_list: item => app.mode.lngPlanChange,
  filler_lng_plan_change_column: item => columns.lngPlanChange,
  // LNG计划管理--确认
  filler_lng_plan_info_mode_list: item => app.mode.lngPlanInfo,
  filler_lng_plan_info_column: item => columns.lngPlanInfo,
  // LNG计划管理--取消
  filler_lng_plan_cancel_mode_list: item => app.mode.lngPlanCancelInfo,
  filler_lng_plan_cancel_column: item => columns.lngPlanCancelInfo,
  // LNG计划管理--出港录入
  filler_lng_plan_leave_mode_list: item => app.mode.lngPlanLeaveInfo,
  filler_lng_plan_leave_column: item => columns.lngPlanLeaveInfo,
  // LNG计划管理--核对磅单计划
  filler_lng_plan_check_mode_list: item => app.mode.lngPlanCheckInfo,
  filler_lng_plan_check_column: item => columns.lngPlanCheckInfo,
  // LNG计划管理--异常处理
  filler_lng_plan_anomalous_mode_list: item => app.mode.lngPlanAnomalousInfo,
  filler_lng_plan_anomalous_column: item => columns.lngPlanAnomalousInfo,
  // 计划库存管理 - 加气站库存管理 - 配置计划提报限制
  pslConfig_column: item => columns.pslConfig,
  // 计划库存管理 - 提报限制
  gasStationSubmitLimit_column: item => columns.gasStationSubmitLimit,
  gasStationSubmitLimit_select_list: item => select.gasStationSubmitLimit,
  // 计划库存管理 - 限制记录
  limitList_column: item => columns.limitList,
  limitList_select_list: item => select.limitList,
  // 计划库存管理 - 加气站库存管理-库存详情
  stockDetail_column: item => columns.stockDetail,
  // 计划库存管理 - lng计划管理-库存详情
  lngStockDetail_column: item => columns.lngStockDetail,
  lngStockDetail_select_list: item => select.lngStockDetail,
  // 配置计划提报限制 - 变更记录
  psl_log_column: item => columns.plsLog,
  psl_log_page_status: item => app.list.plsLog,
  // 加气限制配置列表
  gas_limit_congfig_column: item => columns.gasLimitConfig,
  gas_limit_config_page_status: item => app.list.gasLimitConfig,
  gas_limit_config_select_list: item => select.gasLimitConfig,
  gas_limit_config_mode_list: item => item.app.modeDefault,
  // 加气限制配置明细
  gas_limit_congfig_detail_column: item => columns.gasLimitConfigDetail,
  // 配置加气限制
  limit_congfig_form_page_column: item => columns.limitCongfigForm,
  limit_config_form_select_list: item => select.limitCongfigForm,
  // 加气限制司机明细
  limit_driver_detail_page_column: item => columns.gasLimitDriverDetail,
  limit_driver_detail_select_list: item => select.modeDefault,
  limit_driver_detail_page_status: item => app.list.gasLimitDriverDetail,
  limit_driver_detail_mode_list: item => item.app.modeDefault
}

export default {
  namespaced: true,
  state,
  getters
}
