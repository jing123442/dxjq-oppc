import columns from './columns'
import select from './select'
import app from './app'

const state = Object.assign({}, { app: app }, { columns: columns }, { select: select })

const getters = {
  // 消息配置
  message_mode_list: item => item.app.modeDefault,
  message_page_status: item => app.list.message,
  message_column: item => columns.message,
  message_select_list: item => select.message
}

export default {
  namespaced: true,
  state,
  getters
}
