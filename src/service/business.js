import R from '@/utils/request'

export async function $noPayOrder (data) {
  return await R({ url: 'business/gas_order/find_nopayfordriver', data })
}

// 充值审核
export async function $audit (data) {
  return await R({ url: 'business/recharge_order/audit', data })
}
