import { utilsStatus, utilsAuthStatus, utilsIdentityType } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  org: {
    status: utilsStatus(),
    authStatus: utilsAuthStatus(),
    cascaderAddress: regionData,
    identityType: utilsIdentityType()
  },
  account: {
    accountType: [
      { value: 0, label: '现金账户' }
    ]
  },
  accountList: {
    type: [
      { value: 1, label: '充值' },
      { value: 2, label: '圈存' },
      { value: 3, label: '卡车账户资金归集' }
    ]
  }
}

export default select
