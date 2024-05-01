import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/filler',
    name: 'filler',
    component: Layout,
    redirect: '/filler/fillerIndex',
    meta: { title: '加气站管理' },
    children: [
      { path: 'fillerIndex', component: inImport('filler/index'), name: 'fillerIndex', meta: { title: '加气站企业资料', icon: 'icon', noCache: false } },
      { path: 'fillerInfo', component: inImport('filler/fillerInfo'), name: 'fillerInfo', meta: { title: '加气站经营信息', icon: 'icon-', noCache: false } },
      { path: 'fillerAuth', component: inImport('filler/fillerAuth'), name: 'fillerAuth', meta: { title: '待审核加气站', icon: 'icon-', noCache: false } },
      { path: 'fillerAccount', component: inImport('filler/account'), name: 'fillerAccount', meta: { title: '加气站资金账户', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'fillerPrice', component: inImport('filler/price'), name: 'fillerPrice', meta: { title: '加气站挂牌价查询', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'userCashier', component: inImport('filler/user'), name: 'userCashier', meta: { title: '账号管理', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'fillerInfo',
        name: 'subFillerInfo',
        redirect: '/filler/fillerInfo',
        component: { render (c) { return c('router-view') } },
        hidden: true,
        meta: { title: '加气站信息维护', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'printerList', component: inImport('filler/sub/printerList'), name: 'printerList', meta: { title: '小票机列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'fillerAccount',
        name: 'subFillerAccount',
        redirect: '/filler/fillerAccount',
        component: { render (c) { return c('router-view') } },
        hidden: true,
        meta: { title: '加气站资金账户管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'accountList', component: inImport('filler/sub/accountList'), name: 'accountFillerList', meta: { title: '流水列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'fillerPrice',
        name: 'subFillerPrice',
        redirect: '/filler/fillerPrice',
        component: { render (c) { return c('router-view') } },
        hidden: true,
        meta: { title: '加气站挂牌价查询', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'serviceChangeRecord', component: inImport('filler/sub/serviceChangeRecord'), name: 'serviceChangeRecord', meta: { title: '服务费变更记录', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
