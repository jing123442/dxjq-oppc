import { utilsPlanStatus, untilsMarketingManList } from '@/utils/select'
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
    },
    carrierManConfig: {
      marketingManList: untilsMarketingManList()
    },
    gasstationConfig: {}
  }
}

export default select
