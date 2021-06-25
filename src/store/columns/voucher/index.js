import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 资金流水凭证列表
  voucher_list_mode_list: item => item.app.modeDefault,
  voucher_list_page_status: item => app.list.list,
  voucher_list_cc_column: item => [...columns.listcc, ...columns.list],
  voucher_list_xq_column: item => [...columns.listxq, ...columns.list],
  voucher_list_select_list: item => select.list,

  // 流水凭证下载
  voucher_download_mode_list: item => item.app.modeDefault,
  voucher_download_page_status: item => app.list.download,
  voucher_download_cc_column: item => [...columns.downloadcc, ...columns.download],
  voucher_download_xq_column: item => [...columns.downloadxq, ...columns.download],
  voucher_download_select_list: item => select.download,

  // 详情记录
  voucher_detail_column: item => columns.detail
}

export default {
  namespaced: true,
  state,
  getters
}
