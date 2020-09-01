import R from '@/utils/request'

export async function $truckSettleOrder (data) {
  return await R({ url: 'settle/gas_order/sum_truck', data })
}

export async function $excelDownload (data) {
  return await R({ url: 'settle/excel/download', data, responseType: 'blob' })
}
