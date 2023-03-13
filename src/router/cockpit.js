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
      { path: 'cockpitSales', component: inImport('cockpit/sales'), name: 'cockpitSales', meta: { title: '加气站销量监控', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cockpitSinopec', component: inImport('cockpit/sinopec'), name: 'cockpitSinopec', meta: { title: '数据驾驶舱1.2', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cockpitMarkting', component: inImport('cockpit/markting'), name: 'cockpitMarkting', meta: { title: '新营销毛利核算', icon: 'icon-gongnengguanli', noCache: false } }

    ]
  }
]
