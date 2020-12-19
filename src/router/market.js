import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/market',
    name: 'market',
    component: Layout,
    redirect: '/market/marketIndex',
    meta: { title: '营销管理' },
    children: [
      { path: 'marketIndex', component: inImport('market/index'), name: 'marketIndex', meta: { title: '专项优惠配置', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'marketCost', component: inImport('market/cost'), name: 'marketCost', meta: { title: '长城奥扬费用', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'marketProfit', component: inImport('market/profit'), name: 'marketProfit', meta: { title: '加气站利润', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'marketingManager', component: inImport('market/marketingManager'), name: 'marketingManager', meta: { title: '营销合作经理配置', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'marketSourceConfig', component: inImport('market/sourceConfig'), name: 'marketSourceConfig', meta: { title: '液源地配置', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
