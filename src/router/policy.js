import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/policy',
    name: 'policy',
    component: Layout,
    redirect: '/policy/index',
    meta: { title: '运营策略管理' },
    children: [
      { path: 'index', component: _import('policy/index'), name: 'index', meta: { title: '物流公司价格配置', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
