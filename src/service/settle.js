import R from '@/utils/request'

export async function $truckSettleOrder (data) {
  return await R({ url: 'settle/gas_order/sum_truck', data })
}

export async function $truckAccountStatement (data) {
  return await R({ url: 'settle/gas_order/list_withtime', data })
}
