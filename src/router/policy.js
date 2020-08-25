import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/policy',
    name: 'policy',
    component: Layout,
    redirect: '/policy/index',
    meta: { title: '运营策略管理' },
    children: [
      { path: 'index', component: _import('policy/index'), name: 'index', meta: { title: '物流公司价格配置', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'strategyGasStationList', component: _import('policy/strategyGasStationList'), name: 'strategyGasStationList', meta: { title: '按加气站配置价格', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'priceUpdateLogList', component: _import('policy/priceUpdateLogList'), name: 'priceUpdateLogList', meta: { title: '价格变更记录', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'sourceConfig', component: _import('policy/sourceConfig'), name: 'sourceConfig', meta: { title: '液源地配置', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'gasStockList', component: _import('policy/gasStockList'), name: 'gasStockList', meta: { title: '加气站库存查询', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'lngPlan', component: _import('policy/lngPlan'), name: 'lngPlan', meta: { title: 'LNG计划管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'marketingManager', component: _import('policy/marketingManager'), name: 'marketingManager', meta: { title: '营销合作经理配置', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
