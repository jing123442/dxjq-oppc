import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // LNG气瓶装备
  equipment_gasTankEquipment_mode_list: item => item.app.modeDefault,
  equipment_gasTankEquipment_page_status: item => app.list.gasTankEquipment,
  equipment_gasTankEquipment_column: item => columns.gasTankEquipment,
  equipment_gasTankEquipment_select_list: item => select.gasTankEquipment,
  // 智能液位计
  equipment_gasLevelEquipment_mode_list: item => item.app.modeDefault,
  equipment_gasLevelEquipment_page_status: item => app.list.gasLevelEquipment,
  equipment_gasLevelEquipment_column: item => columns.gasLevelEquipment,
  equipment_gasLevelEquipment_select_list: item => select.gasLevelEquipment,
}

export default {
  namespaced: true,
  state,
  getters
}
