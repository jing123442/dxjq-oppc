import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/settlement',
    name: 'settlement',
    component: Layout,
    redirect: '/settlement/settIndex',
    meta: { title: '结算中心' },
    children: [
      { path: 'orderDay', component: inImport('settlement/day'), name: 'orderDay', meta: { title: '日结算订单', noCache: false } },
      { path: 'orderFiller', component: inImport('settlement/filler'), name: 'orderFiller', meta: { title: '加气站结算订单', noCache: false } },
      { path: 'orderCarrier', component: inImport('settlement/carrier'), name: 'orderCarrier', meta: { title: '物流公司结算订单', noCache: false } },
      { path: 'orderBusiness', component: inImport('settlement/business'), name: 'orderBusiness', meta: { title: '象群科技结算订单', noCache: false } },
      { path: 'invoiceDs', component: inImport('settlement/invoiceDs'), name: 'invoiceDs', meta: { title: '直销加气开票管理', noCache: false } },
      { path: 'directWithdApply', component: inImport('settlement/directWithdApply'), name: 'directWithdApply', meta: { title: '直销加气站提现申请', noCache: false } },
      {
        path: 'orderFiller',
        name: 'orderSubFiller',
        redirect: '/settlement/orderFiller',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '加气站结算订单', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'fillerDetailList', component: inImport('settlement/sub/detailList'), name: 'fillerDetailList', meta: { title: '结算明细', noCache: false } },
          { path: 'fillerWithdrawList', component: inImport('settlement/sub/withdrawList'), name: 'fillerWithdrawList', meta: { title: '提现明细', noCache: false } },
          { path: 'fillerStockDetail', component: inImport('settlement/sub/stockDetail'), name: 'fillerStockDetail', meta: { title: '入库明细', noCache: false } },
          { path: 'fillerDownList', component: inImport('settlement/sub/download'), name: 'fillerDownList', meta: { title: '下载', noCache: false } }
        ]
      },
      {
        path: 'orderCarrier',
        name: 'orderSubCarrier',
        redirect: '/settlement/orderCarrier',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '物流公司结算订单', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'carrierRechargeList', component: inImport('settlement/sub/rechargeList'), name: 'carrierRechargeList', meta: { title: '充值对账', noCache: false } },
          { path: 'carrierSettlementList', component: inImport('settlement/sub/settlementList'), name: 'carrierSettlementList', meta: { title: '结算订单', noCache: false } },
          { path: 'carrierTruckList', component: inImport('settlement/sub/truckList'), name: 'carrierTruckList', meta: { title: '卡车汇总', noCache: false } },
          {
            path: 'carrierTruckList',
            redirect: '/order/orderCarrier/carrierTruckList',
            component: {
              render (c) { return c('router-view') }
            },
            hidden: true,
            meta: { title: '卡车汇总', icon: 'icon-gongnengguanli', noCache: false },
            children: [
              { path: 'carrierTruckOrderList', component: inImport('settlement/sub/truckOrderList'), name: 'carrierTruckOrderList', meta: { title: '卡车加气对账单', icon: 'icon-gongnengguanli', noCache: false } }
            ]
          },
          {
            path: 'carrierSettlementList',
            redirect: '/settlement/orderCarrier/carrierSettlementList',
            component: {
              render (c) { return c('router-view') }
            },
            hidden: true,
            meta: { title: '结算订单', icon: 'icon-gongnengguanli', noCache: false },
            children: [
              { path: 'carrierSettlementOrderList', component: inImport('settlement/sub/settlementOrderList'), name: 'carrierSettlementOrderList', meta: { title: '结算明细', icon: 'icon-gongnengguanli', noCache: false } }
            ]
          }
        ]
      }
    ]
  }
]
