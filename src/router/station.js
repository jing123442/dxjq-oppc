import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/station',
    name: 'station',
    component: Layout,
    redirect: '/station/stationIndex',
    meta: { title: '智慧单站' },
    children: [
      { path: 'stationIndex', component: inImport('station/index'), name: 'stationIndex', meta: { title: '加气站概况', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'stationControl', component: inImport('station/control'), name: 'stationControl', meta: { title: '气价监控', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'stationProfit', component: inImport('station/profit'), name: 'stationProfit', meta: { title: '盘盈亏管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'stationMonitor', component: inImport('station/monitor'), name: 'stationMonitor', meta: { title: '设备监控', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'stationSite', component: inImport('station/site'), name: 'stationSite', meta: { title: '现场监控', noCache: false } },
      {
        path: 'wisdomIndex',
        redirect: '/station/wisdomIndex',
        hide: true,
        component: {
          render (c) { return c('router-view') }
        },
        name: 'wisdomIndex',
        meta: { title: '智慧数据', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'stationWisdom', component: inImport('station/wisdom'), name: 'stationWisdom', meta: { title: '消费趋势', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'stationStock', component: inImport('station/stock'), name: 'stationStock', meta: { title: '动态库存', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'stationOrderIndex',
        name: 'stationOrderIndex',
        redirect: '/station/stationOrderIndex',
        component: {
          render (c) { return c('router-view') }
        },
        meta: { title: '订单管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'stationOrder', component: inImport('station/order'), name: 'stationOrder', meta: { title: '加气订单', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'stationRecharge', component: inImport('station/recharge'), name: 'stationRecharge', meta: { title: '充值订单', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
