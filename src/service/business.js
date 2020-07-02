import R from '@/utils/request'

export async function $noPayOrder (data) {
  return await R({ url: 'business/gas_order/find_nopayfordriver', data })
}

export async function $orderPayHistory (data) {
  return await R({ url: 'business/gas_order/list_withtime', data })
}

export async function $orderDatail (data) {
  return await R({ url: 'business/gas_order/find', data })
}

export async function $payGasOrder (data) {
  return await R({ url: 'business/gas_order/pay', data })
}

export async function $cancelGasOrder (data) {
  return await R({ url: 'business/gas_order/cancel_forcashier', data })
}

export async function $createGasOrder (data) {
  return await R({ url: 'business/gas_order/add', data })
}

export async function $currGasstationInfo (data) {
  return await R({ url: 'gasstation/gasstation/find', data })
}

export async function $gasstationOrderList (data) {
  return await R({ url: 'business/gas_order/list_forgasstation', data })
}

export async function $gasstationPerpayOrderList (data) {
  return await R({ url: 'business/gas_order/list', data })
}

export async function $truckRechargeList (data) {
  return await R({ url: 'business/recharge_order/list_withtime', data })
}

export async function $truckTransferBalance (data) {
  return await R({ url: 'business/transfer_order/show', data })
}

export async function $truckTransferSave (data) {
  return await R({ url: 'business/transfer_order/add', data })
}

export async function $truckTransferList (data) {
  return await R({ url: 'business/transfer_order/list', data })
}
