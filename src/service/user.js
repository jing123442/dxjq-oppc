import R from '@/utils/request'

export async function $resetPassword (data) {
  return await R({ url: 'user/user/reset_password', data })
}

export async function $userOrgList (data) {
  return await R({ url: 'user/org/list', data })
}

export async function $editPassword (data) {
  return await R({ url: 'user/user/edit_password', data })
}

export async function $userFind (data) {
  return await R({ url: '/user/user/find', data })
}

export async function $userEdit (data) {
  return await R({ url: '/user/user/edit', data })
}
