const app = {
  state: {
    debug: false,
    menuType: true,
    sidebar: {
      opened: true// !+sessionStorage.getItem('sidebarStatus')
    },
    systemprefix: '运营管理平台',
    systemsuffix: '',
    listDefault: 29,
    modeDefault: [],
    selectDefault: {},
    // 请求参数
    queryParams: [{
      type: 1,
      key: 'page',
      value: 'pageNum'
    }, {
      type: 1,
      key: 'size',
      value: 'pageSize'
    }],
    // 返回成功字段和值
    responseSuccess: {
      key: 'code',
      value: 0,
      message: 'message',
      logout: '2814'
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    toggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
