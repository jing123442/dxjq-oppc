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
