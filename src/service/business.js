import R from '@/utils/request'

export async function $noPayOrder (data) {
  return await R({ url: 'business/gas_order/find_nopayfordriver', data })
}

// 充值审核
export async function $audit (data) {
  return await R({ url: 'business/recharge_order/audit', data })
}
// 充值
export async function $rechargeAdd (data) {
  return await R({ url: 'business/recharge_order/add', data })
}
