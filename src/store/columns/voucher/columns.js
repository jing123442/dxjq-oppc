import {dataPickerDefault, toolPickerOptions} from '@/utils/tools'

const columns = {
  list: [
    { field: 'orderNumber', name: '序号', width: 50, fixed: 'left' },
    { field: 'orderId', name: '订单编号', mapping: 'orgName' },
    { field: 'certificateNumber', name: '凭证号', search: { type: 'select', remote: true, field: 'bizUserId', obj: 'orgId', findKey: 'orgName', paramKey: ['param', 'org'], placeholder: '请选择企业名称' } },
    { field: 'serialNumber', name: '流水号' },
    { field: 'changeTime', name: '记账时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', model: 'daterange', dataType: 'rangeType', rangeNumber: 30, style: 'width: 350px;', format: 'yyyy-MM-dd', timeOptions: toolPickerOptions(0), value: (function() { const dateObj = dataPickerDefault(new Date(), 1, 'yyyy-MM-dd hh:mm:ss', 1); return [dateObj.start, dateObj.end] })() } },
    { field: 'happenTime', name: '发生时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'summary', name: '摘要' },
    { field: 'receiveAmount', name: '收入金额(元)', width: 100, formatFun: 'formateMoney', stype: 'format' },
    { field: 'payAmount', name: '支出金额(元)', width: 100, formatFun: 'formateMoney', stype: 'format' },
    { field: 'balance', name: '余额(元)', width: 100, formatFun: 'formateMoney', stype: 'format' },
    { field: 'remark', name: '备注', formatFun: 'formateTextDeleteNULL', stype: 'format' },
    { field: 'otherAccountName', name: '对方户名' },
    { field: 'otherAccount', name: '对方账号' },
    { field: 'fundUse', name: '用途' }
  ],
  download: [
    { field: 'orgName', name: '企业名称', fixed: 'left', search: { type: 'text', placeholder: '请输入企业名称' } },
    { field: 'changeTime', name: '期间', stype: 'fields', fieldList: ['startDate', 'endDate'], search: { type: 'date-picker', model: 'daterange', dataType: 'rangeType', rangeNumber: 30, style: 'width: 350px;', format: 'yyyy-MM-dd', timeOptions: toolPickerOptions(0), value: (function() { const dateObj = dataPickerDefault(new Date(), 1, 'yyyy-MM-dd hh:mm:ss', 1); return [dateObj.start, dateObj.end] })() } },
    { field: 'status', name: '', hide: true, search: { type: 'select', obj: 'voucherStatus', placeholder: '盖章状态' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 330, list: function (scope) {
        const row = scope.row
        const result =[{type: 'self_detail', name: '资金流水凭证明细'}, {type: 'down_no', name: '下载未盖章凭证'}]

        if (scope.row.status == 1) {
          result.push({type: 'down_ok', name: '下载已盖章凭证'})
        } else {
          result.push({type: 'wait', name: '待生成', style: 'color: #333333'})
        }
        return result
      }
    }
  ],
  detail: [
    { field: 'orderNumber', name: '序号', width: 50, fixed: 'left' },
    { field: 'orderId', name: '订单编号', mapping: 'orgName' },
    { field: 'certificateNumber', name: '凭证号' },
    { field: 'serialNumber', name: '流水号' },
    { field: 'changeTime', name: '记账时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'happenTime', name: '发生时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'summary', name: '摘要' },
    { field: 'receiveAmount', name: '收入金额(元)', width: 100, formatFun: 'formateMoney', stype: 'format' },
    { field: 'payAmount', name: '支出金额(元)', width: 100, formatFun: 'formateMoney', stype: 'format' },
    { field: 'balance', name: '余额(元)', width: 100, formatFun: 'formateMoney', stype: 'format' },
    { field: 'remark', name: '备注', formatFun: 'formateTextDeleteNULL', stype: 'format' },
    { field: 'otherAccountName', name: '对方户名' },
    { field: 'otherAccount', name: '对方账号' },
    { field: 'fundUse', name: '用途' }
  ]
}

export default columns
