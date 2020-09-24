import { utilsStatus, utilsAuthStatus, utilsDyOrgList, utilsAutoAccount, utilsCheck, utilsAccountType, utilsOrderStatus, utilsDriverList } from '@/utils/select'
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
    utilsCheck: utilsCheck()
  },
  inventoryManager: {
    utilsAccountType: utilsAccountType()
  },
  orderManager: {
    orderStatus: utilsOrderStatus()
  }
}

export default select
