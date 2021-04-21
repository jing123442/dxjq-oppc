import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  common_unauth_mode_list: item => app.mode.orgInfo,
  common_user_carrier_mode_list: item => app.mode.carrierUser,
  // 企业信息，分一证和三证
  common_org_auth_column: item => [...columns.orgOAuth, ...columns.orgAuthInfo],
  common_org_s_auth_column: item => [...columns.orgSAuth, ...columns.orgAuthInfo],
  common_org_gasstation_auth_column: item => [...columns.gasstationFieldInfo],
  // 物流公司
  common_org_auth_other_column: item => [...columns.orgAuthManageInfo, ...columns.orgAuthCarrierInfo, ...columns.orgAuthContractInfo, ...columns.orgAuthOther],
  common_org_unauth_other_column: item => [...columns.orgAuthManageInfo, ...columns.orgAuthCarrierInfo],
  // 加气站
  common_org_filler_auth_other_column: item => [...columns.orgAuthManageInfo, ...columns.orgAuthFillerInfo, ...columns.orgAuthContractInfo, ...columns.orgAuthOther],
  common_org_filler_unauth_other_column: item => [...columns.orgAuthManageInfo, ...columns.orgAuthFillerInfo],

  // 注册用户
  common_user_intention_mode_list: item => app.mode.intention,
  common_user_intention_page_status: item => item.app.listDefault,
  common_user_intention_column: item => [...columns.userIntentionBaseInfo, ...columns.userWxBaseInfo, ...columns.userAuthInfo, ...columns.userIntentionOptsInfo],
  common_user_carrier_column: item => [...columns.userBaseInfo, ...columns.userWxBaseInfo, ...columns.userAuthInfo],
  common_truck_carrier_column: item => columns.userTruckAuthInfo,
  common_user_intention_select_list: item => select.intention
}

export default {
  namespaced: true,
  state,
  getters
}
