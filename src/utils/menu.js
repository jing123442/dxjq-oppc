export function menuList() {
  return [{
    path: '/home',
    name: 'home',
    meta: { title: '首页', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'home', meta: { title: '首页', icon: 'el-icon-s-home', noCache: false } }
    ]
  }, {
    path: '/mine',
    name: 'mine',
    meta: { title: '个人中心', icon: 'el-icon-user', noCache: false },
    children: [
      { path: '/index', name: 'mine', meta: { title: '个人信息', noCache: false } },
      { path: '/index', name: 'mine', meta: { title: '修改密码', noCache: false } }
    ]
  }, {
    path: '/user',
    name: 'user',
    meta: { title: '用户管理', icon: 'el-icon-s-custom', noCache: false },
    children: [
      { path: '/index', name: 'user', meta: { title: '平台用户管理', noCache: false } },
      { path: '/carrier', name: 'carrier', meta: { title: '物流用户管理', noCache: false } },
      { path: '/cashier', name: 'cashier', meta: { title: '加气站用户管理', noCache: false } }
    ]
  }, {
    path: '/business',
    name: 'business',
    meta: { title: '平台公司管理', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'business', meta: { title: '企业管理', noCache: false } },
      { path: '/account', name: 'account', meta: { title: '资金账户管理', noCache: false } }
    ]
  }, {
    path: '/filler',
    name: 'filler',
    meta: { title: '加气站管理', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'filler', meta: { title: '企业管理', noCache: false } },
      { path: '/index', name: 'filler', meta: { title: '资金账户管理', noCache: false } }
    ]
  }, {
    path: '/carrier',
    name: 'carrier',
    meta: { title: '物流公司管理', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'user', meta: { title: '企业管理', noCache: false } },
      { path: '/index', name: 'user', meta: { title: '资金账户管理', noCache: false } }
    ]
  }, {
    path: '/policy',
    name: 'policy',
    meta: { title: '运营策略管理', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'policy', meta: { title: '企业管理', noCache: false } },
      { path: '/index', name: 'policy', meta: { title: '资金账户管理', noCache: false } }
    ]
  }, {
    path: '/settlement',
    name: 'settlement',
    meta: { title: '结算管理', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'settlement', meta: { title: '企业管理', noCache: false } },
      { path: '/index', name: 'settlement', meta: { title: '资金账户管理', noCache: false } }
    ]
  }]
}
