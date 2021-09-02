import { utilsStatus, utilsAuthStatus, utilsIdentityType, utilsTradeType, utilsBankList, utilsContractStatus } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  org: {
    status: utilsStatus(),
    authStatus: utilsAuthStatus(),
    contractStatus: utilsContractStatus(),
    cascaderAddress: regionData,
    identityType: utilsIdentityType(),
    bankList: utilsBankList()
  },
  account: {
    accountType: [
      { value: 0, label: '现金账户' },
      { value: 1, label: '积分账号' }
    ]
  },
  accountList: {
    type: utilsTradeType(),
    status: [
      { value: 1, label: '银行处理中' },
      { value: 2, label: '银行处理中' },
      { value: 3, label: '提现成功' },
      { value: 4, label: '失败' },
      { value: 12, label: '银行处理中' }
    ]
  }
}

export default select
