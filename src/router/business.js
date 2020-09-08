import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/business',
    name: 'business',
    component: Layout,
    redirect: '/business/index',
    meta: { title: '平台公司管理' },
    children: [
      { path: 'index', component: _import('business/index'), name: 'business', meta: { title: '平台公司', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'account', component: _import('business/account'), name: 'account', meta: { title: '资金账户管理', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'account',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'account',
        hidden: true,
        meta: { title: '平台公司管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'accountList', component: _import('business/sub/accountList'), name: 'accountList', meta: { title: '账户流水', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
