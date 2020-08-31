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

export async function $priceUpdate (data) {
  return await R({ url: 'strategy/lng_from/update', data })
}

export async function $carrierPriceEdit (data) {
  return await R({ url: 'strategy/carrier_gasstation_price/edit_price', data })
}
