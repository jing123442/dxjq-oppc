import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/authority',
    name: 'authority',
    component: Layout,
    redirect: '/authority/menu',
    meta: { title: '权限管理' },
    children: [
      { path: 'authMenu', component: inImport('authority/menu'), name: 'authMenu', meta: { title: '菜单列表', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'authRole', component: inImport('authority/role'), name: 'authRole', meta: { title: '角色列表', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'authButton', component: inImport('authority/button'), name: 'authButton', meta: { title: '菜单-按钮', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'authUser', component: inImport('authority/user'), name: 'authUser', meta: { title: '平台用户列表', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
