export default [
  {
    path: '/cashier',
    name: 'cashier',
    meta: { title: '收银员端' },
    component: () => import('@/views/cashier')
  }, {
    path: '/cashierUser',
    name: 'cashierUser',
    meta: { title: '个人信息' },
    component: () => import('@/views/cashier/user')
  }, {
    path: '/cashierOrderList',
    name: 'cashierOrderList',
    meta: { title: '交易记录' },
    component: () => import('@/views/cashier/order')
  }, {
    path: '/cashierCode',
    name: 'cashierCode',
    meta: { title: '二维码' },
    component: () => import('@/views/cashier/qrcode')
  }, {
    path: '/cashierScan',
    name: 'cashierScan',
    meta: { title: '扫码结算' },
    component: () => import('@/views/cashier/scan')
  }, {
    path: '/cashierPerOrder',
    name: 'cashierPerOrder',
    meta: { title: '待收款订单' },
    component: () => import('@/views/cashier/perpay')
  }
]
