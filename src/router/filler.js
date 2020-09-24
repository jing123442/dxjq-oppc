import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/filler',
    name: 'filler',
    component: Layout,
    redirect: '/filler/index',
    meta: { title: '加气站管理' },
    children: [
      { path: 'index', component: _import('filler/index'), name: 'index', meta: { title: '加气站列表', icon: 'icon', noCache: false } },
      { path: 'fillerInfo', component: _import('filler/fillerInfo'), name: 'fillerInfo', meta: { title: '加气站信息维护', icon: 'icon-', noCache: false } },
      { path: 'fillerAccount', component: _import('filler/account'), name: 'fillerAccount', meta: { title: '加气站资金账户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'fillerPrice', component: _import('filler/price'), name: 'fillerPrice', meta: { title: '加气站挂牌价查询', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'gasStockList', component: _import('filler/gasStockList'), name: 'gasStockList', meta: { title: '加气站库存管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'lngPlan', component: _import('filler/lngPlan'), name: 'lngPlan', meta: { title: 'LNG计划管理', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'fillerInfo',
        component: { render (c) { return c('router-view') } },
        name: 'fillerInfo',
        hidden: true,
        meta: { title: '加气站列表', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'printerList', component: _import('filler/sub/printerList'), name: 'printerList', meta: { title: '打印机列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'fillerAccount',
        component: { render (c) { return c('router-view') } },
        name: 'fillerAccount',
        hidden: true,
        meta: { title: '加气站资金账户管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'accountList', component: _import('filler/sub/accountList'), name: 'accountList', meta: { title: '流水列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'fillerPrice',
        component: { render (c) { return c('router-view') } },
        name: 'lngServiceFeeSetting',
        hidden: true,
        meta: { title: '加气站挂牌价查询', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'serviceChangeRecord', component: _import('filler/sub/serviceChangeRecord'), name: 'serviceChangeRecord', meta: { title: '服务费变更记录', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
