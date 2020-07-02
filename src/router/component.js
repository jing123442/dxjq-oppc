export default [
  {
    path: '/userMobile',
    name: 'userMobile',
    meta: { title: '绑定手机号' },
    component: () => import('@/components/user/mobile')
  }, {
    path: '/userName',
    name: 'userName',
    meta: { title: '修改登录账号' },
    component: () => import('@/components/user/name')
  }, {
    path: '/userPassword',
    name: 'userPassword',
    meta: { title: '修改密码' },
    component: () => import('@/components/user/password')
  }, {
    path: '/orderDetail',
    name: 'orderDetail',
    meta: { title: '订单详情' },
    component: () => import('@/components/order/detail')
  }, {
    path: '/cashierDetail',
    name: 'cashierDetail',
    meta: { title: '待收款订单详情' },
    component: () => import('@/components/order/cashierDetail')
  }, {
    path: '/bindDriver',
    name: 'bindDriver',
    component: () => import('@/components/order/bindDriver')
  }, {
    path: '/inBulletinBoard',
    name: 'inBulletinBoard',
    meta: { title: '圈存管理' },
    component: () => import('@/components/order/board')
  }, {
    path: '/accountStatement',
    name: 'accountStatement',
    meta: { title: '加气订单' },
    component: () => import('@/components/order/account')
  }
]
