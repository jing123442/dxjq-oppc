import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/userIndex',
    meta: { title: '用户管理' },
    children: [
      { path: 'userIntention', component: inImport('user/intention'), name: 'userIntention', meta: { title: '无身份用户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'userIndex', component: inImport('user/index'), name: 'userIndex', meta: { title: '平台用户管理', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
