import Layout from '@/views/layout/Layout'
const _import = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/settlement',
    name: 'settlement',
    component: Layout,
    redirect: '/settlement/index',
    meta: { title: '结算管理' },
    children: [
      { path: 'index', component: _import('settlement/index'), name: 'index', meta: { title: '加气站服务汇总', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'logisticsSettlement', component: _import('settlement/logisticsSettlement'), name: 'logisticsSettlement', meta: { title: '物流公司加气费汇总', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'index',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'index',
        hidden: true,
        meta: { title: '加气站服务费汇总', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'orderList', component: _import('settlement/sub/orderList'), name: 'orderList', meta: { title: '加气站对账单', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'logisticsSettlement',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'logisticsSettlement',
        hidden: true,
        meta: { title: '加气站服务费汇总', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'rechargeList', component: _import('settlement/sub/rechargeList'), name: 'rechargeList', meta: { title: '物流公司充值账单', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'gasOrderList', component: _import('settlement/sub/gasOrderList'), name: 'gasOrderList', meta: { title: '物流公司加气账单', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'truckList', component: _import('settlement/sub/truckList'), name: 'truckList', meta: { title: '物流公司卡车汇总', icon: 'icon-gongnengguanli', noCache: false } },
          {
            path: 'truckList',
            component: {
              render (c) { return c('router-view') }
            },
            name: 'truckList',
            hidden: true,
            meta: { title: '卡车列表', icon: 'icon-gongnengguanli', noCache: false },
            children: [
              { path: 'truckOrderList', component: _import('settlement/sub/truckOrderList'), name: 'truckOrderList', meta: { title: '卡车对账单', icon: 'icon-gongnengguanli', noCache: false } }
            ]
          }
        ]
      }
    ]
  }
]
