import R from '@/utils/request'

export async function $truckNumber (data) {
  return await R({ url: 'carrier/truck/get_car_number', data })
}

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
