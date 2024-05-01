import {
  utilsBaseRole,
  utilsStatus,
  utilSelectGasstationType,
  utilSelectAuthDistrictList,
  utilsOperateType,
  utilInfoType,
  utilDistrictAreaList,
  utilsBuyType,
  utilsStevedoreDataSearch,
  utilDyncCardTypeList,
  utilsImportTypeList,
  utilsLossDataSearch,
  utilsUploadType,
  utilSelectOutTypeList,
  utilSelectSaleTypeList,
  utilsOutTimeSearch,
  utilsCreateTimeSearch,
  utilsPayCreateTimeSearch,
  utilSelectPayTypeList, utilsDjCode
} from '@/utils/select'

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
  control: {
    marketType: [
      { value: 0, label: '一体化' },
      { value: 1, label: '新营销' }
    ],
    djCode: utilsDjCode()
  },
  batchEdit: {
    gasstationType: utilSelectGasstationType('all'),
    districtAreaList: utilDistrictAreaList(),
    infoType: utilInfoType(),
    isImportant: [
      { value: '1', label: '是' },
      { value: '2', label: '否' }
    ],
    isImportantAll: [
      { value: 0, label: '-' },
      { value: '1', label: '是' },
      { value: '2', label: '否' }
    ]
  },
  dyncStevedor: {
    buyType: utilsBuyType(),
    uploadType: utilsUploadType(),
    stevedoreDataSearch: utilsStevedoreDataSearch()
  },
  entrain: {
    outType: utilSelectOutTypeList(),
    saleType: utilSelectSaleTypeList(),
    outTimeSearch: utilsOutTimeSearch(),
  },
  entrainSF: {
    saleType: utilSelectSaleTypeList(),
    createTimeSearch: utilsCreateTimeSearch(),
  },
  entrainDX: {
    payType: utilSelectPayTypeList(),
    createTimeSearch: utilsPayCreateTimeSearch(),
  },
  dyncLoss: {
    importTypeList: utilsImportTypeList(),
    lossDataSearch: utilsLossDataSearch(),
  },
  dyncCard: {
    importTypeList: utilsImportTypeList(),
    cardType: utilDyncCardTypeList(),
  },
  dyncGass: {},
  dyncRefuel: {},
}

export default select
