import R from '@/utils/request'

export async function $resetPassword (data) {
  return await R({ url: 'user/user/reset_password', data })
}

export async function $editPassword (data) {
  return await R({ url: 'user/user/edit_password', data })
}

export async function $userFind (data) {
  return await R({ url: '/user/user/find', data })
}

export async function $userOrgAdd (data) {
  return await R({ url: 'user/org/add', data })
}

export async function $userOrgEdit (data) {
  return await R({ url: 'user/org/edit', data })
}

export async function $userEdit (data) {
  return await R({ url: '/user/user/edit', data })
}

export async function $userUserList (data) {
  return await R({ url: 'user/user/list', data })
}
export async function $userOrgFind (data) {
  return await R({ url: 'user/org/find', data })
}

export async function $importDownloadFile (data) {
  return await R({ url: 'user/import/download_user_tpl', method: 'get', params: data, responseType: 'blob' })
}

export async function $exportDataFile (data) {
  return await R({ url: 'user/import/import_user', method: 'POST', data: data.file })
}
