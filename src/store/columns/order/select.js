import { utilsOrderStatus, utilsPayType, utilsDownloadStatus, utilsDownloadType, utilsTradeModeType, utilsPriceType ,utilsMarketType} from '@/utils/select'

const select = {
  order: {
    payType: utilsPayType(),
    orderStatus: utilsOrderStatus(),
    tradeType: utilsTradeModeType(),
    priceType: utilsPriceType(),
    marketType: utilsMarketType(),
    currDaySearch: [{ value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'carrierOrgName', label: '物流公司' }, { value: 'carNumber', label: '车牌号' }, { value: 'gasstationName', label: '加气站' }],
    currDataSearch: [{ value: 'createDate', label: '创建时间' }, { value: 'updateDate', label: '支付时间' }],
    currFieldSearch: [{ value: 'carNumber', label: '车牌号' }, { value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'driverName', label: '司机姓名' }, { value: 'cashierName', label: '收银员姓名' }],
    carrierOrgNameSearch: [{ value: 'carrierOrgName', label: '物流公司' },]
  },
  buyOrder: {
    payType: utilsPayType(),
    orderStatus: utilsOrderStatus(),
    tradeType: utilsTradeModeType(),
    priceType: utilsPriceType(),
    marketType: utilsMarketType(),
    currDaySearch: [{ value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'carrierOrgName', label: '物流公司' }, { value: 'carNumber', label: '车牌号' }, { value: 'gasstationName', label: '加气站' }],
    currDataSearch: [{ value: 'createDate', label: '创建时间' }, { value: 'updateDate', label: '支付时间' }],
    currFieldSearch: [{ value: 'carNumber', label: '车牌号' }, { value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'driverName', label: '司机姓名' }, { value: 'cashierName', label: '收银员姓名' }],
    carrierOrgNameSearch: [{ value: 'carrierOrgName', label: '物流公司' },]
  },
  sinopecOrder: {
    payType: utilsPayType(),
    orderStatus: utilsOrderStatus(),
    tradeType: utilsTradeModeType(),
    currDaySearch: [{ value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'carrierOrgName', label: '物流公司' }, { value: 'carNumber', label: '车牌号' }, { value: 'gasstationName', label: '加气站' }],
    currDataSearch: [{ value: 'createDate', label: '创建时间' }, { value: 'updateDate', label: '支付时间' }],
    currFieldSearch: [{ value: 'carNumber', label: '车牌号' }, { value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'driverName', label: '司机姓名' }, { value: 'cashierName', label: '收银员姓名' }],
    carrierOrgNameSearch: [{ value: 'carrierOrgName', label: '物流公司' },]
  },
  selfOrder: {
    payType: utilsPayType(),
    orderStatus: utilsOrderStatus(),
    tradeType: utilsTradeModeType(),
    currDaySearch: [{ value: 'gasstationName', label: '加气站' }, { value: 'tradeNo', label: '流水号', dataType: 'number' }, { value: 'carNo', label: '车牌号' }, { value: 'cashier', label: '收银员' }], // 下拉选择查询
    currDataSearch: [{ value: 'tradeDate', label: '交易时间' }], // 日期选择
    currFieldSearch: [{ value: 'gasstationName', label: '加气站' }, { value: 'tradeNo', label: '流水号', dataType: 'number' }, { value: 'carNo', label: '车牌号' },  { value: 'cashier', label: '收银员' }]
  },
  download: {
    status: utilsDownloadStatus(),
    type: utilsDownloadType()
  },
  orderDay: {
    tradeType: utilsTradeModeType()
  },
  filler: {
    tradeType: utilsTradeModeType()
  }
}

export default select
