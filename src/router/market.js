import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/market',
    name: 'market',
    component: Layout,
    redirect: '/market/marketIndex',
    meta: { title: '营销中心' },
    children: [
      { path: 'marketIndex', component: inImport('market/index'), name: 'marketIndex', meta: { title: '购车加气优惠卡', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
