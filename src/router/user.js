import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/userIndex',
    meta: { title: '用户管理' },
    children: [
      { path: 'userIndex', component: inImport('user/index'), name: 'userIndex', meta: { title: '平台用户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'userCarrier', component: inImport('user/carrier'), name: 'userCarrier', meta: { title: '物流用户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'userCashier', component: inImport('user/cashier'), name: 'userCashier', meta: { title: '加气站用户管理', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
