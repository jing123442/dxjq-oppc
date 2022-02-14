import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 物流客户直销加气配置
  carrier_ds_mode_list: item => item.app.modeDefault,
  carrier_ds_page_status: item => app.list.carrierDsConfig,
  carrier_ds_column: item => columns.carrierDsConfig,
  carrier_ds_select_list: item => select.carrierDsConfig,
  // 物流客户直销加气配置记录
  carrier_log_mode_list: item => item.app.modeDefault,
  carrier_log_page_status: item => app.list.carrierOprateLog,
  carrier_log_column: item => columns.carrierOprateLog,
  carrier_log_select_list: item => select.carrierOprateLog,
  // 加气站直销加气配置
  filler_ds_mode_list: item => item.app.modeDefault,
  filler_ds_page_status: item => app.list.fillerDsConfig,
  filler_ds_column: item => columns.fillerDsConfig,
  filler_ds_select_list: item => select.fillerDsConfig,
  // 加气站直销加气配置
  filler_log_mode_list: item => item.app.modeDefault,
  filler_log_page_status: item => app.list.fillerOprateLog,
  filler_log_column: item => columns.fillerOprateLog,
  filler_log_select_list: item => select.fillerOprateLog
}

export default {
  namespaced: true,
  state,
  getters
}
