import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/order',
    name: 'order',
    component: Layout,
    redirect: '/order/index',
    meta: { title: '订单中心' },
    children: [
      { path: 'orderIndex', component: inImport('order/index'), name: 'orderIndex', meta: { title: '加气订单', noCache: false } },
      { path: 'rechargeRecord', component: inImport('order/rechargeRecord'), name: 'rechargeRecord', meta: { title: '充值记录', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
