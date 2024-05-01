import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/checkup',
    name: 'checkup',
    component: Layout,
    redirect: '/checkup/checkOrder',
    meta: { title: '气瓶检测管理' },
    children: [
      { path: 'checkOrder', component: inImport('checkup/order'), name: 'checkOrder', meta: { title: '检测订单', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
