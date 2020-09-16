import { utilsPlanStatus, untilsMarketingManList, utilsSource, utilsUserList } from '@/utils/select'

const select = {
  lngPlan: {
    source: utilsSource(),
    planStatus: utilsPlanStatus()
  },
  carrierManConfig: {
    userList: utilsUserList(),
    marketingManList: untilsMarketingManList()
  },
  gasstationConfig: {
    userList: utilsUserList()
  }
}

export default select
