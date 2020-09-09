const columns = {
  listing: [
    { field: 'operatorName', name: '加气站', fixed: 'left' },
    { field: 'operatorName', name: '加气站地址' },
    { field: 'operatorDate', name: '平台挂牌价(元/公斤)' },
    { field: 'operatorDate', name: '长城奥扬出港价(元/吨)' },
    { field: 'operatorDate', name: '区域优惠政策(元/吨)' },
    { field: 'operatorDate', name: '运费(元/吨)' },
    { field: 'operatorDate', name: '加气站利润(元/公斤)' },
    { field: 'operatorDate', name: '液源地' },
    { field: 'operatorDate', name: '操作人' },
    { field: 'operatorDate', name: '操作时间' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'change', name: '变更记录' }] }
  ],
  departure: [
    { field: 'operatorName', name: '操作人', fixed: 'left', ispush: false },
    { field: 'operatorDate', name: '操作时间', ispush: false },
    { field: 'harbourPrice', name: '长城奥扬出港价(元/吨)', stype: 'format', formatFun: 'kiloToTon', show: { type: 'text' } }
  ],
  preferential: [
    { field: 'areaList', name: '地区(省市)', fixed: 'left', stype: 'fields', fieldList: ['province', 'city'], show: { type: 'cascader', obj: 'addressList', mulField: { province: 0, city: 1 }, props: { label: 'label', value: 'label', multiple: true } }, search: { type: 'text', field: 'keyWord', placeholder: '请选择地区(省市)' } },
    { field: 'lngFromId', name: '', hide: true },
    { field: 'benefit', name: '优惠(元/吨)', stype: 'format', formatFun: 'kiloToTon', show: { type: 'text' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'edit-s', name: '编辑' }, { type: 'del', name: '删除' }] }
  ],
  preferentialEdit: [
    { field: 'areaList', name: '地区(省市)', fixed: 'left', stype: 'fields', fieldList: ['province', 'city'], show: { type: 'cascader', obj: 'addressList', mulField: { province: 0, city: 1 }, isDisabled: true, props: { label: 'label', value: 'label', multiple: true } }, search: { type: 'text', field: 'keyWord', placeholder: '请选择地区(省市)' } },
    { field: 'lngFromId', name: '', hide: true },
    { field: 'benefit', name: '优惠(元/吨)', stype: 'format', formatFun: 'kiloToTon', show: { type: 'text' } }
  ],
  preferentialDel: [
    { field: 'lngFromId', name: '', hide: true, show: { type: 'hide' } },
    { field: 'info', name: '', lg: 24, xl: 24, show: { type: 'span', value: '确认要删除该记录！' } }
  ],
  estimate: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName', fixed: 'left' },
    { field: 'address', name: '加气站地址', ispush: false },
    { field: 'lngFromId', name: '', hide: true },
    { field: 'freight', name: '配置运费(元/吨)', nameSpan: 20, show: { type: 'text' }, rules: [{ required: true, message: '请输入配置运费', trigger: 'blur' }] },
    { field: 'calFreight', name: '计算运费(元/吨)', ispush: false },
    { field: 'mileage', name: '距液源地里程(公里)', ispush: false },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', width: 140, fixed: 'right', list: [{ type: 'config', name: '配置' }, { type: 'change', name: '变更记录' }] }
  ],
  estimateLog: [
    { field: 'operatorDate', name: '操作人', fixed: 'left' },
    { field: 'operatorDate', name: '操作时间' },
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName' },
    { field: 'freight', name: '配置运费(元/吨)' },
    { field: 'calFreight', name: '计算运费(元/吨)' },
    { field: 'mileage', name: '距液源地里程(公里)' }
  ],
  freight: [
    { field: 'beginRange', stype: 'fields', fieldList: ['beginRange', 'endRange'], sign: ' ≤ X < ', name: '里程区间(公里)', fixed: 'left' },
    { field: 'startPrice', name: '起步价(元/吨)' },
    { field: 'rate', name: '变动费率(元/吨)' }
  ],
  freightLog: [
    { field: 'operatorName', name: '操作人', fixed: 'left' },
    { field: 'operatorDate', name: '操作时间' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'search', name: '查看' }] }
  ],
  mileage: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName', fixed: 'left' },
    { field: 'address', name: '加气站地址', search: { type: 'text', field: 'keyWord', placeholder: '请输入加气站名称' } },
    { field: 'mileage', name: '距液源地里程(公里)', nameSpan: 14, show: { type: 'text' } },
    /* { field: 'operatorDate', name: '操作人' },
    { field: 'operatorDate', name: '操作时间' }, */
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: [{ type: 'edit', name: '配置' }, { type: 'change', name: '变更记录' }] }
  ],
  mileageLog: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName', fixed: 'left' },
    { field: 'mileage', name: '距液源地里程(公里)' },
    { field: 'operatorName', name: '操作人' },
    { field: 'operatorDate', name: '操作时间' }
  ],
  release: [
    { field: 'operatorName', name: '结算价发布时间', fixed: 'left' },
    { field: 'operatorName', name: '申请人', fixed: 'left' },
    { field: 'operatorDate', name: '申请时间' },
    { field: 'operatorDate', name: '状态' },
    { field: 'operatorDate', name: '审核人' },
    { field: 'operatorDate', name: '审核时间' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: [{ type: 'search', name: '查看' }, { type: 'change', name: '变更记录' }] }
  ]
}

export default columns
