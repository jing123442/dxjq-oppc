import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/message',
    name: 'message',
    component: Layout,
    redirect: '/message/msgCenter',
    meta: { title: '消息中心' },
    children: [
      { path: 'msgCenter', component: inImport('message/msgCenter'), name: 'msgCenter', meta: { title: '消息中心', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
