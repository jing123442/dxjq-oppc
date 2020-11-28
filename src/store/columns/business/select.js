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
    type: utilsTradeType(),
    status: [
      { value: 1, label: '待提现' },
      { value: 2, label: '提现中' },
      { value: 3, label: '提现成功' },
      { value: 4, label: '失败' }
    ]
  }
}

export default select
