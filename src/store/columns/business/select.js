import { utilsStatus } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  state: {
    org: {
      status: utilsStatus(),
      cascaderAddress: regionData
    },
    account: {}
  }
}

export default select
