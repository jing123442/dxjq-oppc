import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 物流公司价格配置
  policy_firmPrice_mode_list: item => item.app.modeDefault,
  policy_firmPrice_page_status: item => app.list.firmPrice,
  policy_firmPrice_column: item => columns.firmPrice,
  policy_firmPrice_select_list: item => item.app.selectDefault,
  // 物流公司价格配置--配置价格
  policy_logisticsPriceConfig_column: item => columns.logisticsPriceConfig,
  // 物流公司价格配置--配置价格编辑
  policy_logisticsPriceConfigEdit_column: item => columns.logisticsPriceConfigEdit,
  // 按加气站配置价格
  policy_gasPrice_mode_list: item => item.app.modeDefault,
  policy_gasPrice_page_status: item => app.list.gasPrice,
  policy_gasPrice_column: item => columns.gasPrice,
  policy_gasPrice_select_list: item => item.app.selectDefault,
  // 按加气站配置价格--配置价格
  policy_gasPriceConfig_column: item => columns.gasPriceConfig,
  // 按加气站配置价格--配置价格编辑
  policy_gasPriceConfigEdit_column: item => columns.gasPriceConfigEdit,
  // 价格变更记录
  policy_record_mode_list: item => item.app.modeDefault,
  policy_record_page_status: item => app.list.record,
  policy_record_column: item => columns.record,
  policy_record_select_list: item => item.app.selectDefault,

  // 液源地配置
  policy_sourceConfig_mode_list: item => item.app.modeDefault,
  policy_sourceConfig_page_status: item => app.list.sourceConfig,
  policy_sourceConfig_column: item => columns.sourceConfig,
  policy_sourceConfig_select_list: item => item.app.selectDefault,
  // 液源地配置--配置价格
  policy_sourceConfigPrice_column: item => columns.sourceConfigPrice,
  // 液源地配置--编辑
  policy_sourceConfigEdit_column: item => columns.sourceConfigEdit,
  // 液源地配置--变更记录
  policy_sourceConfigRecord_column: item => columns.sourceConfigRecord,
  // 加气站库存查询
  policy_gasStockList_mode_list: item => item.app.modeDefault,
  policy_gasStockList_page_status: item => app.list.gasStockList,
  policy_gasStockList_column: item => columns.gasStockList,
  policy_gasStockList_select_list: item => item.app.selectDefault,
  // 加气站库存查询--入库记录
  policy_gasStockListRecord_column: item => columns.gasStockListRecord,
  // LNG计划管理
  policy_lngPlan_mode_list: item => item.app.modeDefault,
  policy_lngPlan_page_status: item => app.list.lngPlan,
  policy_lngPlan_column: item => columns.lngPlan,
  policy_lngPlan_select_list: item => select.lngPlan,
  // LNG计划管理--详情
  policy_lngPlanDetail_column: item => columns.lngPlanDetail,
  // LNG计划管理--出港录入
  policy_lngPlanDepartures_column: item => columns.lngPlanDepartures,
  policy_lngPlanDepartures_select_list: item => select.lngPlanDepartures,

  // 营销合作经理配置---物流公司
  policy_carrierManConfig_mode_list: item => item.app.modeDefault,
  policy_carrierManConfig_page_status: item => app.list.marketingManager,
  policy_carrierManConfig_column: item => columns.carrierManConfig,
  policy_carrierManConfig_select_list: item => select.carrierManConfig,

  // 营销合作经理配置---加气站
  policy_gasstationConfig_mode_list: item => item.app.modeDefault,
  policy_gasstationConfig_page_status: item => app.list.marketingManager,
  policy_gasstationConfig_column: item => columns.gasstationConfig,
  policy_gasstationConfig_select_list: item => item.app.selectDefault
}

export default {
  namespaced: true,
  state,
  getters
}
