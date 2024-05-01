import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 菜单
  authority_menu_mode_list: item => item.app.modeDefault,
  authority_menu_page_status: item => app.list.menu,
  authority_menu_column: item => columns.menu,
  authority_menu_select_list: item => select.menu,
  // 角色
  authority_role_mode_list: item => item.app.modeDefault,
  authority_role_page_status: item => app.list.role,
  authority_role_column: item => columns.role,
  authority_role_select_list: item => select.role,
  // 按钮
  authority_button_mode_list: item => item.app.modeDefault,
  authority_button_page_status: item => app.list.button,
  authority_button_column: item => columns.button,
  authority_button_select_list: item => select.button,
  // 用户
  authority_user_mode_list: item => item.app.modeDefault,
  authority_user_page_status: item => item.app.listDefault,
  authority_user_column: item => columns.user,
  authority_user_select_list: item => select.user
}

export default {
  namespaced: true,
  state,
  getters
}
