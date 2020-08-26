import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/carrier',
    name: 'carrier',
    component: Layout,
    redirect: '/carrier/index',
    meta: { title: '物流公司管理' },
    children: [
      { path: 'index', component: _import('carrier/index'), name: 'index', meta: { title: '物流公司', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'logisticsAccountManager', component: _import('carrier/logisticsAccountManager'), name: 'logisticsAccountManager', meta: { title: '公司资金账户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'vehicleManager', component: _import('carrier/vehicleManager'), name: 'vehicleManager', meta: { title: '车辆管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'truckAccountManager', component: _import('carrier/truckAccountManager'), name: 'truckAccountManager', meta: { title: '卡车资金账户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'rechargeRecord', component: _import('carrier/rechargeRecord'), name: 'rechargeRecord', meta: { title: '充值记录', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'inventoryManager', component: _import('carrier/inventoryManager'), name: 'inventoryManager', meta: { title: '圈存管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'transactionOrderManager', component: _import('carrier/transactionOrderManager'), name: 'transactionOrderManager', meta: { title: '加气订单管理', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'index',
        component: {
          render (c) { return c('router-view') }
        },
        name: 'index',
        hidden: true,
        meta: { title: '物流公司', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'index1', component: _import('carrier/last/index'), name: 'index1', meta: { title: '物流公司-1', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
