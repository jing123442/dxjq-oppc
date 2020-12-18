const columns = {
  listing: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName', fixed: 'left' },
    { field: 'address', name: '加气站地址', search: { type: 'text', field: 'keyWord', placeholder: '请输入名称/地址/操作人' } },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)' },
    { field: 'harbourPrice', name: '出港价(元/吨)' },
    { field: 'benefit', name: '区域优惠(元/吨)' },
    { field: 'freight', name: '运费(元/吨)' },
    { field: 'profit', name: '加气站利润(元/公斤)' },
    { field: 'gasprice', name: '气价调节(元/吨)' },
    { field: 'lngFromName', name: '液源地' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', width: 230, fixed: 'right', list: [{ type: 'from', name: '液源地选择' }, { type: 'change', name: '变更记录' }, { type: 'measure', name: '气价调节' }] }
  ],
  listingLog: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName', fixed: 'left' },
    { field: 'harbourPrice', name: '出港价(元/吨)' },
    { field: 'benefit', name: '区域优惠(元/吨)' },
    { field: 'freight', name: '运费(元/吨)' },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)' },
    { field: 'lngFromName', name: '液源地' },
    { field: 'applyName', name: '操作人' },
    { field: 'applyDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 }
  ],
  listingFrom: [
    { field: 'lngFromId', name: '液源地', placeholder: '请选择液源地！', show: { type: 'select', obj: 'fromList', subField: 'lngFromName' }, rules: [{ required: true, message: '请选择液源地', trigger: 'blur' }] }
  ],
  listingMeasure: [
    { field: 'measureMoney', name: '设置气价调节金额', nameSpan: 6, lg: 23, xl: 23, show: { type: 'text', placeholder: '请输入设置气价调节金额', util: ' 元/吨', style: 'width: 80%;' }, rules: [{ required: true, message: '请输入设置气价调节金额', trigger: 'blur' }] }
  ],
  listingRelease: [
    { field: 'releaseTime', name: '发布时间', nameSpan: 7, show: { type: 'date-picker', model: 'date' }, rules: [{ required: true, message: '请选择发布时间', trigger: 'blur' }] }
  ],
  departure: [
    { field: 'operatorName', name: '操作人', fixed: 'left', ispush: false },
    { field: 'operatorDate', name: '操作时间', ispush: false, stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'harbourPrice', name: '长城奥扬出港价(元/吨)', nameSpan: 8, show: { type: 'text' } }
  ],
  measure: [
    { field: 'operatorName', name: '操作人', fixed: 'left', ispush: false },
    { field: 'operatorDate', name: '操作时间', ispush: false, stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'gasprice', name: '气价调节(元/吨)', nameSpan: 8 }
  ],
  preferential: [
    { field: 'areaList', name: '地区(省市)', fixed: 'left', stype: 'fields', fieldList: ['province', 'city'], show: { type: 'cascader', obj: 'addressList', mulField: { province: 0, city: 1 }, props: { label: 'label', value: 'label', multiple: true } }, search: { type: 'text', field: 'keyWord', placeholder: '请输入地区(省市)' } },
    { field: 'lngFromId', name: '', hide: true },
    { field: 'benefit', name: '优惠(元/吨)', show: { type: 'text' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'edit-s', name: '编辑' }, { type: 'del', name: '删除' }] }
  ],
  preferentialEdit: [
    { field: 'areaList', name: '地区(省市)', fixed: 'left', stype: 'fields', fieldList: ['province', 'city'], show: { type: 'cascader', obj: 'addressList', mulField: { province: 0, city: 1 }, isDisabled: true, props: { label: 'label', value: 'label', multiple: true } }, search: { type: 'text', field: 'keyWord', placeholder: '请选择地区(省市)' } },
    { field: 'lngFromId', name: '', hide: true },
    { field: 'benefit', name: '优惠(元/吨)', show: { type: 'text' } }
  ],
  preferentialDel: [
    { field: 'lngFromId', name: '', hide: true, show: { type: 'hide' } },
    { field: 'info', name: '', lg: 24, xl: 24, show: { type: 'span', value: '确认要删除该记录！' } }
  ],
  estimate: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName', fixed: 'left', search: { type: 'text', field: 'keyWord', placeholder: '请输入加气站' } },
    { field: 'address', name: '加气站地址', ispush: false },
    { field: 'lngFromId', name: '', hide: true },
    { field: 'freight', name: '配置运费(元/吨)', nameSpan: 10, show: { type: 'text' }, rules: [{ required: true, message: '请输入配置运费', trigger: 'blur' }] },
    { field: 'calFreight', name: '计算运费(元/吨)', ispush: false },
    { field: 'mileage', name: '距液源地里程(公里)', ispush: false },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', width: 140, fixed: 'right', list: [{ type: 'config', name: '配置' }, { type: 'change', name: '变更记录' }] }
  ],
  estimateLog: [
    { field: 'operatorName', name: '操作人', fixed: 'left' },
    { field: 'operatorDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName' },
    { field: 'freight', name: '配置运费(元/吨)' },
    { field: 'calFreight', name: '计算运费(元/吨)' },
    { field: 'mileage', name: '距液源地里程(公里)' }
  ],
  freight: [
    { field: 'beginRange', stype: 'fields', fieldList: ['beginRange', 'endRange'], sign: ' ≤ X < ', name: '里程区间(公里)', fixed: 'left' },
    { field: 'startPrice', name: '起步价(元/吨/公里)' },
    { field: 'rate', name: '变动费率(元/吨/公里)' }
  ],
  freightLog: [
    { field: 'operatorName', name: '操作人', fixed: 'left' },
    { field: 'operatorDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'search', name: '查看' }] }
  ],
  mileage: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName', fixed: 'left' },
    { field: 'address', name: '加气站地址', search: { type: 'text', field: 'keyWord', placeholder: '请输入加气站名称' } },
    { field: 'mileage', name: '距液源地里程(公里)', nameSpan: 7, show: { type: 'text' } },
    /* { field: 'operatorDate', name: '操作人' },
    { field: 'operatorDate', name: '操作时间' }, */
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: [{ type: 'edit', name: '配置' }, { type: 'change', name: '变更记录' }] }
  ],
  mileageLog: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'gasstationName', fixed: 'left' },
    { field: 'mileage', name: '距液源地里程(公里)' },
    { field: 'operatorName', name: '操作人' },
    { field: 'operatorDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 }
  ],
  release: [
    { field: 'releaseTime', name: '结算价发布时间', fixed: 'left', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'applyName', name: '申请人', search: { type: 'text', field: 'keyWord', placeholder: '请输入申请人/操作人' } },
    { field: 'applyDate', name: '申请时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'status', name: '状态', formatter: 'status' },
    { field: 'auditName', name: '审核人' },
    { field: 'auditDate', name: '审核时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    {
      field: 'useropts',
      stype: 'opt',
      ispush: false,
      name: '操作',
      fixed: 'right',
      width: 130,
      align: 'left',
      list: (scope) => {
        const btnList = [{ type: 'search', name: '查看' }]
        if (scope.row.status == 1) {
          btnList.push({ type: 'pass', name: '通过' })
          btnList.push({ type: 'reject', name: '驳回' })
        }
        return btnList
      }
    }
  ],
  releaseLog: [
    { field: 'gasstationName', name: '加气站', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)' },
    { field: 'harbourPrice', name: '出港价(元/吨)' },
    { field: 'benefit', name: '区域优惠(元/吨)' },
    { field: 'freight', name: '运费(元/吨)' },
    { field: 'lngFromName', name: '液源地' }
  ]
}

export default columns
