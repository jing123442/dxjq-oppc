import {utilsBaseRole, utilsStatus, utilSelectGasstationType, utilSelectAuthDistrictList} from '@/utils/select'

const select = {
  intention: {
    status: utilsStatus(),
    baseRole: utilsBaseRole(['carrier', 'driver', 'filler', 'register']),
    sex: [
      { value: 1, label: '男' },
      { value: 2, label: '女' }
    ]
  },
  battle: {
    gasstationType: utilSelectGasstationType(),
    districtList: utilSelectAuthDistrictList()
  },
  battleList: {
    gasstationType: utilSelectGasstationType('all'),
    districtList: utilSelectAuthDistrictList()
  },
}

export default select
