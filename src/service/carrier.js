import R from '@/utils/request'

export async function $carrierTruckAdd (data) {
  return await R({ url: 'carrier/truck/add', data })
}

export async function $carrierTruckInfo (data) {
  return await R({ url: 'carrier/truck/find', data })
}

export async function $carrierDriverList (data) {
  return await R({ url: 'carrier/driver/list_all', data })
}

export async function $carrierTruckDriverAdd (data) {
  return await R({ url: 'carrier/truck_driver/add', data })
}

export async function $carrierTruckDriverDel (data) {
  return await R({ url: 'carrier/truck_driver/del', data })
}

export async function $importDownloadFile (data) {
  return await R({ url: 'carrier/import/download_truck_tpl', method: 'get', params: data, responseType: 'blob' })
}

export async function $exportDataFile (data) {
  return await R({ url: 'carrier/import/import_truck', method: 'POST', data: data.file })
}
