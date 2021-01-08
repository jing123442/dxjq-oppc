import { monthTimeArea, formatPeriodDate } from '@/utils/tools'

const columns = {
  order: [
    { field: 'orderId', name: '订单编号', fixed: 'left', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 13 } },
    { field: 'createDate', name: '创建时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', style: 'width: 350px;', findField: 'createDate', value: (function() { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) }, currSearch: { type: 'select', subField: 'createDateName', hideName: true, obj: 'currDataSearch', value: 'createDate' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 15, formatFun: 'formateTData all', stype: 'format' } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 16, formatFun: 'formateTData all', stype: 'format' } },
    { field: 'gasQty', name: '加气量', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 6, util: '公斤' } },
    { field: 'platformPrice', name: '平台挂牌价', hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 7, util: '元/公斤' } },
    { field: 'actualPrice', name: '平台结算价', hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 8, util: '元/公斤' } },
    { field: 'amount', name: '订单金额(元)', width: 90 },
    { field: 'amountTotal', name: '订单总金额', width: 90, hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 9, util: '元', value: function(row) { return (Number(row.amount) + Number(row.discountAmount)).toFixed(2) } } },
    { field: 'discountAmount', name: '优惠金额 ', hide: true, width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 10, util: '元' } },
    { field: 'amount', name: '实付金额 ', hide: true, width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 11, util: '元' } },
    { field: 'carrierOrgName', name: '物流公司', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 1 } },
    { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入', findField: 'carNumber' }, currSearch: { type: 'select', subField: 'currFieldName', hideName: true, obj: 'currFieldSearch', value: 'carNumber' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2 } },
    { field: 'driverName', name: '司机姓名', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 4 } },
    { field: 'gasstationName', name: '加气站', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 3 } },
    { field: 'cashierName', name: '收银员姓名', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 5 } },
    { field: 'orderStatus', name: '订单状态', width: 70, formatter: 'orderStatus', detail: { type: 'span', model: 'select', isDisabled: true, obj: 'orderStatus', style: 'width: 85%', serial: 14 } },
    { field: 'payType', name: '支付方式', width: 90, formatter: 'payType', search: { type: 'select', obj: 'payType', placeholder: '支付方式', value: '' }, detail: { type: 'span', model: 'select', isDisabled: true, obj: 'payType', style: 'width: 85%', serial: 12 } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 80, list: [{ type: 'details', name: '详情' }] }
  ],
  fillerOrder: [
    { field: 'gasstationName', name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'period', name: '', hide: true, search: { type: 'date-picker', model: 'month', placeholder: '请选择账期', clearable: false, value: (function() { const dateObj = formatPeriodDate(); return (dateObj.periodYear + '-' + dateObj.periodMonth + '-' + '01 00:00:00') }()) } },
    { field: 'gasQtyTotal', name: '加气量' },
    { field: 'gasamountTotal', name: '加气站结算金额' },
    { field: 'amountTotal', name: '平台结算金额' },
    { field: 'initialProfitBalance', name: '期初利润余额' },
    { field: 'profitTotal', name: '加气站利润金额' },
    { field: 'withdrawTotal', name: '本期提现金额' },
    { field: 'endProfitBalance', name: '期末利润余额' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 200, list: [{ type: 'detail', name: '结算明细' }, { type: 'withdraw', name: '提现明细' }, { type: 'down', name: '下载' }] }
  ],
  fillerDetail: [
    { field: 'orderId', name: '订单编号', fixed: 'left' },
    { field: 'updateDate', name: '订单支付时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'carrierOrgName', name: '物流公司' },
    { field: 'carNumber', name: '车牌号' },
    { field: 'gasQty', name: '加气量' },
    { field: 'gasamount', name: '加气站结算金额' },
    { field: 'amount', name: '平台结算金额' },
    { field: 'serviceFee', name: '加气站利润金额' }
  ],
  fillerWithdraw: [
    { field: 'withdrawOrderId', name: '提现编号', fixed: 'left' },
    { field: 'createDate', name: '提现申请时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'updateDate', name: '提现到账时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'amount', name: '提现金额' }
  ],
  carrierOrder: [
    { field: 'carrierOrgName', name: '公司名称', fixed: 'left', search: { type: 'text', placeholder: '请输入公司名称' } },
    { field: 'period', name: '', hide: true, search: { type: 'date-picker', model: 'month', placeholder: '请选择账期', clearable: false, value: (function() { const dateObj = formatPeriodDate(); return (dateObj.periodYear + '-' + dateObj.periodMonth + '-' + '01 00:00:00') }()) } },
    { field: 'rechargeTotal', name: '充值金额汇总(元)' },
    { field: 'gasQtyTotal', name: '加气量汇总(公斤)' },
    { field: 'amountTotal', name: '加气金额汇总(元)' },
    { field: 'discountTotal', name: '优惠金额汇总(元)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'recharge', name: '充值对账' }, { type: 'settlement', name: '结算订单' }, { type: 'truck', name: '卡车汇总' }] }
  ],
  carrierToFiller: [
    { field: 'gasstationName', name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    /* { field: 'period', name: '', hide: true, search: { type: 'date-picker', model: 'month', placeholder: '请选择账期' } }, */
    { field: 'gasQtyTotal', name: '加气量' },
    { field: 'amountTotal', name: '平台结算金额' },
    { field: 'discountTotal', name: '优惠金额' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'detail', name: '结算明细' }] }
  ],
  carrierToFillerDetail: [
    { field: 'orderId', name: '订单编号', fixed: 'left' },
    { field: 'updateDate', name: '支付时间' },
    { field: 'carNumber', name: '车牌号' },
    { field: 'driverName', name: '司机' },
    { field: 'gasQty', name: '加气量' },
    { field: 'actualPrice', name: '平台结算价' },
    { field: 'amount', name: '平台结算金额' },
    { field: 'discountAmount', name: '优惠金额' }
  ],
  carrierRecharge: [
    { field: 'amount', name: '充值金额(元)', fixed: 'left' },
    { field: 'updateDate', name: '充值时间', formatFun: 'formateTData all', stype: 'format' }
  ],
  carrierToTruck: [
    { field: 'carNumber', name: '车牌号', fixed: 'left', search: { type: 'text', placeholder: '请输入车牌号' } },
    { field: 'gasQtyTotal', name: '加气量汇总(公斤)' },
    { field: 'amountTotal', name: '加气金额汇总(元)' },
    { field: 'discountTotal', name: '优惠金额汇总(元)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'bill', name: '卡车订单明细' }] }
  ],
  carrierToTruckOrder: [
    { field: 'orderId', name: '订单编号', fixed: 'left', search: { type: 'text', placeholder: '请输入订单编号' } },
    { field: 'driverName', name: '司机', search: { type: 'text', placeholder: '请输入司机名称' } },
    { field: 'gasQty', name: '加气量(公斤)' },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)' },
    { field: 'actualPrice', name: '平台结算价(元/公斤)' },
    { field: 'amount', name: '金额(元)' },
    { field: 'gasstationName', name: '加气站', search: { type: 'text', placeholder: '请输入加气站' } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format' }
  ],
  bussinessOrder: [
    { field: 'orderId', name: '订单编号', fixed: 'left' },
    { field: 'period', name: '', hide: true, search: { type: 'date-picker', model: 'month', placeholder: '请选择账期', clearable: false, value: (function() { const dateObj = formatPeriodDate(); return (dateObj.periodYear + '-' + dateObj.periodMonth + '-' + '01 00:00:00') }()) } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'gasstationName', name: '加气站' },
    { field: 'carrierOrgName', name: '物流公司' },
    { field: 'carNumber', name: '车牌号' },
    { field: 'gasQty', name: '加气量' },
    { field: 'gwayprice', name: '单位利润额(元/公斤)', formatFun: 'formatGwayPrice', stype: 'format' },
    { field: 'gwayamount', name: '服务费金额' }
  ],
  downloadOrder: [
    { field: 'type', stype: 'mapping', mapping: 'typeName', name: '文件类型', width: 160, fixed: 'left', search: { type: 'select', serial: 2, obj: 'type', placeholder: '文件类型' } },
    { field: 'fileName', name: '导出文件编号' },
    { field: 'status', name: '文件状态', formatter: 'status', width: 90, search: { type: 'select', serial: 3, obj: 'status', placeholder: '文件状态' } },
    { field: 'createDate', name: '申请时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', serial: 1, placeholder: '', style: 'width: 350px;', findField: 'createDate', value: (function() { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) } },
    { field: 'genDate', name: '文件生成时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'note', name: '描述' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: params => { return params.row.status == 2 && [{ type: 'down', name: '下载' }] } }
  ]
}

export default columns
