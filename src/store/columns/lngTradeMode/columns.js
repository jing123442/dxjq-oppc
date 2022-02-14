
const columns = {
  carrierDsConfig: [
    { field: 'orgName', name: '物流客户名称', fixed: 'left', search: { type: 'text', placeholder: '请输入物流客户名称' } },
    { field: 'tradeType', name: '交易模式', formatter: 'tradeType' },
    { field: 'updateDate', name: '配置更新时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'updaterName', name: '操作人' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'remove', name: '移出名单' }] }
  ],
  fillerDsConfig: [
    { field: 'orgName', name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'tradeType', name: '交易模式', formatter: 'tradeType' },
    { field: 'updateDate', name: '配置更新时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'updaterName', name: '操作人' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'remove', name: '移出名单' }] }
  ],
  carrierOprateLog: [
    { field: 'nickName', name: '物流客户名称', fixed: 'left'},
    { field: 'content', name: '操作内容' },
    { field: 'operatorDate', name: '操作时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'operatorName', name: '操作人' }
  ],
  fillerOprateLog: [
    { field: 'nickName', name: '加气站名称', fixed: 'left'},
    { field: 'content', name: '操作内容' },
    { field: 'operatorDate', name: '操作时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'operatorName', name: '操作人' }
  ]
}

export default columns
