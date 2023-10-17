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
  market_profit_log_column: item => columns.profitLog,

  // 液源地配置
  market_sourceConfig_mode_list: item => item.app.modeDefault,
  market_sourceConfig_page_status: item => app.list.sourceConfig,
  market_sourceConfig_column: item => columns.sourceConfig,
  market_sourceConfig_select_list: item => item.app.selectDefault,
  // 液源地配置--配置价格
  market_sourceConfigPrice_column: item => columns.sourceConfigPrice,
  // 液源地配置--编辑
  market_sourceConfigEdit_column: item => columns.sourceConfigEdit,
  // 液源地配置--变更记录
  market_sourceConfigRecord_column: item => columns.sourceConfigRecord,

  // 营销合作经理配置---物流公司
  market_carrierManConfig_mode_list: item => item.app.modeDefault,
  market_carrierManConfig_page_status: item => app.list.marketingManager,
  market_carrierManConfig_column: item => columns.carrierManConfig,
  market_carrierManConfig_select_list: item => select.carrierManConfig,

  // 营销合作经理配置---加气站
  market_gasstationConfig_mode_list: item => item.app.modeDefault,
  market_gasstationConfig_page_status: item => app.list.marketingManager,
  market_gasstationConfig_column: item => columns.gasstationConfig,
  market_gasstationConfig_select_list: item => select.gasstationConfig,

  // 营销中心-加气卡
  market_card_column: item => columns.marketCard,
  market_card_select_list: item => select.marketCenter,

}

export default {
  namespaced: true,
  state,
  getters
}
