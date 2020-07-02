import R from '@/utils/request'

export async function $accountInfo (data) {
  return await R({ url: 'account/org_account/find_by_param', data })
}
