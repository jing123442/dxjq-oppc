export default [
  {
    path: '/carrier',
    name: 'carrier',
    meta: { title: '大象加气' },
    component: () => import('@/views/carrier')
  }, {
    path: '/carrierUser',
    name: 'carrierUser',
    meta: { title: '个人信息' },
    component: () => import('@/views/carrier/user')
  }, {
    path: '/carrierOrder',
    name: 'carrierOrder',
    meta: { title: '加气订单' },
    component: () => import('@/views/carrier/order')
  }, {
    path: '/carrierBind',
    name: 'carrierBind',
    meta: { title: '绑定管理' },
    component: () => import('@/views/carrier/bind')
  }, {
    path: '/carrierInventory',
    name: 'carrierInventory',
    meta: { title: '圈存管理' },
    component: () => import('@/views/carrier/inventory/index')
  }, {
    path: '/inventoryList',
    name: 'inventoryList',
    meta: { title: '圈存记录' },
    component: () => import('@/views/carrier/inventory/list')
  }, {
    path: '/carrierTruck',
    name: 'carrierTruck',
    meta: { title: '卡车对账单' },
    component: () => import('@/views/carrier/truck')
  }, {
    path: '/carrierAccount',
    name: 'carrierAccount',
    meta: { title: '资金账户' },
    component: () => import('@/views/carrier/account/index')
  }, {
    path: '/carrierAccList',
    name: 'carrierAccList',
    meta: { title: '账单' },
    component: () => import('@/views/carrier/account/list')
  }, {
    path: '/carrierAccTruck',
    name: 'carrierAccTruck',
    meta: { title: '资金账户' },
    component: () => import('@/views/carrier/account/truck')
  }
]
