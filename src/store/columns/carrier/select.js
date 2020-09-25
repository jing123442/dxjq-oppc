import { utilsStatus, utilsAuthStatus, utilsDyOrgList, utilsAutoAccount, utilsAccountType, utilsOrderStatus, utilsDriverList } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  logistics: {
    orgId: utilsDyOrgList(),
    status: utilsStatus(),
    authStatus: utilsAuthStatus(),
    cascaderAddress: regionData
  },
  firmAccount: {
    orgId: utilsDyOrgList(),
    autoAccount: utilsAutoAccount()
  },
  vehicle: {
    orgId: utilsDyOrgList(),
    status: utilsStatus(),
    driverList: utilsDriverList()
  },
  truckAccount: {},
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
