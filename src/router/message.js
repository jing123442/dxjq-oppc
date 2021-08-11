import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/message',
    name: 'message',
    component: Layout,
    redirect: '/message/msgCenter',
    meta: { title: '消息中心' },
    children: [
      { path: 'msgCenter', component: inImport('message/msgCenter'), name: 'msgCenter', meta: { title: '消息管理', icon: '', noCache: false } },
      { path: 'customerIndex', component: inImport('message/index'), name: 'customerIndex', meta: { title: 'QA发布管理', noCache: false } },
      { path: 'customerType', component: inImport('message/type'), name: 'customerType', meta: { title: 'QA分类管理', noCache: false } }
    ]
  }
]
