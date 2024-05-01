import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 加气站服务费汇总
  settlement_servicePrice_mode_list: item => item.app.modeDefault,
  settlement_servicePrice_page_status: item => app.list.servicePrice,
  settlement_servicePrice_column: item => columns.servicePrice,
  settlement_servicePrice_select_list: item => item.app.selectDefault,
  // 加气站服务费汇总--对账单
  settlement_servicePriceBill_column: item => columns.servicePriceBill,
  // 物流公司加气费汇总
  settlement_gasPrice_mode_list: item => item.app.modeDefault,
  settlement_gasPrice_page_status: item => app.list.gasPrice,
  settlement_gasPrice_column: item => columns.gasPrice,
  settlement_gasPrice_select_list: item => item.app.selectDefault,
  // 物流公司加气费汇总--充值账单
  settlement_gasPriceRechargeList_column: item => columns.gasPriceRechargeList,
  // 物流公司加气费汇总--加气账单
  settlement_gasPriceOrderList_column: item => columns.gasPriceOrderList,
  // 物流公司加气费汇总--卡车汇总
  settlement_gasPriceTruckList_column: item => columns.gasPriceTruckList,
  // 物流公司加气费汇总--卡车对账单
  settlement_gasPriceTruckOrderList_column: item => columns.gasPriceTruckOrderList,
  // 直销加气开票管理
  invoice_ds_log_column: item => columns.invoiceDs,
  invoice_ds_log_select_list: item => select.invoiceDs,
  invoice_ds_log_page_status: item => app.list.invoiceDs,
  invoice_order_column: item => columns.invoiceDsOrder,

  // 直销加气站提现申请
  settlement_direct_withd_apply_mode_list: item => item.app.modeDefault,
  settlement_direct_withd_apply_column: item => columns.directWithdApply,
  settlement_direct_withd_apply_log_column: item => columns.directWithdApplyLog,
  settlement_direct_withd_apply_select_list: item => select.directWithdApply,
  settlement_direct_withd_apply_page_status: item => app.list.directWithdApply,
}

export default {
  namespaced: true,
  state,
  getters
}
