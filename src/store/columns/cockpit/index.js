import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  cockpit_sales_mode_list: item => item.app.modeDefault,
  cockpit_sales_page_status: item => app.list.sales,
  cockpit_sales_column: item => columns.daySales,
  cockpit_history_column: item => columns.historySales,
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
  cockpit_battle_log_select_list: item => select.battleList
}

export default {
  namespaced: true,
  state,
  getters
}
