export function menuList() {
  return [{
    path: '/home',
    name: 'home',
    meta: { title: '首页', icon: 'icon-shouye', class: 'em-iconfont', noCache: false },
    children: [
      { path: '/index', name: 'home', meta: { title: '首页', icon: 'icon-shouye', class: 'em-iconfont', noCache: false } }
    ]
  }, {
    path: '/mine',
    name: 'mine',
    meta: { title: '个人中心', icon: 'icon-gerenzhongxin', class: 'em-iconfont', noCache: false },
    children: [
      { path: '/mineIndex', name: 'mineIndex', meta: { title: '个人信息', noCache: false } },
      { path: '/mineEditPassword', name: 'mineEditPassword', meta: { title: '修改密码', noCache: false } }
    ]
  }, {
    path: '/user',
    name: 'user',
    meta: { title: '用户管理', icon: 'icon-yonghuguanli', class: 'em-iconfont', noCache: false },
    children: [
      { path: '/userIntention', name: 'userIntention', meta: { title: '意向个人车主', noCache: false } },
      { path: '/userIndex', name: 'userIndex', meta: { title: '平台用户管理', noCache: false } },
      { path: '/userCarrier', name: 'userCarrier', meta: { title: '物流用户管理', noCache: false } },
      { path: '/userCashier', name: 'userCashier', meta: { title: '加气站用户管理', noCache: false } }
    ]
  }, {
    path: '/business',
    name: 'business',
    meta: { title: '平台公司管理', icon: 'icon-pingtaigongsiguanli', class: 'em-iconfont', noCache: false },
    children: [
      { path: '/businessIndex', name: 'businessIndex', meta: { title: '平台公司', noCache: false } },
      { path: '/businessAccount', name: 'businessAccount', meta: { title: '公司资金账户', noCache: false } }
    ]
  }, {
    path: '/filler',
    name: 'filler',
    meta: { title: '加气站管理', icon: 'icon-jiaqizhanguanli', class: 'em-iconfont', noCache: false },
    children: [
      { path: '/fillerIndex', name: 'fillerIndex', meta: { title: '加气站企业资料', noCache: false } },
      { path: '/fillerInfo', name: 'fillerInfo', meta: { title: '加气站信息维护', noCache: false } },
      { path: '/fillerAccount', name: 'fillerAccount', meta: { title: '加气站资金账户管理', noCache: false } },
      { path: '/fillerPrice', name: 'fillerPrice', meta: { title: '加气站挂牌价查询', noCache: false } },
      { path: '/fillerGasStockList', name: 'fillerGasStockList', meta: { title: '加气站库存管理', noCache: false } },
      { path: '/fillerLngPlan', name: 'fillerLngPlan', meta: { title: 'LNG计划管理', noCache: false } }
    ]
  }, {
    path: '/carrier',
    name: 'carrier',
    meta: { title: '物流公司管理', icon: 'icon-wuliugongsiguanli', class: 'em-iconfont', noCache: false },
    children: [
      { path: '/carrierIndex', name: 'carrierIndex', meta: { title: '物流公司', noCache: false } },
      { path: '/logisticsAccountManager', name: 'logisticsAccountManager', meta: { title: '公司资金账户管理', noCache: false } },
      { path: '/vehicleManager', name: 'vehicleManager', meta: { title: '车辆管理', noCache: false } },
      { path: '/truckAccountManager', name: 'truckAccountManager', meta: { title: '卡车资金账户管理', noCache: false } },
      { path: '/truckIntegral', name: 'truckIntegral', meta: { title: '卡车积分账户管理', noCache: false } },
      { path: '/rechargeRecord', name: 'rechargeRecord', meta: { title: '充值记录', noCache: false } }
      /* { path: '/inventoryManager', name: 'inventoryManager', meta: { title: '圈存管理', noCache: false } }, */
      /* { path: '/transactionOrderManager', name: 'transactionOrderManager', meta: { title: '加气订单管理', noCache: false } } */
    ]
  }, {
    path: '/price',
    name: 'price',
    meta: { title: '定价管理', icon: 'icon-dingjiaguanli', class: 'em-iconfont', noCache: false },
    children: [
      {
        path: '/price/priceIndex',
        name: 'priceIndex',
        meta: { title: '挂牌价管理', noCache: false },
        children: [
          { path: '/listing', name: 'listing', meta: { title: '平台挂牌价', noCache: false } },
          { path: '/departure', name: 'departure', meta: { title: '长城奥扬出港价', noCache: false } },
          { path: '/preferential', name: 'preferential', meta: { title: '区域优惠政策', noCache: false } },
          { path: '/estimate', name: 'estimate', meta: { title: '运费测算', noCache: false } },
          { path: '/freight', name: 'freight', meta: { title: '运费单价', noCache: false } },
          { path: '/measure', name: 'measure', meta: { title: '气价调节', noCache: false } },
          { path: '/mileage', name: 'mileage', meta: { title: '加气站里程', noCache: false } }
        ]
      },
      { path: '/priceRelease', name: 'priceRelease', meta: { title: '发布管理', noCache: false } }
    ]
  }, {
    path: '/market',
    name: 'market',
    meta: { title: '营销管理', icon: 'icon-yingxiaoguanli', class: 'em-iconfont', noCache: false },
    children: [
      { path: '/marketIndex', name: 'marketIndex', meta: { title: '专项优惠配置', noCache: false } },
      { path: '/marketCost', name: 'marketCost', meta: { title: '长城奥扬费用', noCache: false } },
      { path: '/marketProfit', name: 'marketProfit', meta: { title: '加气站利润', noCache: false } },
      { path: '/marketingManager', name: 'marketingManager', meta: { title: '营销合作经理配置', noCache: false } },
      { path: '/marketSourceConfig', name: 'marketSourceConfig', meta: { title: '液源地配置', noCache: false } }
    ]
  }, {
    path: '/order',
    name: 'order',
    meta: { title: '订单中心', icon: 'icon-jiesuanguanli', class: 'em-iconfont', noCache: false },
    children: [
      { path: '/orderIndex', name: 'orderIndex', meta: { title: '加气订单', noCache: false } },
      { path: '/orderFiller', name: 'orderFiller', meta: { title: '加气站结算订单', noCache: false } },
      { path: '/orderCarrier', name: 'orderCarrier', meta: { title: '物流公司结算订单', noCache: false } },
      { path: '/orderBusiness', name: 'orderBusiness', meta: { title: '象群科技结算订单', noCache: false } },
      { path: '/orderDownload', name: 'orderDownload', meta: { title: '下载中心', noCache: false } }
    ]
  }, {
    path: '/setting',
    name: 'setting',
    meta: { title: '系统设置', icon: 'el-icon-setting', noCache: false },
    children: [
      { path: '/withdraw', name: 'withdraw', meta: { title: '账户余额限定', noCache: false } },
      { path: '/index', name: 'index', hidden: true, meta: { title: '暂不使用', noCache: false } }
    ]
  }, {
    path: '/customer',
    name: 'customer',
    meta: { title: '客服中心', icon: 'el-icon-service', noCache: false },
    children: [
      { path: '/customerIndex', name: 'customerIndex', meta: { title: 'QA发布管理', noCache: false } },
      { path: '/customerType', name: 'customerType', meta: { title: 'QA分类管理', noCache: false } }
    ]
  }, {
    path: '/message',
    name: 'message',
    meta: { title: '消息中心', icon: 'el-icon-chat-line-round', noCache: false },
    children: [
      { path: '/msgCenter', name: 'msgCenter', meta: { title: '消息中心', noCache: false } },
      { path: '/index', name: 'index', hidden: true, meta: { title: '暂不使用', noCache: false } }
    ]
  }, {
    path: '/authority',
    name: 'authority',
    meta: { title: '权限管理', icon: 'el-icon-setting', noCache: false },
    children: [
      { path: '/authMenu', name: 'authMenu', meta: { title: '菜单', noCache: false } },
      { path: '/authButton', name: 'authButton', meta: { title: '按钮', noCache: false } },
      { path: '/authRole', name: 'authRole', meta: { title: '角色', noCache: false } },
      { path: '/authUser', name: 'authUser', meta: { title: '用户', noCache: false } }
    ]
  }]
}
