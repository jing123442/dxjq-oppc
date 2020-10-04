import R from '@/utils/request'

export async function $verifySendMessage (data) {
  return await R({ url: 'message/verify_code/send', data })
}
