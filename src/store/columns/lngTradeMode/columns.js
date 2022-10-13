import { monthTimeArea } from '@/utils/tools'
const columns = {
  carrierDsConfig: [
    { field: 'orgName', name: '物流客户名称', fixed: 'left', search: { type: 'text', placeholder: '请输入物流客户名称' } },
    { field: 'tradeType', name: 'LNG交易模式', formatter: 'tradeType' },
    { field: 'updateDate', name: '配置更新时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'updaterName', name: '操作人' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'remove', name: '移出名单' }] }
  ],
  carDsConfig: [
    { field: 'carNumber', name: '车牌号', fixed: 'left', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入车牌号' } },
    { field: 'carrierOrgName', name: '物流客户名称', search: { type: 'text', placeholder: '请输入物流客户名称' } },
    // { field: 'content', name: '操作内容' },
    { field: 'content', name: '操作内容', nameSpan: 6, search: { type: 'select', serial: 2, nameSpan: 0, obj: 'optContent', placeholder: '操作内容', style: 'width: 100%', findStyle: 'width: 20%;' } },
    { field: 'operatorDate', name: '操作时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', findStyle: 'width: 55%;', style: 'width: 100%;', findField: 'operatorDate', dtime: ['00:00:00', '23:59:59'], value: (function() { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) }, currSearch: { type: 'select', subField: 'operatorDateName', hideName: true, obj: 'currDataSearch', style: 'width: 100%;', value: 'operatorDate', isDisabled: true } },
    { field: 'operatorName', name: '操作人' },
  ],
  fillerDsConfig: [
    { field: 'orgName', name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'tradeType', name: 'LNG交易模式', formatter: 'tradeType' },
    { field: 'updateDate', name: '配置更新时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'updaterName', name: '操作人' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'remove', name: '移出名单' }] }
  ],
  carrierOprateLog: [
    { field: 'carrierOrgName', name: '物流客户名称', fixed: 'left'},
    // { field: 'content', name: '操作内容' },
    { field: 'content', name: '操作内容', nameSpan: 6, search: { type: 'select', serial: 2, nameSpan: 0, obj: 'optContent', placeholder: '操作内容', style: 'width: 100%', findStyle: 'width: 20%;' } },
    // { field: 'operatorDate', name: '操作时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'operatorDate', name: '操作时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', findStyle: 'width: 58%;', style: 'width: 100%;', findField: 'operatorDate', dtime: ['00:00:00', '23:59:59'], value: (function() { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) }, currSearch: { type: 'select', subField: 'operatorDateName', hideName: true, obj: 'currDataSearch', style: 'width: 100%;', value: 'operatorDate', isDisabled: true } },
    { field: 'operatorName', name: '操作人' }
  ],
  fillerOprateLog: [
    { field: 'gasstationName', name: '加气站名称', fixed: 'left'},
    { field: 'content', name: '操作内容' },
    { field: 'operatorDate', name: '操作时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'operatorName', name: '操作人' }
  ]
}

export default columns
