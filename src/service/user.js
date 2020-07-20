import R from '@/utils/request'

export async function $resetPassword (data) {
  return await R({ url: 'user/user/reset_password', data })
}

export async function $userOrgList (data) {
  return await R({ url: 'user/org/list', data })
}
