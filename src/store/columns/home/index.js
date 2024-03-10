import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })
const getters = {
  home_detail_modeList: item => item.app.modeDefault,
  home_detail_column: item => columns.detail,
  home_detail_select_list: item => select.detail,
  home_detail_page_status: item => app.list.detail,

  home_fund_modeList: item => item.app.modeDefault,
  home_fund_column: item => columns.fund,
  home_fund_select_list: item => select.fund,
  home_fund_page_status: item => app.list.fund,

  home_control_modeList: item => item.app.modeDefault,
  home_control_column: item => columns.control,
  home_control_select_list: item => select.control,
  home_control_page_status: item => app.list.control,

  home_profit_modeList: item => item.app.modeDefault,
  home_profit_column: item => columns.profit,
  home_profit_select_list: item => select.profit,
  home_profit_page_status: item => app.list.profit,
}

export default {
  namespaced: true,
  state,
  getters
}
