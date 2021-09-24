
const columns = {
  gasTankEquipment: [
    { field: 'containerNumber', name: '车载瓶编号', nameSpan: 6, fixed: 'left', show: { type: 'text', serial: 1, placeholder: '请输入车载瓶编号' }, rules: [{ required: true, message: '请输入车载瓶编号', tigger: 'blur' }] },
    { field: 'containerNorm', name: '规格编号', nameSpan: 6, show: { type: 'text', serial: 2, placeholder: '请输入规格编号' }},
    { field: 'validVolume', name: '有效容积（升）', nameSpan: 6, show: { type: 'text', serial: 3, placeholder: '请输入有效容积' } , rules: [{ required: true, message: '请输入有效容积', tigger: 'blur' }] },
    { field: 'nominalVolume', name: '公称容积（升）', nameSpan: 6, show: { type: 'text', serial: 4, placeholder: '请输入公称容积' }, rules: [{ required: true, message: '请输入公称容积', tigger: 'blur' }]  },
    { field: 'diameter', name: '气瓶直径（毫米）', nameSpan: 6, show: { type: 'text', serial: 5, placeholder: '请输入气瓶直径' }, rules: [{ required: true, message: '请输入气瓶直径', tigger: 'blur' }]  },
    { field: 'isUsed', name: '是否装车', formatter: 'isUsed', filters: [ { value: 0, text: '否' }, { value: 1, text: '是' }], nameSpan: 6,
      show: { type: 'radio', value: 1, obj: 'isUsed', placeholder: '请选择否装车', serial: 6,
        cascaderTypeList: [{ value: 0, fields: [{ truckId: 'span' }]}, { value: 1, fields: [{ truckId: 'select' }] }],
      },
      rules: [{ required: true, message: '请选择是否装车！', trigger: 'blur' }] },
    { field: 'truckId', name: '车牌号', nameSpan: 6, stype: 'mapping', mapping: 'carNumber', show: { type: 'select', serial: 7, subField: 'carNumber', obj: 'truckList', placeholder: '请选择车辆' }, rules: [{ required: true, message: '请选择车辆', tigger: 'blur' }] },
    { field: 'carNumberSearch', name: '车牌号', hide: true, search: { type: 'text', placeholder: '请输入车牌号/车载瓶编号',style: 'width: 250px;' }},
    { field: 'liter', name: '液量（升）'},
    { field: 'literPercent', name: '液量比（%）'},
    { field: 'pressure', name: '瓶内压力（MPa）' },
    { field: 'temperature', name: '瓶内温度（℃）' },
    { field: 'updateDate', name: '更新时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'opts', stype: 'opt', ispush: false, name: '操作', align: 'center', width: 160, fixed: 'right', list: [{ type: 'position', name: '位置'}, { type: 'equipment', name: '感知设备'}, { type: 'edit', name: '编辑' }, { type: 'del', name: '删除' }]  }
  ],
  gasLevelEquipment: [
    { field: 'gaugeNumber', name: '液位计编号', fixed: 'left', nameSpan: 6,  show: { type: 'text', serial: 1, placeholder: '请输入液位计编号' }, rules: [{ required: true, message: '请输入液位计编号', tigger: 'blur' }] },
    { field: 'canId', name: 'CAN ID', nameSpan: 6,  show: { type: 'text', serial: 6, placeholder: '请输入CAN ID' }, rules: [{ required: true, message: '请输入CAN ID', tigger: 'blur' }] },
    { field: 'gaugeNorm', name: '液位计规格编号', nameSpan: 6,  show: { type: 'text', serial: 2, placeholder: '请输入液位计规格编号' }, rules: [{ required: true, message: '请输入液位计规格编号', tigger: 'blur' }]},
    { field: 'isUsed', name: '是否使用', formatter: 'isUsed', filters: [ { value: 0, text: '否' }, { value: 1, text: '是' }], nameSpan: 6,
      show: { type: 'radio', value: 1, serial: 3, obj: 'isUsed', placeholder: '请选择是否使用',
        cascaderTypeList: [{ value: 0, fields: [{ truckId: 'span' }, { cooperationType: 'span' }, { canId: 'span' }, { containerNumber: 'span' }] }, { value: 1, fields: [{ truckId: 'select' }, { cooperationType: 'select' }, { canId: 'text' }, { containerNumber: 'text' }] }],
      },
      rules: [{ required: true, message: '请选择是否使用', trigger: 'blur' }] },
    { field: 'cooperationType', name: '合作方式', nameSpan: 6,  formatter: 'cooperationType', show: { type: 'select', serial: 4, obj: 'cooperationType', placeholder: '请选择合作方式', value: '0' }, rules: [{ required: true, message: '请选择合作方式', tigger: 'blur' }] },
    { field: 'truckId', name: '车牌号', nameSpan: 6, stype: 'mapping', mapping: 'carNumber', show: { type: 'select', serial: 5, subField: 'carNumber', obj: 'truckList', placeholder: '请选择车辆' }, rules: [{ required: true, message: '请选择车辆', tigger: 'blur' }] },
    { field: 'carNumberSearch', name: '车牌号', hide: true, search: { type: 'text', placeholder: '请输入车牌号/液位计编号',style: 'width: 250px;' }},
    { field: 'containerNumber', name: '气瓶编号', nameSpan: 6, show: { type: 'text', serial: 7, placeholder: '请输入气瓶编号' }, rules: [{ required: true, message: '请输入气瓶编号', tigger: 'blur' }] },
    { field: 'electricity', name: '电量（%）' },
    { field: 'signals', name: '信号' },
    { field: 'uploadTimes', name: '上报次数' },
    { field: 'period', name: '上报周期（分钟）'},
    { field: 'updateDate', name: '上报时间', formatFun: 'formateTData all', width: 140, stype: 'format'},
    { field: 'createDate', name: '设置时间 ', formatFun: 'formateTData all', width: 140, stype: 'format'},
    { field: 'roleopts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'messageLog', name: '报文日志'}, { type: 'setting', name: '设置参数'},{ type: 'edit', name: '编辑' }, { type: 'del', name: '删除' }] }
  ]
}

export default columns
