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
  return await R({ url: 'pay/allinpay/withdrawApply', data })
}
