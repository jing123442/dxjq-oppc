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
      { path: 'orderFiller', component: inImport('order/filler'), name: 'orderFiller', meta: { title: '加气站结算订单', noCache: false } },
      { path: 'orderCarrier', component: inImport('order/carrier'), name: 'orderCarrier', meta: { title: '物流公司结算订单', noCache: false } },
      { path: 'orderBusiness', component: inImport('order/business'), name: 'orderBusiness', meta: { title: '象群科技结算订单', noCache: false } }
    ]
  }
]
