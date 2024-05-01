import { utilsStatus, utilsAuthStatus, utilsIdentityType, utilsTradeType, utilsBankList, utilsContractStatus, utilsTradeModeType } from '@/utils/select'
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
      { value: 0, label: '通联现金账户' },
      { value: 1, label: '积分账号' },
      { value: 2, label: '北京银行现金' },
      { value: 3, label: '数字账户' }
    ],
    tradeType: utilsTradeModeType()
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
  },
  accountDetail: {
    tradeType: utilsTradeModeType()
  }
}

export default select
