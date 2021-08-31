import R from '@/utils/request'

// 企业认证
export async function $orgAuth (data) {
  return await R({ url: 'pay/member/open_account', data })
}

export async function $signContract (data) {
  return await R({ url: 'pay/member/sign_withdraw_protocol', data })
}

export async function $signBalanceProtocol (data) {
  return await R({ url: 'pay/member/sign_balance_protocol', data })
}

export async function $sendVerificationCode (data) {
  return await R({ url: 'pay/member/send_sms_code', data })
}

export async function $unbindPhone (data) {
  return await R({ url: 'pay/member/unbind_phone', data })
}

export async function $bindPhone (data) {
  return await R({ url: 'pay/member/bind_phone', data })
}

export async function $orgWithdraw (data) {
  return await R({ url: 'pay/pay/withdraw_apply', data })
}

export async function $uploadOrgPic (data) {
  return await R({ url: 'pay/member/upload_org_pic', data })
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

// B2B充值
export async function $depositApply (data) {
  return await R({ url: 'pay/pay/deposit_apply', data })
}
// B2B充值跳转url
export async function $depositApplyConfirm (data) {
  return await R({ url: 'pay/pay/deposit_apply_confirm', data })
}
