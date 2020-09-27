import { utilsStatus, utilsTruckType, utilsAutoAccountType, utilsAuthStatus, utilsDyOrgList, utilsAutoAccount, utilsAccountType, utilsOrderStatus, utilsDriverList, utilsIdentityType } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  logistics: {
    orgId: utilsDyOrgList(2),
    status: utilsStatus(),
    authStatus: utilsAuthStatus(),
    cascaderAddress: regionData,
    truckType: utilsTruckType(),
    autoAccount: utilsAutoAccountType(),
    identityType: utilsIdentityType()
  },
  firmAccount: {
    orgId: utilsDyOrgList(2),
    autoAccount: utilsAutoAccount()
  },
  vehicle: {
    orgId: utilsDyOrgList(2),
    status: utilsStatus(),
    truckType: utilsTruckType(),
    autoAccount: utilsAutoAccountType(),
    driverList: utilsDriverList()
  },
  truckAccount: {
    type: [
      { value: 1, label: '加气' },
      { value: 2, label: '圈入/充值' },
      { value: 3, label: '圈出' }
    ]
  },
  rechargeRecord: {
    utilsCheck: [
      { value: 1, label: '待支付' },
      { value: 2, label: '已支付' },
      { value: 3, label: '取消' }
    ],
    rechargeType: [
      { value: 0, label: '线下支付' },
      { value: 1, label: '微信支付' },
      { value: 2, label: '支付宝支付' },
      { value: 3, label: '网关支付' }
    ]
  },
  inventoryManager: {
    utilsAccountType: utilsAccountType()
  },
  orderManager: {
    orderStatus: utilsOrderStatus()
  }
}

export default select
