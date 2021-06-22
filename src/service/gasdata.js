import R from '@/utils/request'

// 加气站列表
export async function $gasdataGasstationList (data) {
  return await R({ url: 'gasdata/gasstation/list', data })
}

