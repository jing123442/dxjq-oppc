const columns = {
  rebate: [
    { field: 'beginRange', stype: 'fields', fieldList: ['beginRange', 'endRange'], sign: ' ≤ X < ', name: '优惠区间(公斤)', fixed: 'left' },
    { field: 'level', stype: 'rate', max: 3, isDisabled: true, name: '星级' },
    { field: 'rebate', name: '优惠金额(元/吨)' }
  ],
  rebateLog: [
    { field: 'operatorName', name: '操作人', fixed: 'left' },
    { field: 'operatorDate', name: '操作时间' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'list', name: '查看' }] }
  ],
  cost: [
    { field: 'operatorName', name: '操作人', fixed: 'left', ispush: false },
    { field: 'operatorDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', ispush: false },
    { field: 'amount', name: '长城奥扬费用(元/吨)', ispush: false },
    { field: 'operation', name: '长城奥扬运营费用', nameSpan: 8, hide: true, show: { type: 'text', style: 'width: 80%', util: ' 元/吨' } },
    { field: 'platform', name: '长城奥扬平台服务费', nameSpan: 8, hide: true, show: { type: 'text', style: 'width: 80%', util: ' 元/吨' } },
    { field: 'market', name: '长城奥扬市场开发费用', nameSpan: 8, hide: true, show: { type: 'text', style: 'width: 80%', util: ' 元/吨' } }
  ],
  profit: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'nickName', fixed: 'left', search: { type: 'text', field: 'nickName', placeholder: '请输入加气站名称' }, ispush: false },
    { field: 'profitQuota', name: '加气站利润限额(元/公斤)', nameSpan: 9, show: { type: 'text', placeholder: '请输入加气站利润限额' }, rules: [{ required: true, message: '请输入加气站利润限额', trigger: 'blur' }] },
    { field: 'profit', name: '加气站利润(元/公斤)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', width: 140, fixed: 'right', list: [{ type: 'config', name: '配置' }, { type: 'list', name: '变更记录' }] }
  ],
  profitLog: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'nickName', fixed: 'left' },
    { field: 'profitQuota', name: '加气站利润限额(元/公斤)' },
    { field: 'profit', name: '加气站利润(元/公斤)' },
    { field: 'operatorName', name: '操作人' },
    { field: 'operatorDate', name: '操作时间' }
  ],
  sourceConfig: [
    { field: 'code', name: '', stype: 'checkbox', align: 'center', fixed: 'left', hide: true, width: 50 },
    { field: 'name', name: '液源地', fixed: 'left', search: { type: 'text', placeholder: '请输入液源地' }, show: { type: 'text', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入液源地名称', trigger: 'blur' }] },
    { field: 'address', name: '详细地址', show: { type: 'text', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入详细地址', trigger: 'blur' }] },
    { field: 'price', name: '当前液源价格', hide: true, show: { type: 'hide', value: 0, style: 'width: 90%;' } },
    { field: 'operatorName', name: '操作人', ispush: false },
    { field: 'operatorTime', name: '操作时间', ispush: false, formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'pointAddress', name: '经纬度', hide: true, show: { type: 'map', ou: 2, mapKey: 'address', mulField: { longitude: 0, latitude: 1 }, iType: 'string', sign: ',', style: 'width: 90%;', placeholder: '经纬度' }, rules: [{ required: true, message: '请选择经纬度', trigger: 'change' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 100, list: [{ type: 'edit', name: '编辑' }] }
  ],
  sourceConfigPrice: [
    { field: 'name', name: '液源地', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'price', name: '当前液源价格', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'priceUpdate', name: '调整后液源价格', show: { type: 'text', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入调整后液源价格', trigger: 'blur' }] }
  ],
  sourceConfigEdit: [
    { field: 'name', name: '液源地名称', show: { type: 'text', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入液源地名称', trigger: 'blur' }] },
    { field: 'address', name: '详细地址', show: { type: 'text', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入详细地址', trigger: 'blur' }] },
    { field: 'pointAddress', name: '经纬度', show: { type: 'map', ou: 2, mulField: { longitude: 0, latitude: 1 }, style: 'width: 90%;', placeholder: '经纬度' }, rules: [{ required: true, message: '请选择经纬度', trigger: 'change' }] }
  ],
  sourceConfigRecord: [
    { field: 'name', name: '液源地', fiexed: 'left' },
    { field: 'price', name: '液源价格(元/吨)' },
    { field: 'operatorName', name: '操作人' },
    { field: 'operatorTime', name: '操作时间', formatFun: 'formateTData all', width: 140, stype: 'format' }
  ],
  carrierManConfig: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', hide: true, width: 50 },
    { field: 'orgName', name: '物流公司名称', nameSpan: 5, fixed: 'left', ispush: false, search: { type: 'text', placeholder: '请输入物流公司名称', nameSpan: 0 }, show: { type: 'text', isDisabled: true, style: 'width: 90%;', placeholder: '请输入物流公司名称' } },
    { field: 'managerInfo', name: '营销合作经理', stype: 'mapping', mapping: 'managerName', nameSpan: 5, show: { type: 'select', obj: 'userList', mulField: { managerId: 0, managerName: 1, managerPhone: 2 }, iType: 'string', placeholder: '请选择' }, search: { type: 'text', placeholder: '请输入营销合作经理', nameSpan: 0 } },
    { field: 'managerPhone', name: '营销合作经理电话', ispush: false },
    { field: 'operateDate', name: '操作时间', ispush: false, stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'edit', name: '配置合作经理' }] }
  ],
  gasstationConfig: [
    { field: 'gasstationId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'gasstationName', nameSpan: 5, name: '加气站名称', ispush: false, search: { type: 'text', placeholder: '请输入加气站名称', nameSpan: 0 }, show: { type: 'text', isDisabled: true, style: 'width: 90%;', placeholder: '请输入加气站名称' } },
    { field: 'managerInfo', name: '营销合作经理', stype: 'mapping', mapping: 'managerName', nameSpan: 5, show: { type: 'select', obj: 'userList', mulField: { managerId: 0, managerName: 1, managerPhone: 2 }, iType: 'string', placeholder: '请选择' }, search: { type: 'text', placeholder: '请输入营销合作经理', nameSpan: 0 } },
    { field: 'managerPhone', name: '营销合作经理电话', ispush: false },
    { field: 'operateDate', name: '操作时间', ispush: false, stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'edit', name: '配置合作经理' }] }
  ]
}

export default columns
