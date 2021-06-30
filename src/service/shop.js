import R from '@/utils/request'

// 查询积分配置信息GET
export async function $getPoints (data) {
  return await R({ url: 'shop/config/query', data })
}
// 积分规则列表
export async function $shopRuleList (data) {
  return await R({ url: 'shop/rule/list', method: 'GET', params: data })
}
// 修改积分配置信息POST
export async function $editPoints (data) {
  return await R({ url: 'shop/config/config', data })
}
// 供应商列表
export async function $supplierList (data) {
  return await R({ url: 'shop/supplier/list', data })
}
// 启用0/禁用1 供应商
export async function $supplierBan (data) {
  return await R({ url: 'shop/supplier/ban', data })
}
// 导出当天待发货订单
export async function $shopExcelExport (data) {
  return await R({ url: 'shop/excel/export', data, responseType: 'blob' })
}
// 下载excel模板接口 1 虚拟商品模板 2实物发货单 3抵扣券发货单(卡密类商品) 4充值发货单 5售后订单模板
export async function $shopExcelDownload (data) {
  return await R({ url: 'shop/excel/download', data, responseType: 'blob' })
}
// excel导入发货订单 0实物商品 1 充值类商品 2卡密类商品
export async function $shopExcelImportOrder (data) {
  return await R({ url: 'shop/excel/import/order', data, responseType: 'blob' })
}
// excel导入商品信息 0实物商品 1虚拟商品
export async function $shopExcelImportGoods (data) {
  return await R({ url: 'shop/excel/import/goods', data, responseType: 'blob' })
}
// 获取订单详情
export async function $shopOrderDetail (data) {
  return await R({ url: 'shop/order/detail', data })
}
// 启用0/禁用1 商品分类
export async function $shopCategoryBan (data) {
  return await R({ url: 'shop/category/ban', data })
}
// 商品分类列表
export async function $shopCategoryList (data) {
  return await R({ url: 'shop/category/list', data })
}
