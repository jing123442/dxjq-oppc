import R from '@/utils/request'

export async function $orgAuth (data) {
  return await R({ url: 'pay/allinpay/verifyAccount', data })
}

export async function $signContract (data) {
  return await R({ url: 'pay/allinpay/signContract', data })
}

export async function $signBalanceProtocol (data) {
  return await R({ url: 'pay/allinpay/signBalanceProtocol', data })
}

export async function $sendVerificationCode (data) {
  return await R({ url: 'pay/allinpay/sendVerificationCode', data })
}

export async function $unbindPhone (data) {
  return await R({ url: 'pay/allinpay/unbindPhone', data })
}

export async function $bindPhone (data) {
  return await R({ url: 'pay/allinpay/bindPhone', data })
}

export async function $orgWithdraw (data) {
  return await R({ url: 'pay/allinpay/withdraw_apply', data })
}

export async function $uploadOrgPic (data) {
  return await R({ url: 'pay/allinpay/upload_org_pic', data })
}
// 设置限定余额
export async function $updateWithdrawConfig (data) {
  return await R({ url: 'pay/withdraw_quota_config/update', data })
}
// 设置限定余额
export async function $getWithdrawInfo (data) {
  return await R({ url: 'pay/withdraw_quota_config/find_by_orgType', data })
}

export async function $audit (data) {
  return await R({ url: 'pay/recharge_order/audit', data })
}

export async function $rechargeAdd (data) {
  return await R({ url: 'pay/recharge_order/add', data })
}
export async function $orderShow (data) {
  return await R({ url: 'pay/transfer_order/show', data })
}

export async function $transferOrderAdd (data) {
  return await R({ url: 'pay/transfer_order/add', data })
}

export async function $truckCollect (data) {
  return await R({ url: 'pay/transfer_order/collect', data })
}

export async function $withdrawTotalAmount (data) {
  return await R({ url: 'pay/withdraw_order/find_total_amount', data })
}
