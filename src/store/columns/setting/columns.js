const columns = {
  district: [
    { field: 'districtName', name: '区域名称', fixed: 'left', show: { type: 'text', placeholder: '请输入区域名称' }, rules: [{ required: true, message: '请输入区域名称', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'config', name: '配置' }, { type: 'edit', name: '修改' }, { type: 'del', name: '删除' }] }
  ],
  withdraw: [
    { field: 'orgTypeName', name: '账户类型', fixed: 'left' },
    { field: 'currentQuota', name: '现行余额限定(元)' },
    { field: 'note', name: '修改说明', hide: true },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'config', name: '修改' }, { type: 'list', name: '变更记录' }] }
  ],
  withdrawLog: [
    { field: 'updateDate', name: '修改时间', fixed: 'left', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'updaterName', name: '修改人' },
    { field: 'updateQuota', name: '修改后(元)' },
    { field: 'note', name: '备注' }
  ]
}

export default columns
