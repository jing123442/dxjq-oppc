import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 账户余额配置
  setting_withdraw_mode_list: item => item.app.modeDefault,
  setting_withdraw_page_status: item => app.list.withdraw,
  setting_withdraw_column: item => columns.withdraw,
  setting_withdraw_select_list: item => item.app.selectDefault,
  // 变更记录
  setting_withdraw_log_column: item => columns.withdrawLog,
}

export default {
  namespaced: true,
  state,
  getters
}
