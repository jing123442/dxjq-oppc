import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 平台公司
  bus_org_mode_list: item => app.mode.org,
  bus_org_page_status: item => app.list.org,
  bus_org_column: item => columns.org,
  bus_org_select_list: item => select.org,
  // 平台公司详情
  bus_orgDetail_column: item => columns.orgDetail,
  // 公司资金账户管理
  bus_account_mode_list: item => item.app.modeDefault,
  bus_account_page_status: item => app.list.account,
  bus_account_column: item => columns.account,
  bus_account_select_list: item => select.account,
  // 公司资金账户管理 -- 查看--账户流水
  bus_accountList_column: item => columns.accountList,
  bus_accountDetail_column: item => columns.accountDetail,
  bus_acc_list_select_list: item => select.accountList
}

export default {
  namespaced: true,
  state,
  getters
}
