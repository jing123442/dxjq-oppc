import R from '@/utils/request'

export async function $accountInfo (data) {
  return await R({ url: 'account/org_account/find_by_param', data })
}

export async function $truckSumBalance (data) {
  return await R({ url: 'account/truck_account/sum_balance', data })
}

export async function $truckAccountList (data) {
  return await R({ url: 'account/truck_account/list', data })
}
