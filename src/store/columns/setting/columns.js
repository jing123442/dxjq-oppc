const columns = {
  withdraw: [
    { field: 'orgTypeName', name: '账户类型', fixed: 'left' },
    { field: 'currentQuota', name: '现行余额限定(元)' },
    { field: 'note', name: '修改描述', hide: true },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'config', name: '编辑' }, { type: 'change', name: '变更记录' }] }
  ],
  withdrawLog: [
    { field: 'updateDate', name: '修改时间', fixed: 'left', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'updaterName', name: '修改人' },
    { field: 'updateQuota', name: '修改后(元)' },
    { field: 'note', name: '备注' }
  ]
}

export default columns
