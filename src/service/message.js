import R from '@/utils/request'

export async function $verifyCode (data) {
  return await R({ url: 'message/verify_code/send', data })
}
