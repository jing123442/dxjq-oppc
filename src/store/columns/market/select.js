import { provinceAndCityData } from 'element-china-area-data'
import { untilsMarketingManList, utilsUserList } from '@/utils/select'

const select = {
  preferential: {
    addressList: provinceAndCityData
  },
  release: {
    status: [
      { value: 1, label: '申请' },
      { value: 2, label: '通过' },
      { value: 3, label: '驳回' },
      { value: 4, label: '已发布' }
    ]
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
