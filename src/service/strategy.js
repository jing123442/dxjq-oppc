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

export async function $priceAdd (data) {
  return await R({ url: 'strategy/lng_from/add', data })
}

export async function $lngFormList (data) {
  return await R({ url: 'strategy/lng_from/all' })
}

export async function $configPriceList (data) {
  return await R({ url: 'strategy/carriage_price/carriagePrice/' + data, method: 'get' })
}

export async function $saveConfigPriceList (data) {
  return await R({ url: 'strategy/carriage_price/save_or_update_list', data })
}

export async function $configAreaBenefit (data) {
  return await R({ url: 'strategy/area_benefit/set_area_benefit_list', data })
}

export async function $configAreaEditBenefit (data) {
  return await R({ url: 'strategy/area_benefit/update', data })
}
