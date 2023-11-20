import { getDateRange } from '@/utils/tools'
var getDate = () => {
  return [getDateRange(31).startdate, getDateRange(31).enddate]
}
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
    { field: 'updateDate', name: '加气时间', formatFun: 'formateTData all', width: 140, stype: 'format' }
  ],
  gasPrice: [
    { field: 'carrierOrgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'carrierOrgName', stype: 'mapping', name: '公司名称', mapping: 'carrierOrgName', search: { type: 'text', placeholder: '请输入公司名称' } },
    { field: 'dataPicker', hide: true, search: { type: 'date-picker', placeholder: '' } },
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
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format' }
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
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format' }
  ],
  invoiceDs: [
    { field: 'receiptNumber', name: '集中开票编号', nameSpan: 5, fixed: 'left', detail: { type: 'span' }, search: { type: 'text', placeholder: '请输入集中开票编号' } },
    { field: 'carrierOrgName', name: '物流客户名称', nameSpan: 5, detail: { type: 'span' }, search: { type: 'text', placeholder: '请输入物流客户名称' } },
    { field: 'status', name: '集中开票状态', nameSpan: 5, detail: { type: 'span', model: 'select', obj: 'receiptStatus' }, formatter: 'receiptStatus', search: { type: 'select', obj: 'receiptStatus', placeholder: '集中开票状态' } },
    { field: 'totalAmount', name: '开票金额（元）', nameSpan: 5, detail: { type: 'span' } },
    { field: 'payDateRound', name: '支付时段', nameSpan: 5, detail: { type: 'span' } },
    { field: 'totalCount', name: '加气订单量（笔）', stype: 'link' },
    { field: 'createDate', name: '申请时间', nameSpan: 5, formatFun: 'formateTData all', stype: 'format', search: { type: 'date-picker', model: '', dtime: ['00:00:00', '23:59:59'], clearable: false, value: getDate(), findField: 'createDate' }, currSearch: { type: 'select', hideName: true, obj: 'dateType', value: 'createDate' }, detail: { type: 'span', formatFun: 'formateTData all', stype: 'format' } },
    { field: 'updateDate', name: '更新时间', nameSpan: 5, formatFun: 'formateTData all', stype: 'format', detail: { type: 'span', formatFun: 'formateTData all', stype: 'format' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: params => { return params.row.status == 2 && [{ type: 'voucher', name: '查看凭证' }] || (params.row.status == 3 && [{ type: 'reason', name: '查看原因' }]) || (params.row.status == 0 && [{ type: 'audit', name: '审核处理' }]) } }
  ],
  invoiceDsOrder: [
    { field: 'orderId', name: '订单号', fixed: 'left' },
    { field: 'tradeType', name: '交易模式', formatter: 'tradeType' },
    { field: 'createDate', name: '创建时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'gasQty', name: '加气量' },
    { field: 'amount', name: '结算金额' },
    { field: 'rebate', name: '物流公司专享优惠' },
    { field: 'carNumber', name: '车牌号'},
    { field: 'driverName', name: '司机姓名' },
    { field: 'gasstationName', name: '加气站' },
    { field: 'orderStatus', name: '订单状态', formatter: 'orderStatus', filters: [{ text: '待支付', value: 1 }, { text: '已支付', value: 2 }, { text: '已取消', value: 3 }] },
    { field: 'payType', name: '支付方式', formatter: 'payType', filters: [{ text: '余额支付', value: 0 }, { text: '微信支付', value: 1 }, { text: '余额+微信支付', value: 2 }] }
  ],
  directWithdApply: [
    { field: 'gasstationName', name: '加气站', fixed: 'left',
      search: { type: 'text', placeholder: '请输入加气站' } },
    { field: 'startDate', name: '账期', stype: 'fields', fieldList: ['startDate', 'endDate'], width: 160 },
    { field: 'applyStatus', name: '状态', formatter: 'applyStatus', stype: 'formatter-style',
      search: { type: 'select', obj: 'applyStatus', placeholder: '提现申请状态' } },
    { field: 'serviceFee', name: '服务费总金额（元）' },
    { field: 'fapiaoNo', name: '发票号' },
    { field: 'totalAmount', name: '发票总金额（元）' },
    { field: 'updateDate', name: '更新时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110,
      list: params => {
        const row = params.row
        const result = []

        if (row.applyStatus != 0) {
          result.push({ type: 'find', name: '查看' })
        }
        if (row.applyStatus == 2) {
          result.push({ type: 'first', name: '初审' })
        } else if (row.applyStatus == 3) {
          result.push({ type: 'review', name: '复审' })
        }
        return result
    } }
  ],
  directWithdApplyLog: [
    { field: 'gasstationName', name: '加气站', fixed: 'left' },
    { field: 'operateComment', name: '操作内容' },
    { field: 'createrDate', name: '操作时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'createrName', name: '操作人' },
  ],
}

export default columns
