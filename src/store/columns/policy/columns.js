const columns = {
  state: {
    firmPrice: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '物流公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入物流公司名称' } },
      { field: 'operationName', name: '操作人' },
      { field: 'operationTime', name: '操作时间' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'setting', name: '配置价格' }] }
    ],
    gasPrice: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'gasstationName', stype: 'mapping', name: '加气站名称 ', mapping: 'gasstationName', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'operationName', name: '操作人' },
      { field: 'operationTime', name: '操作时间' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'setting', name: '配置价格' }] }
    ],
    record: [
      { field: 'id', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '物流公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入物流公司名称' } },
      { field: 'gasstationName', name: '加气站名称 ', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'price', name: '价格(元/公斤)' },
      { field: 'createrName', name: '操作人' }
    ],
    sourceConfig: [
      { field: 'code', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'name', stype: 'mapping', name: '液源地', mapping: 'name', search: { type: 'text', placeholder: '请输入液源地' } },
      { field: 'price', name: '液源价格(元/吨)' },
      { field: 'operatorName', name: '操作人' },
      { field: 'operatorTime', name: '操作时间' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'sefAdd', name: '添加' }, { type: 'sefEdit', name: '编辑' }, { type: 'price', name: '配置价格' }, { type: 'record', name: '变更记录' }] }
    ],
    gasStockList: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '加气站企业名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
      { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'stock', name: '库存量(公斤)' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'record', name: '入库记录' }] }
    ],
    lngPlan: [
      { field: 'id', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '加气站企业名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
      { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'planTime', name: '期望到站日期' },
      { field: 'createTime', name: '提报时间' },
      { field: 'status', name: '状态', formatter: 'planStatus', search: { type: 'select', obj: 'planStatus', placeholder: '请选择状态' } },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'enter', name: '确认' }, { type: 'cancel', name: '取消' }, { type: 'detail', name: '详情' }] }
    ]
  }
}

export default columns
