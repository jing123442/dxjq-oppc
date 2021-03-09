import R from '@/utils/request'

// 修改液源地信息
export async function $priceUpdate (data) {
  return await R({ url: 'strategy/lng_from/update', data })
}

// 添加液源地
export async function $priceAdd (data) {
  return await R({ url: 'strategy/lng_from/add', data })
}

// 查询所有液源地
export async function $lngFormList (data) {
  return await R({ url: 'strategy/lng_from/all' })
}

// 根据gasstationId更新加气站基本信息
export async function $updateGasstation (data) {
  return await R({ url: 'strategy/gasstation/edit', data })
}

// 根据gasstationId更新加气站基本信息
export async function $updateGasstationPriceConfig (data) {
  return await R({ url: 'strategy/price_config/select_harbour', data })
}

// 根据港口id,查询港口价格
export async function $configPriceList (data) {
  return await R({ url: 'strategy/carriage_price/carriagePrice/' + data, method: 'get' })
}

// 批量配置运费单价
export async function $saveConfigPriceList (data) {
  return await R({ url: 'strategy/carriage_price/save_or_update_list', data })
}

// 批量设置区域优惠金额
export async function $configAreaBenefit (data) {
  return await R({ url: 'strategy/area_benefit/set_area_benefit_list', data })
}

// 申请发布
export async function $priceRelease (data) {
  return await R({ url: 'strategy/release_manage/add', data })
}

// 审核;2-通过 3-驳回
export async function $priceReleaseAudit (data) {
  return await R({ url: 'strategy/release_manage/release_audit', data })
}

export async function $configAreaEditBenefit (data) {
  return await R({ url: 'strategy/area_benefit/update', data })
}

// 设置配置运费
export async function $configGasFreight (data) {
  return await R({ url: 'strategy/freight_config/set_freight', data })
}

// LNG提报计划-确认订单
export async function $strategyOrderConfirm (data) {
  return await R({ url: 'strategy/purchase/confirm', data })
}

// LNG提报计划-取消订单
export async function $strategyOrderCancel (data) {
  return await R({ url: 'strategy/purchase/cancel', data })
}

// LNG提报计划-订单出港
export async function $strategyPurchaseLeave(data) {
  return await R({ url: 'strategy/purchase/leave', data })
}

// LNG提报计划-订单完成
export async function $purchaseComplete(data) {
  return await R({ url: 'strategy/purchase/complete', data })
}

// 获取返利优惠列表
export async function $configRebateList(data) {
  return await R({ url: 'strategy/rebate_config/list', data })
}

// 批量配置返利优惠
export async function $saveConfigRebateList(data) {
  return await R({ url: 'strategy/rebate_config/save_or_update_list', data })
}

// 设置加气站服务费、平台服务费
export async function $configGasProfit(data) {
  return await R({ url: 'strategy/gasstation/set_profit_quota', data })
}

// 平台挂牌价计算
export async function $listingPriceAlg(data) {
  return await R({ url: 'strategy/price_config/add', data })
}

// 加气站库存调整
export async function $updateStock(data) {
  return await R({ url: 'strategy/gasstation/eidt_stock', params: data })
}

// 增加卡车
export async function $strategyTruckAdd (data) {
  return await R({ url: 'strategy/truck/add', data })
}

// 获取卡车信息
export async function $strategyTruckInfo (data) {
  return await R({ url: 'strategy/truck/find', data })
}

// 获取绑定卡车的司机list
export async function $strategyDriverList (data) {
  return await R({ url: 'strategy/driver/list_all', data })
}

// 卡车增加司机
export async function $strategyTruckDriverAdd (data) {
  return await R({ url: 'strategy/truck_driver/add', data })
}

// 卡车删除司机
export async function $strategyTruckDriverDel (data) {
  return await R({ url: 'strategy/truck_driver/del', data })
}

// 下载卡车信息list
export async function $importDownloadFile (data) {
  return await R({ url: 'strategy/import/download_truck_tpl', method: 'get', params: data, responseType: 'blob' })
}

// 导入卡车数据
export async function $exportDataFile (data) {
  return await R({ url: 'strategy/import/import_truck', method: 'POST', data: data.file })
}

// 设置气价调节
export async function $gasstationUpdatePrice (data) {
  return await R({ url: 'strategy/gasstation/gas_price_edit', method: 'POST', data })
}

// LNG变更处理
export async function $strategyModifyPurchase (data) {
  return await R({ url: 'strategy/purchase/modify_handle', method: 'POST', data })
}

// LNG变更处理
export async function $strategyDuplicatePurchase (data) {
  return await R({ url: 'strategy/purchase_duplicate/find', method: 'POST', data })
}

// LNG核对
export async function $strategyCheckReachPurchase (data) {
  return await R({ url: 'strategy/purchase/check_reach', method: 'POST', data })
}

// LNG异常处理
export async function $strategyExceptionPurchase (data) {
  return await R({ url: 'strategy/purchase_exception/exception_handle', method: 'POST', data })
}

// LNG获取异常订单信息
export async function $strategyExceptionFindPurchase (data) {
  return await R({ url: 'strategy/purchase_exception/find', method: 'POST', data })
}

// LNG详情信息
export async function $strategyPurchaseFind (data) {
  return await R({ url: 'strategy/purchase/find', method: 'POST', data })
}

// LNG下载入库明细
export async function $strategyPurchaseExport (data) {
  return await R({ url: 'strategy/purchase/download_lng', method: 'POST', data, responseType: 'blob' })
}

// 某个账期下加气站入库明细汇总
export async function $strategyPurchaseStockTotal(data) {
  return await R({ url: 'strategy/stock_log/get_store_total', data })
}
// 下载某个账期的入库明细
export async function $strategyPurchaseDownloadStock(data) {
  return await R({ url: 'strategy/purchase/download_store_list', data, responseType: 'blob' })
}
// 实时发布接口
export async function $strategyPublishPrice(data) {
  return await R({ url: 'strategy/release_manage/publish', data })
}
