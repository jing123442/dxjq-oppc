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
      { path: 'marketingManager', component: inImport('market/marketingManager'), name: 'marketingManager', meta: { title: '营销合作经理配置', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
