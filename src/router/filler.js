import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/filler',
    component: Layout,
    redirect: '/filler/index',
    meta: { title: '加气站管理' },
    children: [
      { path: 'index', component: inImport('filler/index'), name: 'filler', meta: { title: '加气站列表', icon: 'icon', noCache: false } },
      { path: 'fillerInfo', component: inImport('filler/fillerInfo'), name: 'fillerInfo', meta: { title: '加气站信息维护', icon: 'icon-', noCache: false } },
      { path: 'fillerAccount', component: inImport('filler/account'), name: 'fillerAccount', meta: { title: '加气站资金账户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'fillerPrice', component: inImport('filler/price'), name: 'fillerPrice', meta: { title: '加气站挂牌价查询', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'gasStockList', component: inImport('filler/gasStockList'), name: 'gasStockList', meta: { title: '加气站库存管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'lngPlan', component: inImport('filler/lngPlan'), name: 'lngPlan', meta: { title: 'LNG计划管理', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'fillerInfo',
        component: { render (c) { return c('router-view') } },
        hidden: true,
        meta: { title: '加气站列表', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'printerList', component: inImport('filler/sub/printerList'), name: 'printerList', meta: { title: '打印机列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'fillerAccount',
        component: { render (c) { return c('router-view') } },
        hidden: true,
        meta: { title: '加气站资金账户管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'accountList', component: inImport('filler/sub/accountList'), name: 'accountFillerList', meta: { title: '流水列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'fillerPrice',
        component: { render (c) { return c('router-view') } },
        name: 'lngServiceFeeSetting',
        hidden: true,
        meta: { title: '加气站挂牌价查询', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'serviceChangeRecord', component: inImport('filler/sub/serviceChangeRecord'), name: 'serviceChangeRecord', meta: { title: '服务费变更记录', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
