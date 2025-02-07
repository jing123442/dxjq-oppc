import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/pointsMall',
    name: 'pointsMall',
    component: Layout,
    redirect: '/pointsMall/pointsManage',
    meta: { title: '积分商城' },
    children: [
      { path: 'pointsManage', component: inImport('pointsMall/pointsManage'), name: 'pointsManage', meta: { title: '积分管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'pointsAccount', component: inImport('pointsMall/pointsAccount'), name: 'pointsAccount', meta: { title: '积分账户', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'pointsAccount',
        name: 'subPointsAccount',
        hidden: true,
        redirect: '/pointsMall/pointsAccount',
        component: {
          render (c) { return c('router-view') }
        },
        meta: { title: '积分账户', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'pointsAccountLog', component: inImport('pointsMall/pointsAccountLog'), name: 'pointsAccountLog', meta: { title: '积分明细', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      { path: 'supplierManage', component: inImport('pointsMall/supplierManage'), name: 'supplierManage', meta: { title: '供应商管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'orderManage', component: inImport('pointsMall/orderManage'), name: 'orderManage', meta: { title: '订单管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'goodsCategory', component: inImport('pointsMall/goodsCategory'), name: 'goodsCategory', meta: { title: '商品分类管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'goods', component: inImport('pointsMall/goods'), name: 'goods', meta: { title: '商品管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'inviteRecords', component: inImport('pointsMall/inviteRecords'), name: 'inviteRecords', meta: { title: '邀请记录', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
