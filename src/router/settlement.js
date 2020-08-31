import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

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
      }
    ]
  }
]
