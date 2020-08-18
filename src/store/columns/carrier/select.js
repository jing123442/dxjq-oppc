import { utilsStatus, utilsDyOrgList, utilsAutoAccount, utilsCheck, utilsAccountType, utilsOrderStatus } from '@/utils/select'

const select = {
  state: {
    logistics: {
      orgId: utilsDyOrgList(),
      status: utilsStatus()
    },
    firmAccount: {
      orgId: utilsDyOrgList(),
      autoAccount: utilsAutoAccount()
    },
    vehicle: {
      orgId: utilsDyOrgList(),
      status: utilsStatus()
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
}

export default select
