import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '用户管理' },
    children: [
      { path: 'index', component: _import('user/index'), name: 'home', meta: { title: '平台用户管理', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
