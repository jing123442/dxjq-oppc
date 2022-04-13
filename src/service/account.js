import R from '@/utils/request'

// 修改积分账户状态
export async function $userAccountUpdate (data) {
  return await R({ url: 'account/user_account/update', data })
}
// 积分调整
export async function $userAccountChangeScore (data) {
  return await R({ url: 'account/user_account/change_score', data })
}
// 下载流水列表,财务导出专用
export async function $orgAccountLogDownload (data) {
  return await R({ url: 'account/org_account_log/download', data })
}
