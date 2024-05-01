import {
  utilsStatus,
  utilsAuthStatus,
  utilsPlanStatus,
  utilsSource,
  utilsDyOrgList,
  untilsAddress,
  utilsPrintStatus,
  utilsVoiceStatus,
  utilsIdentityType,
  utilsTradeType,
  utilsBankList,
  utilsPrintPaper,
  utilsHandleType,
  utilsModifyApplyType,
  utilsCheckType,
  utilsBearType,
  utilsLNGDataSearch,
  utilsContractStatus,
  utilsFillerParentList,
  utilSelectGasstationType,
  utilsMarketType,
  utilsSiteType,
  businessStateType,
  utilsSiteTypeWithoutStop,
  utilsNameType
} from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  firmList: {
    orgId: utilsDyOrgList(1),
    cascaderAddress: regionData,
    status: utilsStatus(),
    authStatus: utilsAuthStatus(),
    contractStatus: utilsContractStatus(),
    identityType: utilsIdentityType(),
    bankList: utilsBankList(),
    fillerParent: utilsFillerParentList(),

  },
  info: {
    orgId: utilsDyOrgList(1),
    status: utilsStatus(),
    cascaderAddress: regionData,
    address: untilsAddress(),
    marketType:utilsMarketType(),
    qrcodeType: [
      { value: 0, label: '未设置' },
      { value: 1, label: '加气站二维码' },
      { value: 2, label: '收银员二维码' }
    ],
    currFieldSearch: [{ value: 'nickName', label: '加气站名称' }, { value: 'gasstationName', label: '企业名称'}],
    siteType:utilsSiteType(),
    businessState:businessStateType(),
    // gasstationType: utilSelectGasstationType('inner')
    gasstationType: utilsSiteTypeWithoutStop()
  },
  account: {
    orgId: utilsDyOrgList(1)
  },
  nameType:utilsNameType,


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
    ],
    statusStock: [
      { value: 4, label: '库存过低' },
      { value: 5, label: '库存正常' },
      { value: 6, label: '库存过高' }
    ],
    purchaseLimitStatus: [
      { value: 0, label: '已开启' },
      { value: 1, label: '已关闭' },
    ],
    gasLimitStatus: [
      { value: 0, label: '已关闭' },
      { value: 1, label: '已开启' }
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
  },
  selfFullInventory: {
    currDataSearch: [{ value: 'tradeDate', label: '入库时间' }], // 日期选择
  },
  lngStockDetail: {
    proposeType: [{ value: 1, label: '建议优先配送' }, { value: 2, label: '建议常规配送' }, { value: 3, label: '建议调整或取消' }]
  },
  gasStationSubmitLimit: {
    pltStatus: [{ value: '0', label: '开启' }, { value: '1', label: '关闭' }]
  },
  limitList: {
    limitStatus: [{ value: '0', label: '开启限制' }, { value: '1', label: '关闭限制' }]
  },
  gasLimitConfig: {
    type: [{ value: '0', label: '关闭限制' }, { value: '1', label: '开启限制' }]
  },
  limitCongfigForm: {
    type: [{ value: 0, label: '关闭限制' }, { value: 1, label: '开启限制' }]
  }
}

export default select
