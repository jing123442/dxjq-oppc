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
      { path: 'index', component: _import('filler/index'), name: 'index', meta: { title: '加气站企业列表', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'lngStationsList', component: _import('filler/lngStationsList'), name: 'lngStationsList', meta: { title: '加气站列表', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'lngStationAccountManager', component: _import('filler/lngStationAccountManager'), name: 'lngStationAccountManager', meta: { title: '加气站资金账户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'lngServiceFeeSetting', component: _import('filler/lngServiceFeeSetting'), name: 'lngServiceFeeSetting', meta: { title: '服务费设置', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'lngUpdatePrice', component: _import('filler/lngUpdatePrice'), name: 'lngUpdatePrice', meta: { title: '气价维护', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'lngStationsList',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'lngStationsList',
        hidden: true,
        meta: { title: '加气站列表', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'printerList', component: _import('filler/sub/printerList'), name: 'printerList', meta: { title: '打印机列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'lngStationAccountManager',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'lngStationAccountManager',
        hidden: true,
        meta: { title: '加气站资金账户管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'accountList', component: _import('filler/sub/accountList'), name: 'accountList', meta: { title: '账户流水', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'lngServiceFeeSetting',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'lngServiceFeeSetting',
        hidden: true,
        meta: { title: '服务费设置', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'serviceChangeRecord', component: _import('filler/sub/serviceChangeRecord'), name: 'serviceChangeRecord', meta: { title: '服务费变更记录', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'lngUpdatePrice',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'lngUpdatePrice',
        hidden: true,
        meta: { title: '气价维护', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'lngUpdatePriceRecord', component: _import('filler/sub/lngUpdatePriceRecord'), name: 'lngUpdatePriceRecord', meta: { title: '气价变更记录', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
