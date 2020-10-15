import { utilsStatus, utilsAuthStatus, utilsIdentityType, utilsTradeType, utilsBankList } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  org: {
    status: utilsStatus(),
    authStatus: utilsAuthStatus(),
    cascaderAddress: regionData,
    identityType: utilsIdentityType(),
    bankList: utilsBankList()
  },
  account: {
    accountType: [
      { value: 0, label: '现金账户' }
    ]
  },
  accountList: {
    type: utilsTradeType()
  }
}

export default select
