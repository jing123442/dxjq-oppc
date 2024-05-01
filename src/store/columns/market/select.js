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
  },
  marketCenter: {
    cardStatus: [
      { value: 0, label: '运营中' },
      { value: 1, label: '已作废' },
    ],
    createTimeSearch: [
      { value: '', label: '请选择' },
      { value: 'latestTime', label: '最近扣款时间' },
      { value: 'senderDate', label: '发放时间' }
    ]
  }
}

export default select
