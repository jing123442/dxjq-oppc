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
      },
      {
        path: 'index',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'index',
        hidden: true,
        meta: { title: '平台公司', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'auth', component: inImport('business/sub/auth'), name: 'auth', meta: { title: '企业信息', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'lisence', component: inImport('business/sub/lisence'), name: 'lisence', meta: { title: '企业营业执照认证', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'idcard', component: inImport('business/sub/idcard'), name: 'idcard', meta: { title: '法人身份证认证', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
