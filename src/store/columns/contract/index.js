import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 签约确认
  contract_contractValid_column: item => columns.contractValid,
  contract_contractValid_select_list: item => select.contractValid,
  contract_contractValid_page_status: item => app.list.contractValid,
  contract_contractValid_mode_list: item => app.mode.modeDefault,
  contract_contractValid_dialog_column: item => columns.cooperationApplyDetail,
  // 合同签约
  contract_contractSign_column: item => columns.contractSign,
  contract_contractSign_select_list: item => select.contractSign,
  contract_contractSign_page_status: item => app.list.contractSign,
  contract_contractSign_mode_list: item => app.mode.modeDefault,
  // 合同模板
  contract_contractTemplate_column: item => columns.contractTemplate,
  contract_contractTemplate_select_list: item => select.contractTemplate,
  contract_contractTemplate_page_status: item => app.list.contractTemplate,
  contract_contractTemplate_mode_list: item => app.mode.modeDefault,

  // 印章管理
  contract_orgSealList_column: item => columns.orgSealList,
  contract_orgSealList_page_status: item => app.list.orgSealList,
  contract_orgSealList_mode_list: item => app.mode.modeDefault,
  contract_orgSealList_select_list: item => select.orgSealList,
  // 企业印章申请dialog
  dialog_currency_seal_column: item => columns
}

export default {
  namespaced: true,
  state,
  getters
}
