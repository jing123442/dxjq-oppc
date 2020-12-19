import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/settlement',
    name: 'settlement',
    component: Layout,
    redirect: '/settlement/settIndex',
    meta: { title: '结算管理' },
    children: [
      { path: 'settIndex', component: inImport('settlement/index'), name: 'settIndex', meta: { title: '加气站服务汇总', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'logisticsSettlement', component: inImport('settlement/logisticsSettlement'), name: 'logisticsSettlement', meta: { title: '物流公司加气费汇总', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'settIndex',
        name: 'subSettIndex',
        redirect: '/settlement/settIndex',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '加气站服务费汇总', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'orderList', component: inImport('settlement/sub/orderList'), name: 'orderList', meta: { title: '加气站对账单', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'logisticsSettlement',
        name: 'subLogisticsSettlement',
        redirect: '/settlement/logisticsSettlement',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '物流公司加气费汇总', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'rechargeList', component: inImport('settlement/sub/rechargeList'), name: 'rechargeList', meta: { title: '物流公司充值账单', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'gasOrderList', component: inImport('settlement/sub/gasOrderList'), name: 'gasOrderList', meta: { title: '物流公司加气账单', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'truckList', component: inImport('settlement/sub/truckList'), name: 'truckList', meta: { title: '物流公司卡车汇总', icon: 'icon-gongnengguanli', noCache: false } },
          {
            path: 'truckList',
            component: {
              render (c) { return c('router-view') }
            },
            hidden: true,
            meta: { title: '卡车列表', icon: 'icon-gongnengguanli', noCache: false },
            children: [
              { path: 'truckOrderList', component: inImport('settlement/sub/truckOrderList'), name: 'truckOrderList', meta: { title: '卡车对账单', icon: 'icon-gongnengguanli', noCache: false } }
            ]
          }
        ]
      }
    ]
  }
]
