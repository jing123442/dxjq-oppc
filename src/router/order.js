import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/order',
    name: 'order',
    component: Layout,
    redirect: '/order/index',
    meta: { title: '订单中心' },
    children: [
      { path: 'orderIndex', component: inImport('order/index'), name: 'orderIndex', meta: { title: '加气订单列表', noCache: false } },
      { path: 'gasOrderSinopec', component: inImport('order/gasOrderSinopec'), name: 'gasOrderSinopec', meta: { title: '中石化加气订单', noCache: false } },
      { path: 'gasOrderSelf', component: inImport('order/gasOrderSelf'), name: 'gasOrderSelf', meta: { title: '自营站加气机订单', noCache: false } },
      { path: 'gasOrderCarrier', component: inImport('order/gasOrderCarrier'), name: 'gasOrderCarrier', meta: { title: '物流客户加气订单', noCache: false } },
      { path: 'gasOrderFiller', component: inImport('order/gasOrderFiller'), name: 'gasOrderFiller', meta: { title: '加气站加气订单', noCache: false } },
      { path: 'rechargeRecord', component: inImport('order/rechargeRecord'), name: 'rechargeRecord', meta: { title: '充值订单记录', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'gasOrderBuy', component: inImport('order/gasOrderBuy'), name: 'gasOrderBuy', meta: { title: '新营销采购订单', noCache: false } }
    ]
  }
]
