const columns = {
  servicePrice: [
    { field: 'gasstationId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'dataPicker', hide: true, search: { type: 'date-picker', placeholder: '' } },
    { field: 'sumGasQty', name: '加气量汇总(公斤)' },
    { field: 'sumAmount', name: '加气金额汇总(元)' },
    { field: 'sumServiceFee', name: '服务费汇总(元)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'bill', name: '对账单' }] }
  ],
  servicePriceBill: [
    { field: 'orderId', name: '订单编号', fixed: 'left', search: { type: 'text', placeholder: '请输入订单编号' } },
    { field: 'carrierOrgName', name: '物流公司名称', search: { type: 'text', placeholder: '请输入物流公司名称' } },
    { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入车牌号' } },
    { field: 'gasQty', name: '加气量' },
    { field: 'amount', name: '加气金额' },
    { field: 'gasstationFee', name: '服务费单价(元/公斤)' },
    { field: 'serviceFee', name: '服务费' },
    { field: 'updateDate', name: '加气时间', formatFun: 'formateTData', stype: 'format' }
  ],
  gasPrice: [
    { field: 'carrierOrgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'carrierOrgName', stype: 'mapping', name: '公司名称', mapping: 'carrierOrgName', search: { type: 'text', placeholder: '请输入公司名称' } },
    { field: 'sumRechargeAmount', name: '充值金额汇总(元)' },
    { field: 'sumGasQty', name: '加气量(公斤)' },
    { field: 'sumAmount', name: '加气金额汇总(元)' },
    { field: 'sumDiscountAmount', name: '优惠金额汇总(元)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'recharge', name: '充值账单' }, { type: 'filling', name: '加气账单' }, { type: 'truck', name: '卡车汇总' }] }
  ],
  gasPriceRechargeList: [
    { field: 'amount', name: '充值金额(元)', fixed: 'left' },
    { field: 'rechargeDate', name: '充值时间' }
  ],
  gasPriceOrderList: [
    { field: 'orderId', name: '订单编号', fixed: 'left', search: { type: 'text', placeholder: '请输入订单编号' } },
    { field: 'gasstationName', name: '加气站', search: { type: 'text', placeholder: '请输入加气站' } },
    { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入车牌号' } },
    { field: 'driverName', name: '司机' },
    { field: 'gasQty', name: '加气量(公斤)' },
    { field: 'actualPrice', name: '单价' },
    { field: 'amount', name: '金额' },
    { field: 'discountAmount', name: '优惠金额' },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData', stype: 'format' }
  ],
  gasPriceTruckList: [
    { field: 'carNumber', name: '车牌号', fixed: 'left', search: { type: 'text', placeholder: '请输入车牌号' } },
    { field: 'sumGasQty', name: '加气量汇总' },
    { field: 'sumAmount', name: '加气金额汇总(元)' },
    { field: 'sumDiscountAmount', name: '优惠金额汇总(元)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'bill', name: '对账单' }] }
  ],
  gasPriceTruckOrderList: [
    { field: 'orderId', name: '订单编号', fixed: 'left', search: { type: 'text', placeholder: '请输入订单编号' } },
    { field: 'driverName', name: '司机', search: { type: 'text', placeholder: '请输入司机名称' } },
    { field: 'gasQty', name: '加气量(公斤)' },
    { field: 'actualPrice', name: '单价(元/公斤)' },
    { field: 'amount', name: '金额' },
    { field: 'discountAmount', name: '优惠金额' },
    { field: 'gasstationName', name: '加气站', search: { type: 'text', placeholder: '请输入加气站' } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData', stype: 'format' }
  ]
}

export default columns
