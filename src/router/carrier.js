import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'prod' ? require('./_product') : require('./_development')

export default [
  {
    path: '/carrier',
    component: Layout,
    redirect: '/carrier/index',
    meta: { title: '物流公司管理' },
    children: [
      { path: 'index', component: inImport('carrier/index'), name: 'carrier', meta: { title: '物流公司', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'logisticsAccountManager', component: inImport('carrier/logisticsAccountManager'), name: 'logisticsAccountManager', meta: { title: '公司资金账户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'vehicleManager', component: inImport('carrier/vehicleManager'), name: 'vehicleManager', meta: { title: '车辆管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'truckAccountManager', component: inImport('carrier/truckAccountManager'), name: 'truckAccountManager', meta: { title: '卡车资金账户管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'rechargeRecord', component: inImport('carrier/rechargeRecord'), name: 'rechargeRecord', meta: { title: '充值记录', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'inventoryManager', component: inImport('carrier/inventoryManager'), name: 'inventoryManager', meta: { title: '圈存管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'transactionOrderManager', component: inImport('carrier/transactionOrderManager'), name: 'transactionOrderManager', meta: { title: '加气订单管理', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'logisticsAccountManager',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '公司资金账户管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'accountList', component: inImport('carrier/sub/accountList'), meta: { title: '流水列表', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'vehicleCircle', component: inImport('carrier/sub/vehicleCircle'), name: 'vehicleCircle', meta: { title: '卡车圈存', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'truckAccountManager',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '车辆资金账户管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'truckAccountList', component: inImport('carrier/sub/truckAccountList'), name: 'truckAccountList', meta: { title: '流水列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
