import { utilsBaseRole, utilsStatus, utilSelectGasstationType, utilSelectAuthDistrictList, utilsOperateType, utilInfoType, utilDistrictAreaList } from '@/utils/select'

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
    districtList: utilSelectAuthDistrictList(),
    isImportant: [
      { value: '1', label: '是' },
      { value: '2', label: '否' }
    ]
  },
  battleList: {
    operateType: utilsOperateType(),
    gasstationType: utilSelectGasstationType('all'),
    districtList: utilSelectAuthDistrictList(),
    isImportant: [
      { value: '1', label: '是' },
      { value: '2', label: '否' }
    ]
  },
  batchEdit: {
    gasstationType: utilSelectGasstationType('all'),
    districtAreaList: utilDistrictAreaList(),
    infoType: utilInfoType(),
    isImportant: [
      { value: '1', label: '是' },
      { value: '2', label: '否' }
    ]
  }
}

export default select
