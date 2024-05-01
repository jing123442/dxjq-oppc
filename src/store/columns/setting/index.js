import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 区域配置
  setting_district_mode_list: item => item.app.modeDefault,
  setting_district_page_status: item => app.list.district,
  setting_district_column: item => columns.district,
  setting_district_select_list: item => select.district,

  // 区域变更记录
  setting_district_log_page_status: item => app.list.districtLog,
  setting_district_log_column: item => columns.districtLog,
  setting_district_children_column: item => [...columns.district, ...columns.districtParent],

  // 账户余额配置
  setting_withdraw_mode_list: item => item.app.modeDefault,
  setting_withdraw_page_status: item => app.list.withdraw,
  setting_withdraw_column: item => columns.withdraw,
  setting_withdraw_select_list: item => item.app.selectDefault,
  // 变更记录
  setting_withdraw_log_column: item => columns.withdrawLog,
  // 返现规则
  setting_cashback_mode_list: item => item.app.modeDefault,
  setting_cashback_page_status: item => app.list.cashback,
  setting_cashback_column: item => columns.cashback,
  setting_cashback_select_list: item => item.app.selectDefault,
  // 日志
  setting_cashback_log_page_status: item => app.list.cashbackLog,
  setting_cashback_log_column: item => columns.cashbackLog,
  // 加气站提现限制
  withdraw_limit_config_page_status: item => app.list.withdrawListConfig,
  withdraw_limit_config_column: item => columns.withdrawLimitConfig,
  withdraw_limit_config_select_list: item => select.withdrawLimitConfig,
  withdraw_limit_config_mode_list: item => item.app.modeDefault,
  // 提现审核
  withdraw_check_page_status: item => app.list.withdrawCheck,
  withdraw_check_column: item => columns.withdrawCheck,
  withdraw_check_select_list: item => select.withdrawCheck,
  withdraw_check_mode_list: item => item.app.modeDefault,
  // 审核记录列表
  check_log_list_page_status: item => app.list.checkLogList,
  check_log_list_column: item => columns.checkLogList,
  check_log_list_select_list: item => select.checkLogList,
  check_log_list_mode_list: item => item.app.modeDefault,
  // 审核历史记录
  check_history_page_status: item => app.list.checkHistoryList,
  check_history_column: item => columns.checkHistoryList,
  check_history_select_list: item => select.checkHistoryList,
  check_history_mode_list: item => item.app.modeDefault,
}

export default {
  namespaced: true,
  state,
  getters
}
