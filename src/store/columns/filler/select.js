import { utilsStatus, utilsPlanStatus, utilsSource, utilsDyOrgList, untilsAddress, utilsPrintStatus, utilsVoiceStatus } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  firmList: {
    orgId: utilsDyOrgList(),
    cascaderAddress: regionData,
    status: utilsStatus()
  },
  info: {
    orgId: utilsDyOrgList(),
    status: utilsStatus(),
    cascaderAddress: regionData,
    address: untilsAddress()
  },
  account: {
    orgId: utilsDyOrgList()
  },
  price: {},
  updatePrice: {
    orgId: utilsDyOrgList()
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
