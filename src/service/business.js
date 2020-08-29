import R from '@/utils/request'

export async function $noPayOrder (data) {
  return await R({ url: 'business/gas_order/find_nopayfordriver', data })
}

export async function $audit (data) {
  return await R({ url: 'business/recharge_order/audit', data })
}

export async function $rechargeAdd (data) {
  return await R({ url: 'business/recharge_order/add', data })
}
export async function $orderShow (data) {
  return await R({ url: 'business/transfer_order/show', data })
}

export async function $transferOrderAdd (data) {
  return await R({ url: 'business/transfer_order/add', data })
}
