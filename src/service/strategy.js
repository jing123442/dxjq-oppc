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

export async function $priceRelease (data) {
  return await R({ url: 'strategy/release_manage/add', data })
}

export async function $priceReleaseAudit (data) {
  return await R({ url: 'strategy/release_manage/release_audit', data })
}

export async function $configAreaEditBenefit (data) {
  return await R({ url: 'strategy/area_benefit/update', data })
}

export async function $configGasFreight (data) {
  return await R({ url: 'strategy/freight_config/set_freight', data })
}

export async function $purchaseLeave(data) {
  return await R({ url: 'strategy/purchase/leave', data })
}

export async function $purchaseComplete(data) {
  return await R({ url: 'strategy/purchase/complete', data })
}

export async function $configRebateList(data) {
  return await R({ url: 'strategy/rebate_config/list', data })
}

export async function $saveConfigRebateList(data) {
  return await R({ url: 'strategy/rebate_config/save_or_update_list', data })
}

export async function $configGasProfit(data) {
  return await R({ url: 'strategy/gasstation/edit', data })
}

export async function $listingPriceAlg(data) {
  return await R({ url: 'strategy/price_config/add', data })
}
