import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 平台用户管理
  user_op_mode_list: item => item.app.modeDefault,
  user_op_page_status: item => item.app.listDefault,
  user_op_column: item => columns.op,
  user_op_select_list: item => select.op,
  // 物流公司用户管理
  user_carrier_mode_list: item => item.app.modeDefault,
  user_carrier_page_status: item => item.app.listDefault,
  user_carrier_column: item => columns.carrier,
  user_carrier_select_list: item => select.carrier,

  // 加气站公司用户管理
  user_cashier_mode_list: item => item.app.modeDefault,
  user_cashier_page_status: item => item.app.listDefault,
  user_cashier_column: item => columns.cashier,
  user_cashier_select_list: item => select.cashier,

  // 选择企业
  user_business_column: item => columns.business,
  // 注册用户
  user_intention_mode_list: item => app.mode.intention,
  user_intention_page_status: item => item.app.listDefault,
  user_intention_column: item => columns.intention,
  user_intention_select_list: item => select.intention
}

export default {
  namespaced: true,
  state,
  getters
}
