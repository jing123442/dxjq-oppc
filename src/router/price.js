import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/price',
    name: 'price',
    component: Layout,
    redirect: '/price/index',
    meta: { title: '定价管理' },
    children: [
      { path: 'release', component: inImport('price/release'), name: 'release', meta: { title: '发布管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'index', component: inImport('price/index'), name: 'index', meta: { title: '挂牌价管理', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'index',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'index',
        meta: { title: '挂牌价管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'listing', component: inImport('price/sub/listing'), name: 'listing', meta: { title: '平台挂牌价', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'departure', component: inImport('price/sub/departure'), name: 'departure', meta: { title: '长城奥扬出港价', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'preferential', component: inImport('price/sub/preferential'), name: 'preferential', meta: { title: '区域优惠政策', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'estimate', component: inImport('price/sub/estimate'), name: 'estimate', meta: { title: '运费测算', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'freight', component: inImport('price/sub/freight'), name: 'freight', meta: { title: '配置价格', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'mileage', component: inImport('price/sub/mileage'), name: 'mileage', meta: { title: '加气站里程', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
