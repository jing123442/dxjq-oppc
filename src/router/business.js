import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/business',
    name: 'business',
    component: Layout,
    redirect: '/business/index',
    meta: { title: '平台公司管理' },
    children: [
      { path: 'index', component: inImport('business/index'), name: 'business', meta: { title: '平台公司', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'account', component: inImport('business/account'), name: 'account', meta: { title: '公司资金账户', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'account',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'account',
        hidden: true,
        meta: { title: '公司资金账户', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'accountList', component: inImport('business/sub/accountList'), name: 'accountList', meta: { title: '流水列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
