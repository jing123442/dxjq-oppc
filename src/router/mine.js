import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/mine',
    name: 'mine',
    component: Layout,
    redirect: '/mine/mineIndex',
    meta: { title: '个人中心' },
    children: [
      { path: 'mineIndex', component: inImport('mine/index'), name: 'mineIndex', meta: { title: '个人信息', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'mineEditPassword', component: inImport('mine/editPassword'), name: 'mineEditPassword', meta: { title: '修改密码', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
