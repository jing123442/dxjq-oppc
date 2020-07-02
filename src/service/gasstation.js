import R from '@/utils/request'

export async function $gasAddressList (data) {
  return await R({ url: 'gasstation/gasstation/city_list', data })
}

export async function $gasstationList (data) {
  return await R({ url: 'gasstation/gasstation/list', data })
}

export async function $orgToGasstationList (data) {
  return await R({ url: 'gasstation/gasstation/list_for_org', data })
}

export async function $gasstationQRCode (data) {
  return await R({ url: 'gasstation/gasstation/get_qrcode/' + data })
}

export async function $cashierQRCode (data) {
  return await R({ url: 'gasstation/gasstation/get_cashier_qrcode', data })
}

export async function $gasstationServiceInfo (data) {
  return await R({ url: 'gasstation/service_fee_log/list', data })
}

export async function $gasstationSetService (data) {
  return await R({ url: 'gasstation/gasstation/set_gasstation_fee', data })
}

export async function $gasstationPrice (data) {
  return await R({ url: 'gasstation/gasstation/find', data })
}

export async function $gasstationSetPrice (data) {
  return await R({ url: 'gasstation/gasstation/set_list_price', data })
}

export async function $cashierToGasstation (data) {
  return await R({ url: 'gasstation/gasstation_cashier/list', data })
}
