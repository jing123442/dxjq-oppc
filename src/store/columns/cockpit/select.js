import {utilsBaseRole, utilsStatus, utilSelectGasstationType, utilSelectAuthDistrictList, utilsOperateType} from '@/utils/select'

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
    operateType: utilsOperateType(),
    gasstationType: utilSelectGasstationType(),
    districtList: utilSelectAuthDistrictList()
  },
  battleList: {
    operateType: utilsOperateType(),
    gasstationType: utilSelectGasstationType('all'),
    districtList: utilSelectAuthDistrictList()
  },
}

export default select
