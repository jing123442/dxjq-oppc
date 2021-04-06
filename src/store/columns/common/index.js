import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  carrier_unauth_mode_list: item => app.mode.orgInfo,
  // 企业信息，分一证和三证
  common_org_auth_column: item => [...columns.orgOAuth, ...columns.orgAuthInfo],
  common_org_s_auth_column: item => [...columns.orgSAuth, ...columns.orgAuthInfo],
  common_org_auth_other_column: item => columns.orgAuthOther,
  common_org_auth_carrier_column: item => columns.orgAuthCarrierInfo
}

export default {
  namespaced: true,
  state,
  getters
}
