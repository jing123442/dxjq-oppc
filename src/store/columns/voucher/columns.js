import {dataPickerDefault, toolPickerOptions} from '@/utils/tools'

const columns = {
  listcc: [
    { field: 'orderNumber', name: '序号', width: 50, fixed: 'left' },
    { field: 'orderId', name: '订单编号', mapping: 'orgName' },
    { field: 'certificateNumber', name: '凭证号' },
  ],
  listxq: [
    { field: 'orderNumber', name: '序号', width: 50, fixed: 'left' },
    { field: 'orderId', name: '订单编号', mapping: 'orgName' },
    { field: 'certificateNumber', name: '凭证号', search: { type: 'select', name: '企业名称', remote: true, field: 'orgId', obj: 'orgId', findKey: 'orgName', paramKey: ['param', 'org'], placeholder: '企业名称', required: true } },
  ],
  list: [
    { field: 'serialNumber', name: '流水号' },
    { field: 'changeTime', name: '记账时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', model: 'daterange', dataType: 'rangeType', rangeNumber: 31, style: 'width: 350px;', format: 'yyyy-MM-dd', timeOptions: toolPickerOptions(0), value: (function() { const dateObj = dataPickerDefault(new Date(), 1, 'yyyy-MM-dd hh:mm:ss', 1); return [dateObj.start, dateObj.end] })() } },
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
  downloadcc: [
    { field: 'orgName', name: '企业名称', fixed: 'left' },
  ],
  downloadxq: [
    { field: 'orgName', name: '企业名称', fixed: 'left', search: { type: 'text-cache', placeholder: '请输入企业名称',
        action: { url: 'user/org/list', paramKey: ['param', 'org'], parse: ['data', 'records'], param: { page: 1, size: 10, param: { org: {} } } } } },
  ],
  download: [
    { field: 'orgShortName', name: '简称' },
    { field: 'changeTime', name: '期间', stype: 'fields', fieldList: ['startDate', 'endDate'], sign: ' 至 ', search: { type: 'date-picker', style: 'width: 350px;', dtime: ['00:00:00', '23:59:59'] } },
    { field: 'createTime', name: '申请时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'status', name: '状态', formatter: 'voucherStatus', search: { type: 'select', obj: 'voucherStatus', placeholder: '盖章状态' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', note: '工作日凌晨12点前申请下载的文件T+1后可下载盖章文件，需要紧急大量盖章或者异常导致的盖章失败，可下载未盖章流水联系通联转人工处理', fixed: 'right', width: 330, list: function (scope) {
        const row = scope.row
        const result =[{type: 'self_detail', name: '资金流水明细'}]

        if (row.noSealFilePath) {
          result.push({type: 'down_no', name: '下载未盖章流水'})
        }
        if (row.status == 1) {
          if (row.sealFilePath) {
            result.push({type: 'down_ok', name: '下载已盖章流水'})
          }
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
