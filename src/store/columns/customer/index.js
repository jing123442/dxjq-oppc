import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 加气订单
  customer_list_mode_list: item => item.app.modeDefault,
  customer_list_page_status: item => app.list.customer,
  customer_list_column: item => columns.customer,
  customer_list_select_list: item => select.customer
}

export default {
  namespaced: true,
  state,
  getters
}
