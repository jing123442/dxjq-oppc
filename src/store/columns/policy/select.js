import { utilsPlanStatus, untilsMarketingManList, utilsSource } from '@/utils/select'
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
    gasstationConfig: {},
    lngPlanDepartures: {
      source: utilsSource()
    }
  }
}

export default select
