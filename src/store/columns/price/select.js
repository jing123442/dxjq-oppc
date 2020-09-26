import { utilsSource } from '@/utils/select'
import { provinceAndCityData } from 'element-china-area-data'

const select = {
  listing: {
    fromList: utilsSource()
  },
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
  }
}

export default select
