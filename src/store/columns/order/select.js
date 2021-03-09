import { utilsOrderStatus, utilsPayType, utilsDownloadStatus, utilsDownloadType } from '@/utils/select'

const select = {
  order: {
    payType: utilsPayType(),
    orderStatus: utilsOrderStatus(),
    currDaySearch: [{ value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'carrierOrgName', label: '物流公司' }, { value: 'carNumber', label: '车牌号' }, { value: 'gasstationName', label: '加气站' }],
    currDataSearch: [{ value: 'createDate', label: '创建时间' }, { value: 'updateDate', label: '支付时间' }],
    currFieldSearch: [{ value: 'carNumber', label: '车牌号' }, { value: 'orderId', label: '订单编号', dataType: 'number' }, { value: 'carrierOrgName', label: '物流公司' }, { value: 'driverName', label: '司机姓名' }, { value: 'gasstationName', label: '加气站' }, { value: 'cashierName', label: '收银员姓名' }]
  },
  download: {
    status: utilsDownloadStatus(),
    type: utilsDownloadType()
  }
}

export default select
