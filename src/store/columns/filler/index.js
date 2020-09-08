import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 加气站企业列表
  filler_firmList_mode_list: item => app.mode.firmList,
  filler_firmList_page_status: item => app.list.firmList,
  filler_firmList_column: item => columns.firmList,
  filler_firmList_select_list: item => select.firmList,
  // 加气站企业列表---添加加气站
  filler_addGasStation_mode_list: item => app.mode.addGasStation,
  filler_addGasStation_column: item => columns.addGasStation,
  // 加气站列表
  filler_gapList_mode_list: item => app.mode.gapList,
  filler_gapList_page_status: item => app.list.gapList,
  filler_gapList_column: item => columns.gapList,
  filler_gapList_select_list: item => select.gapList,
  // 加气站列表--打印机列表
  filler_printList_page_status: item => app.list.printList,
  filler_printList_select_list: item => select.printList,
  filler_printList_column: item => columns.printList,
  // 加气站资金账户管理
  filler_account_mode_list: item => item.app.modeDefault,
  filler_account_page_status: item => app.list.account,
  filler_account_column: item => columns.account,
  filler_account_select_list: item => select.account,
  // 加气站资金账户管理--账户流水
  filler_accountList_column: item => columns.accountList,
  // 服务费设置
  filler_sevicePrice_mode_list: item => item.app.modeDefault,
  filler_sevicePrice_page_status: item => app.list.sevicePrice,
  filler_sevicePrice_column: item => columns.sevicePrice,
  filler_sevicePrice_select_list: item => select.sevicePrice,
  // 服务费设置--服务费变更记录
  filler_serviceChangeRecord_column: item => columns.serviceChangeRecord,
  // 气价维护
  filler_updatePrice_mode_list: item => item.app.modeDefault,
  filler_updatePrice_page_status: item => app.list.updatePrice,
  filler_updatePrice_column: item => columns.updatePrice,
  filler_updatePrice_select_list: item => select.updatePrice,
  // 气价维护--气价变更记录
  filler_lngUpdatePrice_column: item => columns.lngUpdatePrice
}

export default {
  namespaced: true,
  state,
  getters
}
