import R from '@/utils/request'

export async function $truckNumber (data) {
  return await R({ url: 'carrier/truck/get_car_number', data })
}

export async function $driverQRCode (data) {
  return await R({ url: 'carrier/driver/get_qrcode/' + data.truckId })
}

export async function $truckInfo (data) {
  return await R({ url: 'carrier/truck/find', data })
}

export async function $truckList (data) {
  return await R({ url: 'carrier/truck/list', data })
}

export async function $truckBindList (data) {
  return await R({ url: 'carrier/truck/binding_manager', data })
}

export async function $carrierAllDriverList (data) {
  return await R({ url: 'carrier/driver/list_all', data })
}

export async function $truckToDriverSave (data) {
  return await R({ url: 'carrier/truck_driver/add', data })
}

export async function $truckToDriverSaveBatch (data) {
  return await R({ url: 'carrier/truck_driver/add_batch', data })
}

export async function $removeTruckToDriver (data) {
  return await R({ url: 'carrier/truck_driver/del', data })
}
