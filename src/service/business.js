import R from '@/utils/request'

export async function $noPayOrder (data) {
  return await R({ url: 'business/gas_order/find_nopayfordriver', data })
}
