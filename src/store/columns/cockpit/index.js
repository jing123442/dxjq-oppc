import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  cockpit_sales_mode_list: item => item.app.modeDefault,
  cockpit_sales_page_status: item => app.list.sales,
  cockpit_sales_column: item => columns.daySales,
  cockpit_history_column: item => columns.historySales,
  cockpit_sales_select_list: item => item.app.selectDefault
}

export default {
  namespaced: true,
  state,
  getters
}
