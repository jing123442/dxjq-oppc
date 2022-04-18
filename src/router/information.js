import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/information',
    name: 'information',
    component: Layout,
    redirect: '/information/analysis',
    meta: { title: '超能情报管理' },
    children: [
      { path: 'informationAnalysis', component: inImport('information/analysis'), name: 'informationAnalysis', meta: { title: '行业分析', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'informationInformation', component: inImport('information/information'), name: 'informationInformation', meta: { title: '行业资讯', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'informationPolicy', component: inImport('information/policy'), name: 'informationPolicy', meta: { title: '行业政策', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'informationListing', component: inImport('information/listing'), name: 'informationListing', meta: { title: '接收站挂牌价', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'informationFactory', component: inImport('information/factory'), name: 'informationFactory', meta: { title: '液厂出厂价', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'informationReceiv', component: inImport('information/receiv'), name: 'informationReceiv', meta: { title: '接货价', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'informationHaiqi', component: inImport('information/haiqi'), name: 'informationHaiqi', meta: { title: '海气现货价', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'informationGasstion', component: inImport('information/gasstion'), name: 'informationGasstion', meta: { title: '加气站列表', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'informationDiesel', component: inImport('information/diesel'), name: 'informationDiesel', meta: { title: '柴油列表', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'informationItem', component: inImport('information/item'), name: 'informationItem', meta: { title: '指标配置', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
