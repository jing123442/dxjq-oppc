import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/voucher',
    name: 'voucher',
    component: Layout,
    redirect: '/voucher/voucherIndex',
    meta: { title: '资金流水' },
    children: [
      { path: 'voucherIndex', component: inImport('voucher/index'), name: 'voucherIndex', meta: { title: '流水查询', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'voucherDownload', component: inImport('voucher/download'), name: 'voucherDownload', meta: { title: '申请记录', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
