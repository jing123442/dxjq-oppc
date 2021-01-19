import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // QA问答
  customer_list_mode_list: item => app.mode.customer,
  customer_list_page_status: item => app.list.customer,
  customer_list_column: item => columns.customer,
  customer_list_select_list: item => select.customer,

  // QA分类
  customer_type_mode_list: item => item.app.modeDefault,
  customer_type_page_status: item => app.list.type,
  customer_type_column: item => columns.type,
  customer_type_select_list: item => select.type
}

export default {
  namespaced: true,
  state,
  getters
}
