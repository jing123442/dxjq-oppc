export default [
  {
    path: '/driver',
    name: 'driver',
    meta: { title: '司机端' },
    component: () => import('@/views/driver')
  }, {
    path: '/driverUser',
    name: 'driverUser',
    meta: { title: '个人信息' },
    component: () => import('@/views/driver/user')
  }, {
    path: '/driverTruck',
    name: 'driverTruck',
    meta: { title: '车辆信息' },
    component: () => import('@/views/driver/truck')
  }, {
    path: '/driverPayHistory',
    name: 'driverPayHistory',
    meta: { title: '交易记录' },
    component: () => import('@/views/driver/history')
  }, {
    path: '/perpayOrder',
    name: 'perpayOrder',
    meta: { title: '待支付' },
    component: () => import('@/views/driver/perpay')
  }, {
    path: '/createOrder',
    name: 'createOrder',
    meta: { title: '创建订单' },
    component: () => import('@/views/driver/order')
  }
]
