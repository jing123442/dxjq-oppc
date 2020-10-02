import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '用户管理' },
    children: [
      { path: 'index', component: inImport('user/index'), name: 'user', meta: { title: '平台用户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'carrier', component: inImport('user/carrier'), name: 'carrier', meta: { title: '物流用户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'cashier', component: inImport('user/cashier'), name: 'cashier', meta: { title: '加气站用户管理', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
