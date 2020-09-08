import { utilsPlanStatus, untilsMarketingManList, utilsSource } from '@/utils/select'

const select = {
  lngPlan: {
    planStatus: utilsPlanStatus()
  },
  carrierManConfig: {
    marketingManList: untilsMarketingManList()
  },
  lngPlanDepartures: {
    source: utilsSource()
  }
}

export default select
