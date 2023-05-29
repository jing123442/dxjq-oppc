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
  return await R({ url: 'account/org_account_log/download', method: 'POST', data, responseType: 'blob' })
}
// 物流余额监控列表
export async function $carrierBalancePage (data) {
  return await R({ url: 'account/carrier_balance/page', method: 'POST', data })
}
// 查询直销车辆账户列表列表
export async function $carrierBalancePageTruckAccounts (data) {
  return await R({ url: 'account/carrier_balance/page_truck_accounts', method: 'POST', data })
}
// 物流余额监控金额汇总
export async function $carrierBalanceSum (data) {
  return await R({ url: 'account/carrier_balance/sum', method: 'POST', data })
}
// 提醒记录
export async function $carrierBalanceLog (data) {
  return await R({ url: 'account/carrier_balance/log', method: 'POST', data })
}
// 提醒配置更新
export async function $carrierBalanceUpdate (data) {
  return await R({ url: 'account/carrier_balance/config_update', method: 'POST', data })
}
// 提醒配置查询
export async function $carrierBalanceConfig (data) {
  return await R({ url: 'account/carrier_balance/config', method: 'POST', data })
}
// 查询直销车辆账户汇总
export async function $carrierBalanceSumTruckAccounts (data) {
  return await R({ url: 'account/carrier_balance/sum_truck_accounts', method: 'POST', data })
}
