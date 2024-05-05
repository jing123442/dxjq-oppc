import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/price',
    name: 'price',
    component: Layout,
    redirect: '/price/priceIndex',
    meta: { title: '定价管理' },
    children: [
      { path: 'priceRelease', component: inImport('price/release'), name: 'priceRelease', meta: { title: '发布审核', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'marketIndex', component: inImport('price/special'), name: 'marketIndex', meta: { title: '专项优惠配置', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'marktingPrice', component: inImport('price/index'), name: 'marktingPrice', meta: { title: '新营销定价', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'priceIndex', component: inImport('price/index'), name: 'priceIndex', meta: { title: '挂牌价管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'snpLimitPrice', component: inImport('price/index'), name: 'snpLimit', meta: { title: '中石化限价', noCache: false } },
      { path: 'marketCost', component: inImport('price/cost'), name: 'marketCost', meta: { title: '平台费用', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'discountsCarrier', component: inImport('price/discountsCarrier'), name: 'discountsCarrier', meta: { title: '物流公司专享优惠', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'direct', component: inImport('price/sub/direct'), name: 'direct', meta: { title: '直销加气站1站1客1价', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'discountsCarrier',
        redirect: '/price/discountsCarrier',
        hide: true,
        component: {
          render (c) { return c('router-view') }
        },
        name: 'discountsCarrier',
        meta: { title: '物流公司专享优惠', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'rebateConfig', component: inImport('price/rebateConfig'), name: 'rebateConfig', meta: { title: '物流公司优惠配置', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'rebateConfigRecords', component: inImport('price/rebateConfigRecords'), name: 'rebateConfigRecords', meta: { title: '优惠配置记录', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'rebateOrder', component: inImport('price/rebateOrder'), name: 'rebateOrder', meta: { title: '优惠订单详情', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'priceIndex',
        name: 'subPriceIndex',
        redirect: '/price/priceIndex',
        component: {
          render (c) { return c('router-view') }
        },
        meta: { title: '挂牌价管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'listing', component: inImport('price/sub/listing'), name: 'listing', meta: { title: '平台挂牌价', icon: 'icon-gongnengguanli', noCache: false } },
          // { path: 'direct', component: inImport('price/sub/direct'), name: 'direct', meta: { title: '直销加气站1站1客1价', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'listingQuery', component: inImport('price/sub/listingQuery'), name: 'listingQuery', meta: { title: '平台挂牌价查询', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'departure', component: inImport('price/sub/departure'), name: 'departure', meta: { title: 'LNG出港价', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'preferential', component: inImport('price/sub/preferential'), name: 'preferential', meta: { title: '区域优惠政策', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'estimate', component: inImport('price/sub/estimate'), name: 'estimate', meta: { title: '运费测算', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'freight', component: inImport('price/sub/freight'), name: 'freight', meta: { title: '运费单价', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'measure', component: inImport('price/sub/measure'), name: 'measure', meta: { title: '气价调节', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'mileage', component: inImport('price/sub/mileage'), name: 'mileage', meta: { title: '加气站里程', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'marketProfit', component: inImport('price/sub/profit'), name: 'marketProfit', meta: { title: '加气站利润', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'snpLimitPrice',
        name: 'snpLimitPrice',
        redirect: '/price/snpLimitPrice',
        component: {
          render (c) { return c('router-view') }
        },
        meta: { title: '中石化限价', noCache: false },
        children: [
          { path: 'snpRetail', component: inImport('price/snp/components/snpRetail/newTableList'), name: 'snpRetail', meta: { title: '中石化零售价', noCache: false } },
          { path: 'auyanRetail', component: inImport('price/snp/auyanRetail'), name: 'auyanRetail', meta: { title: '长城奥扬零售价', noCache: false } }
        ]
      },
      {
        path: 'marktingPrice',
        name: 'marktingPrice',
        redirect: '/price/marktingPrice',
        component: {
          render (c) { return c('router-view') }
        },
        meta: { title: '新营销定价', noCache: false },
        children: [
          { path: 'standardPrice', component: inImport('price/marktingPrice/standardPrice'), name: 'standardPrice', meta: { title: '标准定价', noCache: false } },
          { path: 'gasStationSalePrice', component: inImport('price/marktingPrice/gasStationSalePrice'), name: 'gasStationSalePrice', meta: { title: '加气站售卖价', noCache: false } },
          { path: 'diffStanderPrice', component: inImport('price/marktingPrice/diffStanderPrice'), name: 'gasStationSalePrice', meta: { title: '标准差价', noCache: false } },
          { path: 'diffPrice', component: inImport('price/marktingPrice/diffPrice'), name: 'diffPrice', meta: { title: '物流非标差价', noCache: false } }
        ]
      }
    ]
  }
]
