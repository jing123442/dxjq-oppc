import {
  utilsOrderStatus,
  utilsPayType,
  utilsSource,
  utilsTruckTypeAll,
  utilsTradeModeType,
  utilsDyOrgList,
  utilsTradeType,
  utilsExecuteStatus
} from '@/utils/select'
import { provinceAndCityData } from 'element-china-area-data'

const select = {
  listing: {
    fromList: utilsSource()
  },
  direct: {
    carrierList: utilsDyOrgList(2, 'orgId', 'orgName', null, 2),
    gasstationList: utilsDyOrgList(1, 'orgId', 'orgName', null, 2),
    currFieldSearch: [{ value: 'gasstationId', label: '加气站' }, { value: 'carrierOrgId', label: '物流客户' }]
  },
  directOrder: {
    payType: utilsPayType(),
    orderStatus: utilsOrderStatus(),
    tradeType: [
      { value: 1, label: '经销模式' },
      { value: 2, label: '直销模式' },
    ],
    currDaySearch: [{ value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'carrierOrgName', label: '物流公司' }, { value: 'carNumber', label: '车牌号' }, { value: 'gasstationName', label: '加气站' }],
    currDataSearch: [{ value: 'createDate', label: '创建时间' }, { value: 'updateDate', label: '支付时间' }],
    currFieldSearch: [{ value: 'carNumber', label: '车牌号' }, { value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'carrierOrgName', label: '物流公司' }, { value: 'driverName', label: '司机姓名' }, { value: 'gasstationName', label: '加气站' }, { value: 'cashierName', label: '收银员姓名' }]
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
  },
  snpRetail: {
    status: utilsExecuteStatus(),
    gasstationList: utilsDyOrgList(1, 'orgId', 'orgName', null, 2),
    currFieldSearch: [{ value: 'gasstationId', label: '加气站' }]
  },
  snpRetailLog: {
    currDataSearch: [{ value: "operatorDate", label: "操作时间" }],
  },
  auyanRetail: {
    status: utilsExecuteStatus(),
    gasstationList: utilsDyOrgList(1, 'orgId', 'orgName', null, 2),
    currFieldSearch: [{ value: 'gasstationId', label: '加气站' }]
  },
  auyanRetailLog: {
    currDataSearch: [{ value: "operatorDate", label: "操作时间" }],
  },
}

export default select
