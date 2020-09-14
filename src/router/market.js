import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/market',
    name: 'market',
    component: Layout,
    redirect: '/market/index',
    meta: { title: '营销管理' },
    children: [
      { path: 'index', component: _import('market/index'), name: 'market', meta: { title: '优惠返利配置', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cost', component: _import('market/cost'), name: 'cost', meta: { title: '长城奥扬费用', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'profit', component: _import('market/profit'), name: 'profit', meta: { title: '加气站利润', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
