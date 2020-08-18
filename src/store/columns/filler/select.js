import { utilsStatus, utilsDyOrgList, untilsAddress } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  state: {
    firmList: {
      orgId: utilsDyOrgList(),
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
    }
  }
}

export default select
