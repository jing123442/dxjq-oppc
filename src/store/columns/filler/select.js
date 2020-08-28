import { utilsStatus, utilsDyOrgList, untilsAddress, utilsPrintStatus, utilsVoiceStatus } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  state: {
    firmList: {
      orgId: utilsDyOrgList(),
      cascaderAddress: regionData,
      status: utilsStatus()
    },
    gapList: {
      orgId: utilsDyOrgList(),
      status: utilsStatus(),
      cascaderAddress: regionData,
      address: untilsAddress()
    },
    account: {
      orgId: utilsDyOrgList()
    },
    sevicePrice: {
      orgId: utilsDyOrgList()
    },
    updatePrice: {
      orgId: utilsDyOrgList()
    },
    printerList: {
      printStatus: utilsPrintStatus(),
      status: utilsStatus(),
      voiceStatus: utilsVoiceStatus()
    }
  }
}

export default select
