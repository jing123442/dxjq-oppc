import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/carrier',
    name: 'carrier',
    component: Layout,
    redirect: '/carrier/carrierIndex',
    meta: { title: '物流公司管理' },
    children: [
      { path: 'carrierIndex', component: inImport('carrier/index'), name: 'carrierIndex', meta: { title: '物流公司列表', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'carrierAuth', component: inImport('carrier/carrierAuth'), name: 'carrierAuth', meta: { title: '待审核企业', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'logisticsAccountManager', component: inImport('carrier/logisticsAccountManager'), name: 'logisticsAccountManager', meta: { title: '公司资金账户', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'vehicleManager', component: inImport('carrier/vehicleManager'), name: 'vehicleManager', meta: { title: '车辆列表', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'truckAccountManager', component: inImport('carrier/truckAccountManager'), name: 'truckAccountManager', meta: { title: '车辆资金账户', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'truckIntegral', component: inImport('carrier/truckIntegral'), name: 'truckIntegral', meta: { title: '车辆积分账户', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'inventoryManager', component: inImport('carrier/inventoryManager'), name: 'inventoryManager', meta: { title: '圈存管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'transactionOrderManager', component: inImport('carrier/transactionOrderManager'), name: 'transactionOrderManager', meta: { title: '加气订单管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'userCarrier', component: inImport('carrier/user'), name: 'userCarrier', meta: { title: '账号管理', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'logisticsAccountManager',
        name: 'subLogisticsAccountManager',
        redirect: '/carrier/logisticsAccountManager',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '公司资金账户管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'accountList', component: inImport('carrier/sub/accountList'), name: 'accountCarrierList', meta: { title: '流水列表', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'vehicleCircle', component: inImport('carrier/sub/vehicleCircle'), name: 'vehicleCircle', meta: { title: '卡车圈存', icon: 'icon-gongnengguanli', noCache: false } },
          { path: 'accountWarn', component: inImport('carrier/sub/accountWarn'), name: 'accountCarrierWarn', meta: { title: '资金预警', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'truckAccountManager',
        name: 'subTruckAccountManager',
        redirect: '/carrier/truckAccountManager',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '卡车资金账户管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'truckAccountList', component: inImport('carrier/sub/truckAccountList'), name: 'truckAccountList', meta: { title: '流水列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      },
      {
        path: 'truckIntegral',
        name: 'subTruckIntegral',
        redirect: '/carrier/truckIntegral',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '卡车积分账户管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'truckIntegralList', component: inImport('carrier/sub/truckIntegralList'), name: 'truckIntegralList', meta: { title: '流水列表', icon: 'icon-gongnengguanli', noCache: false } }
        ]
      }
    ]
  }
]
