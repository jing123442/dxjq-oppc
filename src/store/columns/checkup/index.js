import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 检测订单
  checkup_order_mode_list: item => item.app.modeDefault,
  checkup_order_page_status: item => app.list.order,
  checkup_order_column: item => columns.order,
  checkup_order_select_list: item => select.order,

  // 资料list
  checkup_material_page_status: item => app.list.material,
  checkup_material_column: item => columns.material,
}

export default {
  namespaced: true,
  state,
  getters
}
