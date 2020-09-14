const columns = {
  rebate: [
    { field: 'beginRange', stype: 'fields', fieldList: ['beginRange', 'endRange'], sign: ' ≤ X < ', name: '优惠返利区间(吨)', fixed: 'left' },
    { field: 'rebate', name: '优惠返利金额(分/吨)' }
  ],
  rebateLog: [
    { field: 'operatorName', name: '操作人', fixed: 'left' },
    { field: 'operatorDate', name: '操作时间' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'search', name: '查看' }] }
  ],
  cost: [
    { field: 'operatorName', name: '操作人', fixed: 'left', ispush: false },
    { field: 'operatorDate', name: '操作时间', ispush: false },
    { field: 'amount', name: '长城奥扬费用(元/吨)', ispush: false },
    { field: 'operation', name: '长城奥扬运营费用', nameSpan: 8, hide: true, show: { type: 'text', style: 'width: 80%', util: ' 元/吨' } },
    { field: 'platform', name: '长城奥扬平台服务费', nameSpan: 8, hide: true, show: { type: 'text', style: 'width: 80%', util: ' 元/吨' } },
    { field: 'market', name: '长城奥扬市场开发费用', nameSpan: 8, hide: true, show: { type: 'text', style: 'width: 80%', util: ' 元/吨' } }
  ],
  profit: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName', fixed: 'left', search: { type: 'text', field: 'gasstationName', placeholder: '请输入加气站名称' }, ispush: false },
    { field: 'profitQuota', name: '加气站利润限额(元/公斤)', nameSpan: 9, show: { type: 'text', placeholder: '请输入加气站利润限额' }, rules: [{ required: true, message: '请输入加气站利润限额', trigger: 'blur' }] },
    { field: 'profit', name: '加气站利润(元/公斤)' },
    { field: 'operatorName', name: '操作人', ispush: false },
    { field: 'operatorDate', name: '操作时间', ispush: false },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', width: 140, fixed: 'right', list: [{ type: 'config', name: '配置' }, { type: 'change', name: '变更记录' }] }
  ],
  profitLog: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName', fixed: 'left' },
    { field: 'profitQuota', name: '加气站利润限额(元/公斤)' },
    { field: 'profit', name: '加气站利润(元/公斤)' },
    { field: 'operatorName', name: '操作人' },
    { field: 'operatorDate', name: '操作时间' }
  ]
}

export default columns
