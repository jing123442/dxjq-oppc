import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 优惠返利配置
  market_rebate_mode_list: item => item.app.modeDefault,
  market_rebate_page_status: item => app.list.rebate,
  market_rebate_column: item => columns.rebate,
  market_rebate_select_list: item => item.app.selectDefault,

  // 优惠返利配置 -- 变更记录
  market_rebate_log_page_status: item => app.list.rebateLog,
  market_rebate_log_column: item => columns.rebateLog,

  // 长城奥扬费用
  market_cost_mode_list: item => item.app.modeDefault,
  market_cost_page_status: item => app.list.cost,
  market_cost_column: item => columns.cost,
  market_cost_select_list: item => item.app.selectDefault,

  // 长城奥扬费用
  market_profit_mode_list: item => item.app.modeDefault,
  market_profit_page_status: item => app.list.profit,
  market_profit_column: item => columns.profit,
  market_profit_select_list: item => item.app.selectDefault,

  // 加气站利润---变更记录
  market_profit_log_column: item => columns.profitLog
}

export default {
  namespaced: true,
  state,
  getters
}
