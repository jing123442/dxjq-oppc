import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/customer',
    name: 'customer',
    component: Layout,
    redirect: '/customer/index',
    meta: { title: '客服中心' },
    children: [
      { path: 'customerIndex', component: inImport('customer/index'), name: 'customerIndex', meta: { title: '发布管理', noCache: false } },
      { path: 'customerType', component: inImport('customer/type'), name: 'customerType', meta: { title: '分类管理', noCache: false } }
    ]
  }
]
