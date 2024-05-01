import file from '@/store/modules/file'
import { getDateRange, monthTimeArea, currentMonthTimeArea } from '@/utils/tools'
var getDate = () => {
  return [getDateRange(31).startdate, getDateRange(31).enddate]
}
const columns = {
  detail: [
    { field: 'handDate', name: '交班日', fixed: 'left', search: { type: 'date-picker', model: 'daterange', format: 'yyyy-MM-dd', vformat: 'yyyy-MM-dd', value: (function() { const dateObj = currentMonthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) } },
    { field: 'settleCycle', name: '结算周期', width: 170 },
    { field: 'allIncome', name: '周期内累计收益(万元)' },
    { field: 'avgQty', name: '周期内日均加气量(吨)' },
    { field: 'qty', name: '当日加气量(吨)' },
    { field: 'sale', name: '当日加气额(万元)' },
    { field: 'avgPrice', name: '当日销售均价(元/公斤)' },
    { field: 'platPrice', name: '当日平台价(元/公斤)' },
    { field: 'accountQty', name: '当日账存(吨)' },
    { field: 'actualQty', name: '当日实存(吨)' },
    { field: 'inQty', name: '当日入库(吨)' },
    { field: 'onway', name: '当日在途(吨)' },
  ],
  fund: [
    { field: 'createDate', name: '结算时间', fixed: 'left', sort: true, stype: 'format', formatFun: 'formateTData all', detail: { type: 'span', stype: 'format', formatFun: 'formateTData all', serial: 6 } },
    { field: 'type', name: '流水类型', formatter: 'fundType', filters: [{ value: 4, text: '提现' }, { value: 6, text: '利润' }, { value: 10, text: '提现退回' }, { value: 13, text: '利润退回' }], detail: { type: 'span', model: 'select', isDisabled: true, obj: 'fundType', serial: 5 } },
    { field: 'datePicker', hide: true, search: { type: 'date-picker', placeholder: '', value: getDate(), dtime: ['00:00:00', '23:59:59'] } },
    { field: 'anotherName', name: '对方账户名称', detail: { type: 'span', serial: 2 } },
    { field: 'changeAmount', name: '结算金额', hide: true, detail: { type: 'span', serial: 3, util: '元' } },
    { field: 'changeAmount', name: '结算金额(元)' },
    { field: 'accountBalance', name: '账户余额', hide: true, detail: { type: 'span', serial: 4, util: '元' } },
    { field: 'accountBalance', name: '账户余额(元)' },
    { field: 'orderId', name: '关联订单编号', search: { type: 'text', dataType: 'number', placeholder: '请输入订单编号' }, detail: { type: 'span', serial: 1 } },
  ],
  control: [
    { field: 'carrierOrgName', name: '物流公司', fixed: 'left' },
    { field: 'type', name: '销售方式', formatter: 'controlType' },
    { field: 'price', name: '当前结算特价(元/公斤)', sort: true },
    { field: 'note', name: '相关优惠内容' },
    { field: 'cardId', name: '相关卡号', stype: 'format', formatFun: 'cardInfo' }
  ],
  profit: [
    { field: 'adjustMonth', name: '盘盈亏月', fixed: 'left' },
    { field: 'gatherTime', name: '盘盈亏时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'actualQty', name: '实存(公斤)' },
    { field: 'accountQty', name: '账存(公斤)' },
    { field: 'lossQty', name: '盈亏量(公斤)' },
    { field: 'avgPrice', name: '盘盈亏价(元/公斤)' },
    { field: 'lossValue', name: '盘盈亏金额(元)' },
  ],
}

export default columns
