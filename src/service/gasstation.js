import R from '@/utils/request'

export async function $gasAddressList (data) {
  return await R({ url: 'gasstation/gasstation/city_list', data })
}

export async function $gasStationAdd (data) {
  return await R({ url: 'gasstation/gasstation/add', data })
}

export async function $gasStationFind (data) {
  return await R({ url: 'gasstation/gasstation/find', data })
}
