import R from '@/utils/request'
import store from '@/store'
// 下载模板
export async function $importDownloadFile(data) {
  return await R({ url: 'settle/gway_gasorder/download_gasorder_tpl', method: 'get', params: data, responseType: 'blob' })
}

// 导入
export async function $exportDataFile(data) {
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  return await R({ url: `settle/gway_gasorder/import_gasorder?orgId=${store.getters.woporg}`, method: 'POST', data: data.file, headers: { ...data.headers, ...headers } })
}
