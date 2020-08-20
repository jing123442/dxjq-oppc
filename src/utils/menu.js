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
      { path: '/index', name: 'index', meta: { title: '个人信息', noCache: false } },
      { path: '/index', name: 'mine', meta: { title: '修改密码', noCache: false } }
    ]
  }, {
    path: '/user',
    name: 'user',
    meta: { title: '用户管理', icon: 'el-icon-s-custom', noCache: false },
    children: [
      { path: '/index', name: 'index', meta: { title: '平台用户管理', noCache: false } },
      { path: '/carrier', name: 'carrier', meta: { title: '物流用户管理', noCache: false } },
      { path: '/cashier', name: 'cashier', meta: { title: '加气站用户管理', noCache: false } }
    ]
  }, {
    path: '/business',
    name: 'business',
    meta: { title: '平台公司管理', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'index', meta: { title: '平台公司', noCache: false } },
      { path: '/account', name: 'account', meta: { title: '资金账户管理', noCache: false } }
    ]
  }, {
    path: '/filler',
    name: 'filler',
    meta: { title: '加气站管理', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'index', meta: { title: '加气站企业列表', noCache: false } },
      { path: '/lngStationsList', name: 'lngStationsList', meta: { title: '加气站列表', noCache: false } },
      { path: '/lngStationAccountManager', name: 'lngStationAccountManager', meta: { title: '加气站资金账户管理', noCache: false } },
      { path: '/lngServiceFeeSetting', name: 'lngServiceFeeSetting', meta: { title: '服务费设置', noCache: false } },
      { path: '/lngUpdatePrice', name: 'lngUpdatePrice', meta: { title: '气价维护', noCache: false } }
    ]
  }, {
    path: '/carrier',
    name: 'carrier',
    meta: { title: '物流公司管理', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'index', meta: { title: '物流公司', noCache: false } },
      { path: '/logisticsAccountManager', name: 'logisticsAccountManager', meta: { title: '公司资金账户管理', noCache: false } },
      { path: '/vehicleManager', name: 'vehicleManager', meta: { title: '车辆管理', noCache: false } },
      { path: '/truckAccountManager', name: 'truckAccountManager', meta: { title: '车辆资金账户管理', noCache: false } },
      { path: '/rechargeRecord', name: 'rechargeRecord', meta: { title: '充值记录', noCache: false } },
      { path: '/inventoryManager', name: 'inventoryManager', meta: { title: '圈存管理', noCache: false } },
      { path: '/transactionOrderManager', name: 'transactionOrderManager', meta: { title: '加气订单管理', noCache: false } }
    ]
  }, {
    path: '/policy',
    name: 'policy',
    meta: { title: '运营策略管理', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'index', meta: { title: '物流公司价格配置', noCache: false } },
      { path: '/strategyGasStationList', name: 'strategyGasStationList', meta: { title: '按物流公司配置价格', noCache: false } },
      { path: '/priceUpdateLogList', name: 'priceUpdateLogList', meta: { title: '价格变更记录', noCache: false } },
      { path: '/sourceConfig', name: 'sourceConfig', meta: { title: '液源地配置', noCache: false } },
      { path: '/gasStockList', name: 'gasStockList', meta: { title: '加气站库存查询', noCache: false } },
      { path: '/lngPlan', name: 'lngPlan', meta: { title: 'LNG计划管理', noCache: false } }
    ]
  }, {
    path: '/settlement',
    name: 'settlement',
    meta: { title: '结算管理', icon: 'el-icon-s-home', noCache: false },
    children: [
      { path: '/index', name: 'index', meta: { title: '加气站服务汇总', noCache: false } },
      { path: '/logisticsSettlement', name: 'logisticsSettlement', meta: { title: '物流公司加气费汇总', noCache: false } }
    ]
  }]
}
