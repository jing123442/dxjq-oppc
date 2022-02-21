import { utilsOrderStatus, utilsPayType, utilsSource, utilsTruckTypeAll, utilsTradeModeType } from '@/utils/select'
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
  },
  discountCarrier: {
    rebateStatus: [
      { value: 1, label: '开启' },
      { value: 2, label: '关闭' },
    ]
  },
  rebateConfig: {
    truckType: utilsTruckTypeAll()
  },
  rebateFillerAdd: {
    truckType: utilsTruckTypeAll()
  },
  rebateEdit: {
    truckType: utilsTruckTypeAll()
  },
  rebateConfigRecords: {
    configType: [
      { value: 1, label: '优惠添加' },
      { value: 2, label: '优惠编辑' },
      { value: 3, label: '优惠删除' }
    ],
    truckType: utilsTruckTypeAll()
  },
  rebateOrder: {
    payType: utilsPayType(),
    orderStatus: utilsOrderStatus(),
    tradeType: utilsTradeModeType(),
    currDaySearch: [{ value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'carrierOrgName', label: '物流公司' }, { value: 'carNumber', label: '车牌号' }, { value: 'gasstationName', label: '加气站' }],
    currDataSearch: [{ value: 'createDate', label: '创建时间' }, { value: 'updateDate', label: '支付时间' }],
    currFieldSearch: [{ value: 'carNumber', label: '车牌号' }, { value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'carrierOrgName', label: '物流公司' }, { value: 'driverName', label: '司机姓名' }, { value: 'gasstationName', label: '加气站' }, { value: 'cashierName', label: '收银员姓名' }]
  }
}

export default select
