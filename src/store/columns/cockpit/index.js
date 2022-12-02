import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  cockpit_sales_mode_list: item => item.app.modeDefault,
  cockpit_sales_page_status: item => app.list.sales,
  cockpit_sales_column: item => columns.daySales,
  cockpit_history_column: item => columns.historySales,
  cockpit_history_time_column: item => columns.historyTimeSales,
  cockpit_sales_select_list: item => item.app.selectDefault,

  cockpit_battle_mode_list: item => item.app.modeDefault,
  cockpit_battle_page_status: item => item.app.listDefault,
  cockpit_battle_column: item => columns.battle,
  cockpit_battle_select_list: item => select.battle,

  cockpit_battle_log_mode_list: item => item.app.modeDefault,
  cockpit_battle_log_page_status: item => app.list.log,
  cockpit_battle_log_column: item => columns.battleList,
  cockpit_battle_log_item_column: item => columns.battleItem,
  cockpit_battle_gas_log_column: item => columns.battleGasList,
  cockpit_battle_gas_log_item_column: item => columns.battleGasItem,
  cockpit_battle_log_select_list: item => select.battleList,

  batch_edit_mode_list: item => item.app.modeDefault,
  batch_edit_page_status: item => app.list.batchEdit,
  batch_edit_column: item => columns.batchEdit,
  batch_edit_select_list: item => select.batchEdit
}

export default {
  namespaced: true,
  state,
  getters
}
