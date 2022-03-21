import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 平台挂牌价
  price_listing_mode_list: item => item.app.modeDefault,
  price_listing_page_status: item => app.list.listing,
  price_listing_column: item => columns.listing,
  price_listing_select_list: item => select.listing,
  // 平台挂牌价-查询
  price_listing_query_column: item => columns.listingQuery,
  // 直销加气站
  price_direct_select_list: item => select.direct,
  price_direct_log_select_list: item => columns.directLog,
  price_direct_query_column: item => columns.direct,

  price_direct_order_mode_list: item => item.app.modeDefault,
  price_direct_order_page_status: item => app.list.directOrder,
  price_direct_order_query_column: item => columns.directOrder,
  price_direct_order_select_list: item => select.directOrder,

  // 平台挂牌价--变更记录
  price_listing_log_column: item => columns.listingLog,

  // 平台挂牌价--配置液源地
  price_listing_from_column: item => columns.listingFrom,
  // 平台挂牌价--气价调节
  price_listing_measure_column: item => columns.listingMeasure,

  // 平台挂牌价--变更记录
  price_listing_release_column: item => columns.listingRelease,

  // 出港价
  price_departure_mode_list: item => item.app.modeDefault,
  price_departure_page_status: item => app.list.departure,
  price_departure_column: item => columns.departure,
  price_departure_select_list: item => item.app.selectDefault,

  // 气价调节
  price_measure_column: item => columns.measure,

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
  price_release_page_status: item => app.list.release,
  price_release_column: item => columns.release,
  price_release_select_list: item => select.release,

  // 发布管理
  price_release_log_column: item => columns.releaseLog,

  // 物流公司专享优惠列表
  discount_carrier_column: item => columns.discountCarrier,
  discount_carrier_mode_list: item => item.app.modeDefault,
  discount_carrier_page_status: item => app.list.discountCarrier,
  discount_carrier_select_list: item => select.discountCarrier,

  // 物流公司优惠配置
  rebate_config_column: item => columns.rebateConfig,
  rebate_config_mode_list: item => item.app.modeDefault,
  rebate_config_page_status: item => app.list.rebateConfig,
  rebate_config_select_list: item => select.rebateConfig,

  // 添加优惠加气站
  rebate_filler_add_column: item => columns.rebateFillerAdd,
  rebate_filler_add_select_list: item => select.rebateFillerAdd,

  // 优惠编辑
  rebate_edit_column: item => columns.rebateEdit,
  rebate_edit_select_list: item => select.rebateEdit,

  // 优惠配置记录
  rebate_config_records_mode_list: item => item.app.modeDefault,
  rebate_config_records_page_status: item => app.list.rebateConfigRecords,
  rebate_config_records_column: item => columns.rebateConfigRecords,
  rebate_config_records_select_list: item => select.rebateConfigRecords,

  // 优惠订单详情
  rebate_order_mode_list: item => item.app.modeDefault,
  rebate_order_page_status: item => app.list.rebateOrder,
  rebate_order_column: item => columns.rebateOrder,
  rebate_order_select_list: item => select.rebateOrder
}

export default {
  namespaced: true,
  state,
  getters
}
