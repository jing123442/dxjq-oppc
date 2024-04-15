import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/cockpit',
    name: 'cockpit',
    component: Layout,
    redirect: '/cockpit/cockpitIndex',
    meta: { title: '数据中心' },
    children: [
      { path: 'cockpitIndex', component: inImport('cockpit/index'), name: 'cockpitIndex', meta: { title: '数据驾驶舱', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cockpitBattle', component: inImport('cockpit/battle'), name: 'cockpitBattle', meta: { title: '作战地图', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cockpitSales', component: inImport('cockpit/sales'), name: 'cockpitSales', meta: { title: '加气站运营管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cockpitControl', component: inImport('cockpit/control'), name: 'cockpitControl', meta: { title: '加气站运营监控', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cockpitTrend', component: inImport('cockpit/trend'), name: 'cockpitTrend', meta: { title: '销售趋势', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cockpitSinopec', component: inImport('cockpit/sinopec'), name: 'cockpitSinopec', meta: { title: '数据驾驶舱1.2', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cockpitMarkting', component: inImport('cockpit/markting'), name: 'cockpitMarkting', meta: { title: '新营销毛利核算', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cockpitBalance', component: inImport('cockpit/balance'), name: 'cockpitBalance', meta: { title: '物流余额监控', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'cockpitDync',
        name: 'subCockpitDync',
        redirect: '/cockpit/cockpitIndex',
        component: {
          render (c) { return c('router-view') }
        },
        meta: { title: '动态库存', noCache: false },
        children: [
          { path: 'cockpitDyncIndex', component: inImport('cockpit/dync/index'), name: 'cockpitDyncIndex', meta: { title: '动态库存监控', noCache: false } },
          { path: 'cockpitDyncStevedor', component: inImport('cockpit/dync/stevedor'), name: 'cockpitDyncStevedor', meta: { title: '装卸数据管理', noCache: false } },
          { path: 'cockpitDyncEntrain', component: inImport('cockpit/dync/entrain'), name: 'cockpitDyncEntrain', meta: { title: '加气数据管理', noCache: false } },
          { path: 'cockpitDyncLoss', component: inImport('cockpit/dync/loss'), name: 'cockpitDyncLoss', meta: { title: '盘盈亏管理', noCache: false } },
          { path: 'cockpitDyncRefuelCard', component: inImport('cockpit/dync/card'), name: 'cockpitDyncRefuelCard', meta: { title: '加注机线下卡管理', noCache: false } },
          { path: 'cockpitDyncRefuel', component: inImport('cockpit/dync/refuel'), name: 'cockpitDyncRefuel', meta: { title: '加注机标准价监控', noCache: false } },
          { path: 'cockpitDyncGass', component: inImport('cockpit/dync/gass'), name: 'cockpitDyncGass', meta: { title: '加气站交班管理', noCache: false } }
        ]
      }
    ]
  }
]
