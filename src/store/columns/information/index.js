import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 行业分析
  information_analysis_mode_list: item => item.app.modeDefault,
  information_analysis_page_status: item => app.list.analysis,
  information_analysis_column: item => columns.analysis,
  information_analysis_select_list: item => select.analysis,

  // 行业分析
  information_information_mode_list: item => item.app.modeDefault,
  information_information_page_status: item => app.list.information,
  information_information_column: item => columns.information,
  information_information_select_list: item => item.app.selectDefault,

  // 液厂出厂价
  information_factory_mode_list: item => item.app.modeDefault,
  information_factory_page_status: item => app.list.factory,
  information_factory_column: item => columns.factory,
  information_factory_select_list: item => item.app.selectDefault,

  // 挂牌价
  information_listing_mode_list: item => item.app.modeDefault,
  information_listing_page_status: item => app.list.listing,
  information_listing_column: item => columns.listing,
  information_listing_select_list: item => item.app.selectDefault,

  // 接货价
  information_receiv_mode_list: item => item.app.modeDefault,
  information_receiv_page_status: item => app.list.receiv,
  information_receiv_column: item => columns.receiv,
  information_receiv_select_list: item => item.app.selectDefault,

  // 海气
  information_haiqi_mode_list: item => item.app.modeDefault,
  information_haiqi_page_status: item => app.list.haiqi,
  information_haiqi_column: item => columns.haiqi,
  information_haiqi_select_list: item => item.app.selectDefault,

  // 加气站
  information_gasstion_mode_list: item => item.app.modeDefault,
  information_gasstion_page_status: item => app.list.gasstion,
  information_gasstion_column: item => columns.gasstion,
  information_gasstion_select_list: item => item.app.selectDefault,

  // 柴油
  information_diesel_mode_list: item => item.app.modeDefault,
  information_diesel_page_status: item => app.list.diesel,
  information_diesel_column: item => columns.diesel,
  information_diesel_select_list: item => item.app.selectDefault,

  // 指标
  information_item_mode_list: item => item.app.modeDefault,
  information_item_page_status: item => app.list.item,
  information_item_column: item => columns.item,
  information_item_select_list: item => item.app.selectDefault,
}

export default {
  namespaced: true,
  state,
  getters
}
