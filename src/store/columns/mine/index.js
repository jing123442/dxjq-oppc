import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 个人信息
  mine_personal_column: item => columns.personal,
  // 修改密码
  mine_passwordChange_column: item => columns.passwordChange
}

export default {
  namespaced: true,
  state,
  getters
}
