import R from '@/utils/request'

export async function $wxSdkSign (data) {
  return await R({ url: 'pay/wx/js_sign', data })
}

export async function $wxpayOrder (data) {
  return await R({ url: 'pay/wxpay/order', data })
}
