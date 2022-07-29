import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/stock',
    name: 'stock',
    component: Layout,
    redirect: '/stock/stockIndex',
    meta: { title: '计划库存管理' },
    children: [
      { path: 'marketSourceConfig', component: inImport('stock/index'), name: 'marketSourceConfig', meta: { title: '液源地配置', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'fillerGasStockList', component: inImport('stock/gasStockList'), name: 'fillerGasStockList', meta: { title: '加气站库存管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'fillerLngPlan', component: inImport('stock/lngPlan'), name: 'fillerLngPlan', meta: { title: 'LNG计划管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'selfFullInventory', component: inImport('stock/selfFullInventory'), name: 'selfFullInventory', meta: { title: '自营站全量库存', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'fillerGasStockList',
        name: 'subFillerGasStockList',
        redirect: '/stock/fillerGasStockList',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '加气站库存管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'planSubmitLimitConfig', component: inImport('stock/sub/planSubmitLimitConfig'), name: 'planSubmitLimitConfig', meta: { title: '配置计划提报限制', noCache: false } },
          { path: 'gasLimitConfig', component: inImport('stock/sub/gasLimitConfig'), name: 'gasLimitConfig', meta: { title: '加气限制变更记录', noCache: false } },
          { path: 'gasLimitDriverDetail', component: inImport('stock/sub/gasLimitDriverDetail'), name: 'gasLimitDriverDetail', meta: { title: '限制加气司机明细', noCache: false } }
        ]
      }
    ]
  }
]
