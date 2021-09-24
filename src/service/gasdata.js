import R from '@/utils/request'

// 加气站列表
export async function $gasdataGasstationList (data) {
  return await R({ url: 'gasdata/gasstation/list', data })
}
// 智能分析,LNG价格对比和站点分布
export async function $gasdataGasstationAnalyses (data) {
  return await R({ url: 'gasdata/gasstation/analyse1', data })
}
// 智能分析,LNG市场份额
export async function $gasdataGasstationBazaarAnalyses (data) {
  return await R({ url: 'gasdata/gasstation/analyse2', data })
}
// 增加非大象加气站
export async function $gasdataGasstationBattleAdd (data) {
  return await R({ url: 'gasdata/gasstation/add', data })
}
// 编辑非大象加气站
export async function $gasdataGasstationBattleUpdate (data) {
  return await R({ url: 'gasdata/gasstation/update', data })
}
// 删除非大象加气站
export async function $gasdataGasstationBattleDelete (data) {
  return await R({ url: 'gasdata/gasstation/remove', data })
}
// 情报编辑
export async function $gasdataGasstationBattleInfoUpdate (data) {
  return await R({ url: 'gasdata/gasstation/update/info', data })
}
// 导出LNG气瓶数据
export async function $gasdataLngContainerExport (data) {
  return await R({ url: 'gasdata/lng_container/export', method: 'POST', params: data, responseType: 'blob' })
}

// 导出智能液位计数据
export async function $gasdataGaugeExport (data) {
  return await R({ url: 'gasdata/gauge/export', method: 'POST', params: data, responseType: 'blob' })
}
