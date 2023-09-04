import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  cockpit_sales_mode_list: item => item.app.modeDefault,
  cockpit_sales_page_status: item => app.list.sales,
  cockpit_sales_column: item => columns.daySales,
  cockpit_history_column: item => columns.historySales,
  modifyListColumn: item => columns.modifyList,

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
  batch_edit_select_list: item => select.batchEdit,

  cockpit_dync_stevedor_mode_list: item => item.app.modeDefault,
  cockpit_dync_stevedor_page_status: item => app.list.dync,
  cockpit_dync_stevedor_column: item => columns.dyncStevedor,
  cockpit_dync_stevedor_import_column: item => columns.dyncImportStevedor,
  cockpit_dync_stevedor_update_column: item => columns.dyncUpdateStevedor,
  cockpit_dync_stevedor_select_list: item => select.dyncStevedor,

  cockpit_dync_entrain_column: item => columns.dyncEntrain,
  cockpit_dync_entrain_select_list: item => select.entrain,

  cockpit_dync_entrain_sf_column: item => columns.dyncEntrainSF,
  cockpit_dync_entrain_sf_select_list: item => select.entrainSF,

  cockpit_dync_entrain_dx_column: item => columns.dyncEntrainDX,
  cockpit_dync_entrain_dx_select_list: item => select.entrainDX,

  cockpit_dync_loss_column: item => columns.dyncLoss,
  cockpit_dync_loss_import_column: item => columns.dyncImportLoss,
  cockpit_dync_loss_select_list: item => select.dyncLoss,

  cockpit_dync_card_column: item => columns.dyncCard,
  cockpit_dync_card_import_column: item => columns.dyncCardImport,
  cockpit_dync_card_select_list: item => select.dyncCard,

  cockpit_dync_gass_column: item => columns.dyncGass,
  cockpit_dync_gass_select_list: item => select.dyncGass,

  cockpit_dync_refuel_column: item => columns.dyncRefuel,
  cockpit_dync_refuel_select_list: item => select.dyncRefuel,

  cockpit_dync_day_info1_column: item => columns.dyncDayInfo1,
  cockpit_dync_day_info2_column: item => columns.dyncDayInfo2,
  cockpit_dync_day_info3_column: item => columns.dyncDayInfo3,

}

export default {
  namespaced: true,
  state,
  getters
}
