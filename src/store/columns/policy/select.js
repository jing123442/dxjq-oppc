import { utilsPlanStatus } from '@/utils/select'
// import { regionData } from 'element-china-area-data'

const select = {
  state: {
    firmPrice: {},
    gasPrice: {},
    record: {},
    sourceConfig: {},
    gasStockList: {},
    lngPlan: {
      planStatus: utilsPlanStatus()
    }
  }
}

export default select
