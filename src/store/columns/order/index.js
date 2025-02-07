import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 加气订单
  order_list_mode_list: item => app.mode.order,
  order_list_page_status: item => app.list.order,
  order_list_column: item => columns.order,
  order_station_list_column: item => columns.orderList,
  order_recharge_list_column: item => columns.recharge,
  order_list_select_list: item => select.order,
  order_station_list_select_list: item => select.orderList,
  order_recharge_list_select_list: item => select.recharge,

  // 采购订单
  order_buy_list_mode_list: item => app.mode.order,
  order_buy_list_page_status: item => app.list.order,
  order_buy_list_column: item => columns.buyOrder,
  order_buy_list_select_list: item => select.order,

  // 中石化加气订单
  order_sinopec_mode_list: item => app.mode.sinopecOrder,
  order_sinopec_page_status: item => app.list.sinopec,
  order_sinopec_column: item => columns.sinopecOrder,
  order_sinopec_select_list: item => select.sinopecOrder,

  // 自营站加气机订单
  order_self_mode_list: item => item.app.modeDefault,
  order_self_page_status: item => app.list.self,
  order_self_column: item => columns.selfOrder,
  order_self_select_list: item => select.selfOrder,

  // 加气站结算订单
  order_filler_mode_list: item => item.app.modeDefault,
  order_filler_page_status: item => app.list.filler,
  order_filler_column: item => columns.fillerOrder,
  order_filler_select_list: item => select.filler,

  // 加气站结算明细
  order_filler_detail_column: item => columns.fillerDetail,
  // 日结算订单
  order_day_column: item => columns.orderDay,
  // 加气站提现明细
  order_filler_withdraw_column: item => columns.fillerWithdraw,
  // 加气站入库明细
  order_filler_stockDetail_column: item => columns.stockDetail,
  // 物流公司结算订单
  order_carrier_mode_list: item => item.app.modeDefault,
  order_carrier_page_status: item => app.list.carrier,
  order_carrier_column: item => columns.carrierOrder,
  order_carrier_select_list: item => select.order,

  // 物流公司-加气站结算
  order_carrier_filler_column: item => columns.carrierToFiller,
  // 物流公司-加气站结算明细
  order_carrier_filler_detail_column: item => columns.carrierToFillerDetail,
  // 物流公司充值对账
  order_carrier_recharge_column: item => columns.carrierRecharge,
  // 物流公司开车汇总
  order_carrier_truck_column: item => columns.carrierToTruck,
  // 物流公司卡车加气对账单
  order_carrier_truck_order_column: item => columns.carrierToTruckOrder,

  // 象群科技结算订单
  order_bussiness_mode_list: item => item.app.modeDefault,
  order_bussiness_page_status: item => app.list.bussiness,
  order_bussiness_column: item => columns.bussinessOrder,
  order_bussiness_select_list: item => select.bussiness,

  // 下载中心
  order_download_mode_list: item => item.app.modeDefault,
  order_download_page_status: item => app.list.download,
  order_download_column: item => columns.downloadOrder,
  order_download_select_list: item => select.download
}

export default {
  namespaced: true,
  state,
  getters
}
