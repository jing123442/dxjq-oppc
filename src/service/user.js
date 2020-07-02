import R from '@/utils/request'

export async function $userInfo (data) {
  return await R({ url: 'user/user/find', data })
}

export async function $updateMobile (data) {
  return await R({ url: 'user/user/edit_mobile', data })
}

export async function $updateUserInfo (data) {
  return await R({ url: 'user/user/edit', data })
}

export async function $updatePassword (data) {
  return await R({ url: 'user/user/edit_password', data })
}
