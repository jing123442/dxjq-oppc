import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/cockpit',
    name: 'cockpit',
    component: Layout,
    meta: { title: '' },
    children: [
      { path: 'index', component: inImport('cockpit/index'), name: 'cockpitIndex', meta: { title: '数据驾驶舱', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
