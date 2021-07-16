import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

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
      {
        path: 'fillerGasStockList',
        name: 'fillerGasStockList',
        redirect: '/stock/fillerGasStockList',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '加气站库存管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'planSubmitLimitConfig', component: inImport('stock/sub/planSubmitLimitConfig'), name: 'planSubmitLimitConfig', meta: { title: '配置计划提报限制', noCache: false } }
        ]
      }
    ]
  }
]
