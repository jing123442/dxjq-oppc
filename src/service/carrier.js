import R from '@/utils/request'

export async function $truckNumber (data) {
  return await R({ url: 'carrier/truck/get_car_number', data })
}
export async function $carrierTruckAdd (data) {
  return await R({ url: 'carrier/truck/add', data })
}
