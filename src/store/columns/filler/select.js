import { utilsStatus, utilsAuthStatus, utilsPlanStatus, utilsSource, utilsDyOrgList, untilsAddress, utilsPrintStatus, utilsVoiceStatus, utilsIdentityType } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  firmList: {
    orgId: utilsDyOrgList(1),
    cascaderAddress: regionData,
    status: utilsStatus(),
    authStatus: utilsAuthStatus(),
    identityType: utilsIdentityType()
  },
  info: {
    orgId: utilsDyOrgList(1),
    status: utilsStatus(),
    cascaderAddress: regionData,
    address: untilsAddress()
  },
  account: {
    orgId: utilsDyOrgList(1)
  },
  accountList: {
    type: [
      { value: 1, label: '加气服务费' }
    ]
  },
  price: {},
  gasStockList: {
    stockType: [
      { value: 1, label: '入库' },
      { value: 2, label: '出库' },
      { value: 3, label: '库存调整' }
    ]
  },
  updatePrice: {
    orgId: utilsDyOrgList(1)
  },
  printerList: {
    printStatus: utilsPrintStatus(),
    status: utilsStatus(),
    voiceStatus: utilsVoiceStatus()
  },
  lngPlan: {
    source: utilsSource(),
    planStatus: utilsPlanStatus()
  }
}

export default select
