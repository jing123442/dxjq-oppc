import R from '@/utils/request'

export async function $userInfo (data) {
  return await R({ url: 'user/user/find', data })
}

export async function $orderConfirm (data) {
  return await R({ url: 'strategy/purchase/confirm', data })
}

export async function $orderCancel (data) {
  return await R({ url: 'strategy/purchase/cancel', data })
}
