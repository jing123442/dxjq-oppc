import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 积分设置
  pointsConfig_mode_list: item => item.app.modeDefault,
  pointsConfig_page_status: item => item.app.listDefault,
  pointsConfig_column: item => columns.pointsConfig,
  pointsConfig_select_list: item => select.pointsConfig,
  // 规则设置
  rule_page_status: item => app.list.ruleList,
  rule_column: item => columns.ruleList,
  rule_select_list: item => select.ruleList,
  // 供应商列表
  supplier_mode_list: item => app.mode.supplier,
  supplier_page_status: item => app.list.supplier,
  supplier_column: item => columns.supplier,
  supplier_select_list: item => select.supplier,
  // 订单
  order_page_status: item => app.list.order,
  order_column: item => columns.order,
  order_select_list: item => select.order,
  // 订单详情
  order_detail_mode_list: item => app.mode.orderDetail,
  order_detail_column: item => columns.orderDetail,
  order_detail_select_list: item => select.orderDetail,
  // 商品分类
  category_mode_list: item => item.app.modeDefault,
  category_column: item => columns.category,
  category_select_list: item => select.category,
  category_page_status: item => app.list.category,
  // 商品信息
  goods_mode_list: item => app.mode.goods,
  goods_column: item => columns.goods,
  goods_select_list: item => select.goods,
  goods_page_status: item => app.list.goods,
  // 积分账户
  points_account_mode_list: item => item.app.modeDefault,
  points_account_column: item => columns.pointsAccount,
  points_account_select_list: item => select.pointsAccount,
  points_account_page_status: item => app.list.pointsAccount,
  // 积分账户明细
  points_account_log_mode_list: item => item.app.modeDefault,
  points_account_log_column: item => columns.pointsAccountLog,
  points_account_log_select_list: item => select.pointsAccountLog,
  points_account_log_page_status: item => app.list.pointsAccountLog,
  // 积分调整
  point_change_mode_list: item => item.app.modeDefault,
  point_change_column: item => columns.pointChange,
  point_change_select_list: item => select.pointChange
}
const mutations = {
  CHANGE_MODE_ORDER_DETAIL: (state, payload) => {
    state.app.mode.orderDetail = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
