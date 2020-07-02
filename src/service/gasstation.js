import R from '@/utils/request'

export async function $gasAddressList (data) {
  return await R({ url: 'gasstation/gasstation/city_list', data })
}
