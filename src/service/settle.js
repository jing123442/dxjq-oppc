import R from '@/utils/request'

export async function $excelDownload (data) {
  return await R({ url: 'settle/excel/download', data, responseType: 'blob' })
}

// 象群科技统计
export async function $xqkjOrderTotal (data) {
  return await R({ url: 'settle/gas_order/xqkj_total', data })
}

// 加气站订单统计
export async function $gwayOrderTotal (data) {
  return await R({ url: 'settle/gasstation_gway/total', data })
}

// 加气站订单统计
export async function $carrierOrderTotal (data) {
  return await R({ url: 'settle/carrier/total', data })
}

// 获取某个账期下物流公司与加气站结算汇总
export async function $carrierGasstationOrderTotal (data) {
  return await R({ url: 'settle/carrier_gasstation/total', data })
}

// 根据id获取某个加气站与物流公司账期内结算汇总
export async function $carrierGasstationFind (data) {
  return await R({ url: 'settle/carrier_gasstation/find', data })
}

// 获取某个加气站与长城奥扬账期内结算汇总
export async function $gasstationGwayFind (data) {
  return await R({ url: 'settle/gasstation_gway/find', data })
}

// 提现汇总
export async function $gasstationWithdrawTotal (data) {
  return await R({ url: 'settle/withdraw_order/list_total_amount', data })
}

// 下载文件申请
export async function $generateDownloadFile (data) {
  return await R({ url: 'settle/generate_file/add', data })
}

// 交易汇总列表
export async function $findTradeSumList (data) {
  return await R({ url: 'settle/statistics/find_trade_sum_list', data })
}

// 加气站供气统计
export async function $findGasstationStockSum (data) {
  return await R({ url: 'settle/statistics/find_Gasstation_stock_sum', data })
}
// 资金流动趋势
export async function $findFundSum (data) {
  return await R({ url: 'settle/statistics/find_fund_sum', data })
}
// 卡车趋势汇总
export async function $findTruckTrendList (data) {
  return await R({ url: 'settle/statistics/find_truck_trend_list', data })
}
// 加气站发展趋势
export async function $findGasstationTrendList (data) {
  return await R({ url: 'settle/statistics/find_gasstation_trend_list', data })
}
// 物流公司发展趋势
export async function $findCarrierTrendList (data) {
  return await R({ url: 'settle/statistics/find_carrier_trend_list', data })
}
// 加气站排名
export async function $findTradeRankGasstationList (data) {
  return await R({ url: 'settle/statistics/find_trade_rank_gasstation_list', data })
}
// 物流公司排名
export async function $findTradeRankCarrierList (data) {
  return await R({ url: 'settle/statistics/find_trade_rank_carrier_list', data })
}
// 获取日车辆汇总
export async function $findDayTruckSum (data) {
  return await R({ url: 'settle/statistics/find_day_truck_sum', data })
}
// 获取日库存汇总
export async function $findDayStockSum (data) {
  return await R({ url: 'settle/statistics/find_day_stock_sum', data })
}
// 日交易汇总
export async function $findDayTradeSum (data) {
  return await R({ url: 'settle/statistics/find_day_trade_sum', data })
}
// 日充值金额账户余额
export async function $findDayFundSum (data) {
  return await R({ url: 'settle/statistics/find_day_fund_sum', data })
}
// 最新五条订单
export async function $findLatestGasorders (data) {
  return await R({ url: 'settle/statistics/find_latest_gasorders', data })
// 下载文件
export async function $generateDownloadCenterFile (data) {
  return await R({ url: 'settle/generate_file/download', data, responseType: 'blob' })
}
