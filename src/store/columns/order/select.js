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
  orderList: {
    orderStatus: utilsOrderStatus(),
    orderTypeStr: [
      { value: 1, label: '大象线上' },
      { value: 2, label: '线下-优惠' },
      { value: 3, label: '线下-标准' },
      { value: 4, label: '团液线上' }
    ],
    payType: utilsPayType(),
    tradeType: [
      { value: 1, label: '经销加气' },
      { value: 2, label: '直销加气' }
    ],
    dateFieldList: [
      { value: 'createTime', label: '创建时间' },
      { value: 'payTime', label: '支付时间' }
    ],
    fieldList: [
      { value: 'orderId', label: '订单编号', dataType: 'number' },
      { value: 'carNumber', label: '车牌号', dataType: 'text' },
      { value: 'driver', label: '驾驶员姓名', dataType: 'text' },
      { value: 'cashierName', label: '收银员姓名', dataType: 'text' }
    ]
  },
  recharge: {
    dateFieldList: [
      { value: 'createDate', label: '创建时间' },
      { value: 'settleDate', label: '结算时间' }
    ],
    fieldList: [
      { value: 'orderId', label: '订单编号', dataType: 'number' },
      { value: 'carrierName', label: '付款方', dataType: 'text' },
      { value: 'cardNo', label: '加气卡号', dataType: 'text' }
    ]
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
