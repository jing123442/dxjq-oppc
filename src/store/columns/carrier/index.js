import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 物流公司
  carrier_logistics_mode_list: item => item.app.modeDefault,
  carrier_logistics_page_status: item => app.list.logistics,
  carrier_logistics_column: item => columns.logistics,
  carrier_logistics_select_list: item => select.logistics,
  // 物流公司--详情
  carrier_logisticsDetail_column: item => columns.logisticsDetail,
  // 物流公司--添加车辆
  carrier_addCar_column: item => columns.addCar,
  // 公司资金账户管理
  carrier_firmAccount_mode_list: item => item.app.modeDefault,
  carrier_firmAccount_page_status: item => app.list.firmAccount,
  carrier_firmAccount_column: item => columns.firmAccount,
  carrier_firmAccount_select_list: item => select.firmAccount,
  // 公司资金账户管理---充值
  carrier_firmAccountRecharge_column: item => columns.firmAccountRecharge,
  // 公司资金账户管理---账户流水
  carrier_firmAccountList_column: item => columns.firmAccountList,
  // 公司资金账户管理---圈存
  carrier_vehicleCircle_column: item => columns.vehicleCircle,
  // 公司资金账户管理---圈存弹窗
  carrier_vehicleCircleEvent_column: item => columns.vehicleCircleEvent,
  // 车辆管理
  carrier_vehicle_mode_list: item => item.app.modeDefault,
  carrier_vehicle_page_status: item => app.list.vehicle,
  carrier_vehicle_column: item => columns.vehicle,
  carrier_vehicle_select_list: item => select.vehicle,
  // 车辆管理---详情
  carrier_vehicle_detail_mode_list: item => app.mode.vehicle_detail,
  carrier_vehicle_detail_column: item => columns.vehicle_detail,
  // 车辆管理---资金归集
  carrier_vehicle_collect_column: item => columns.vehicle_collect,
  // 车辆管理---绑定司机
  carrier_vehicle_bind_column: item => columns.vehicle_bind,

  // 车辆资金账户管理
  carrier_truckAccount_mode_list: item => item.app.modeDefault,
  carrier_truckAccount_page_status: item => app.list.truckAccount,
  carrier_truckAccount_column: item => columns.truckAccount,
  carrier_truckAccount_select_list: item => select.truckAccount,
  // 车辆资金账户管理--账户流水
  carrier_truckAccountList_column: item => columns.truckAccountList,
  // 充值记录
  carrier_rechargeRecord_mode_list: item => item.app.modeDefault,
  carrier_rechargeRecord_page_status: item => app.list.rechargeRecord,
  carrier_rechargeRecord_column: item => columns.rechargeRecord,
  carrier_rechargeRecord_select_list: item => select.rechargeRecord,
  // 充值记录--审核
  carrier_rechargeRecordCheck_column: item => columns.rechargeRecordCheck,
  // 充值记录---详情
  carrier_rechargeRecordDetail_column: item => columns.rechargeRecordDetail,

  // 圈存管理
  carrier_inventoryManager_mode_list: item => item.app.modeDefault,
  carrier_inventoryManager_page_status: item => app.list.inventoryManager,
  carrier_inventoryManager_column: item => columns.inventoryManager,
  carrier_inventoryManager_select_list: item => select.inventoryManager,

  // 加气订单管理
  carrier_orderManager_mode_list: item => item.app.modeDefault,
  carrier_orderManager_page_status: item => app.list.orderManager,
  carrier_orderManager_column: item => columns.orderManager,
  carrier_orderManager_select_list: item => select.orderManager,
  // 加气订单管理---详情
  carrier_orderManagerDetail_mode_list: item => app.mode.orderManagerDetail,
  carrier_orderManagerDetail_column: item => columns.orderManagerDetail
}

export default {
  namespaced: true,
  state,
  getters
}
