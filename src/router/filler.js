export default [
  {
    path: '/filler',
    name: 'filler',
    meta: { title: '大象加气' },
    component: () => import('@/views/filler')
  }, {
    path: '/fillerUser',
    name: 'fillerUser',
    meta: { title: '个人信息' },
    component: () => import('@/views/filler/user')
  }, {
    path: '/orderList',
    name: 'orderList',
    meta: { title: '交易记录' },
    component: () => import('@/views/filler/order')
  }, {
    path: '/fillerCode',
    name: 'fillerCode',
    meta: { title: '二维码' },
    component: () => import('@/views/filler/qrcode')
  }, {
    path: '/fillerService',
    name: 'fillerService',
    meta: { title: '服务费设置' },
    component: () => import('@/views/filler/service')
  }, {
    path: '/fillerPrice',
    name: 'fillerPrice',
    meta: { title: '气价维护' },
    component: () => import('@/views/filler/price')
  }, {
    path: '/serviceChangeLog',
    name: 'serviceChangeLog',
    meta: { title: '变更记录' },
    component: () => import('@/views/filler/log')
  }
]
