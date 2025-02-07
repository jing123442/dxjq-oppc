import R from '@/utils/request'

export async function $verifySendMessage (data) {
  return await R({ url: 'message/verify_code/send', data })
}

// 短信验证
export async function $checkVerifyCode (data) {
  return await R({ url: 'message/verify/code', data })
}

// 增加分类信息
export async function $addQACatalogs (data) {
  return await R({ url: 'message/qa_catalogs/add', data })
}
// 修改分类信息
export async function $editQACatalogs (data) {
  return await R({ url: 'message/qa_catalogs/update', data })
}

// 获取无分页的分类
export async function $childQACatalogsList (data) {
  return await R({ url: 'message/qa_catalogs/list', data })
}

// 增加QA信息
export async function $qaContentAddInfo (data) {
  return await R({ url: 'message/qa_content/add', data })
}

// 修改客户端信息
export async function $qaClientUpdate (data) {
  return await R({ url: 'message/qa_content_client/update', data })
}

// 修改客户端list
export async function $qaClientList (data) {
  return await R({ url: 'message/qa_client/list', data })
}

// 修改客户端信息
export async function $contentToclientList (data) {
  return await R({ url: 'message/qa_content/find_client_ids', data })
}

// 删除客户
export async function $qaCatalogsDelete (data) {
  return await R({ url: 'message/qa_catalogs/delete', data })
}

// 打印机状态更新
export async function $printerStatus (data) {
  return await R({ url: 'message/printer/status', data })
}

// 删除打印机
export async function $printerDel (data) {
  return await R({ url: 'message/printer/del', data })
}

export async function $messageDel (data) {
  return await R({ url: 'message/mc_message/del_batch', data })
}
