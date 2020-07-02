import R from '@/utils/request'

export async function $userInfo (data) {
  return await R({ url: 'user/user/find', data })
}
