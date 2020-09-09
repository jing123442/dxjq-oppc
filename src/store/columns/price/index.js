import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 平台挂牌价
  price_listing_mode_list: item => item.app.modeDefault,
  price_listing_page_status: item => app.list.listing,
  price_listing_column: item => columns.listing,
  price_listing_select_list: item => item.app.selectDefault,

  // 出港价
  price_departure_mode_list: item => item.app.modeDefault,
  price_departure_page_status: item => app.list.departure,
  price_departure_column: item => columns.departure,
  price_departure_select_list: item => item.app.selectDefault,

  // 区域优惠政策
  price_preferential_mode_list: item => item.app.modeDefault,
  price_preferential_page_status: item => app.list.preferential,
  price_preferential_column: item => columns.preferential,
  price_preferential_select_list: item => select.preferential,

  // 区域优惠政策--修改
  price_preferential_edit_column: item => columns.preferentialEdit,
  price_preferential_del_column: item => columns.preferentialDel,

  // 运费测算
  price_estimate_mode_list: item => item.app.modeDefault,
  price_estimate_page_status: item => app.list.estimate,
  price_estimate_column: item => columns.estimate,
  price_estimate_select_list: item => item.app.selectDefault,

  // 运费测算--变更记录
  price_estimate_log_column: item => columns.estimateLog,

  // 运费价格
  price_freight_mode_list: item => item.app.modeDefault,
  price_freight_page_status: item => app.list.freight,
  price_freight_column: item => columns.freight,
  price_freight_select_list: item => item.app.selectDefault,

  // 运费价格--变更记录
  price_freight_log_page_status: item => app.list.freightLog,
  price_freight_log_column: item => columns.freightLog,

  // 加气站里程
  price_mileage_mode_list: item => item.app.modeDefault,
  price_mileage_page_status: item => app.list.mileage,
  price_mileage_column: item => columns.mileage,
  price_mileage_select_list: item => item.app.selectDefault,

  // 加气站里程--变更记录
  price_mileage_log_column: item => columns.mileageLog,

  // 发布管理
  price_release_mode_list: item => item.app.modeDefault,
  price_release_page_status: item => item.app.listDefault,
  price_release_column: item => columns.release,
  price_release_select_list: item => item.app.selectDefault
}

export default {
  namespaced: true,
  state,
  getters
}
