import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/lngTradeMode',
    name: 'lngTradeMode',
    component: Layout,
    redirect: '/lngTradeMode/carrierDsConfig',
    meta: { title: 'LNG交易模式管理' },
    children: [
      { path: 'carrierDsConfig', component: inImport('lngTradeMode/carrierDsConfig'), name: 'carrierDsConfig', meta: { title: '物流客户直销加气配置', icon: '', noCache: false } },
      { path: 'fillerDsConfig', component: inImport('lngTradeMode/fillerDsConfig'), name: 'fillerDsConfig', meta: { title: '加气站直销加气配置', noCache: false } },
      { path: 'carDsConfig', component: inImport('lngTradeMode/carDsConfig'), name: 'carDsConfig', meta: { title: '直销加气车辆配置日志', noCache: false } }
    ]
  }
]
