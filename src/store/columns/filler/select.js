import { utilsStatus, utilsAuthStatus, utilsPlanStatus, utilsSource, utilsDyOrgList, untilsAddress, utilsPrintStatus, utilsVoiceStatus, utilsIdentityType, utilsTradeType, utilsBankList, utilsPrintPaper, utilsHandleType, utilsModifyApplyType, utilsCheckType, utilsBearType, utilsLNGDataSearch, utilsFillerParentList } from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  firmList: {
    orgId: utilsDyOrgList(1),
    cascaderAddress: regionData,
    status: utilsStatus(),
    authStatus: utilsAuthStatus(),
    identityType: utilsIdentityType(),
    bankList: utilsBankList(),
    fillerParent: utilsFillerParentList()
  },
  info: {
    orgId: utilsDyOrgList(1),
    status: utilsStatus(),
    cascaderAddress: regionData,
    address: untilsAddress(),
    qrcodeType: [
      { value: 0, label: '未设置' },
      { value: 1, label: '加气站二维码' },
      { value: 2, label: '收银员二维码' }
    ]
  },
  account: {
    orgId: utilsDyOrgList(1)
  },
  accountList: {
    type: utilsTradeType()
  },
  price: {},
  gasStockList: {
    stockType: [
      { value: 1, label: '入库气量' },
      { value: 2, label: '销售气量' },
      { value: 3, label: '库存调整' },
      { value: 4, label: '库存退回' }
    ]
  },
  printerList: {
    printStatus: utilsPrintStatus(),
    printPaper: utilsPrintPaper(),
    voiceStatus: utilsVoiceStatus()
  },
  lngPlan: {
    source: utilsSource(),
    checkType: utilsCheckType(),
    handleType: utilsHandleType(),
    planStatus: utilsPlanStatus(),
    modifyApplyType: utilsModifyApplyType(),
    bearType: utilsBearType(),
    currLNGDataSearch: utilsLNGDataSearch()
  }
}

export default select
