import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/setting',
    name: 'setting',
    component: Layout,
    redirect: '/setting/withdraw',
    meta: { title: '系统设置' },
    children: [
      { path: 'withdraw', component: inImport('setting/withdraw'), name: 'withdraw', meta: { title: '账户余额限定', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
