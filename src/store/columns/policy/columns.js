const columns = {
  state: {
    firmPrice: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '物流公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入物流公司名称' } },
      { field: 'operaterName', name: '操作人' },
      { field: 'operateDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'setting', name: '配置价格' }] }
    ],
    logisticsPriceConfig: [
      { field: 'gasstationName', name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'operaterName', name: '操作人' },
      { field: 'operateDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' },
      { field: 'price', name: '价格(元/公斤)' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'editSelf', name: '编辑' }] }
    ],
    logisticsPriceConfigEdit: [
      { field: 'price', name: '当前价格(元/公斤)', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'priceCurrent', name: '价格', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入价格' }, rules: [{ required: true, message: '请输入价格', trigger: 'blur' }] }
    ],
    gasPrice: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'gasstationName', stype: 'mapping', name: '加气站名称 ', mapping: 'gasstationName', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'operaterName', name: '操作人' },
      { field: 'operateDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'setting', name: '配置价格' }] }
    ],
    gasPriceConfig: [
      { field: 'orgName', name: '物流公司名称', fixed: 'left', search: { type: 'text', placeholder: '请输入物流公司名称' } },
      { field: 'operaterName', name: '操作人' },
      { field: 'operateDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' },
      { field: 'price', name: '价格(元/公斤)' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'editSelf', name: '编辑' }] }
    ],
    gasPriceConfigEdit: [
      { field: 'price', name: '当前价格(元/公斤)', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'priceCurrent', name: '价格', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入价格' }, rules: [{ required: true, message: '请输入价格', trigger: 'blur' }] }
    ],
    record: [
      { field: 'id', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '物流公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入物流公司名称' } },
      { field: 'gasstationName', name: '加气站名称 ', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'price', name: '价格(元/公斤)' },
      { field: 'createrName', name: '操作人' },
      { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' }
    ],
    sourceConfig: [
      { field: 'code', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'name', stype: 'mapping', name: '液源地', mapping: 'name', search: { type: 'text', placeholder: '请输入液源地' } },
      { field: 'price', name: '液源价格(元/吨)' },
      { field: 'operatorName', name: '操作人' },
      { field: 'operatorTime', name: '操作时间', formatFun: 'formateTData', stype: 'format' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'editSelf', name: '编辑' }, { type: 'price', name: '配置价格' }, { type: 'record', name: '变更记录' }] }
    ],
    sourceConfigPrice: [
      { field: 'name', name: '液源地', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'price', name: '当前液源价格', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'priceUpdate', name: '调整后液源价格', show: { type: 'text', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入调整后液源价格', trigger: 'blur' }] }
    ],
    sourceConfigEdit: [
      { field: 'name', name: '液源地名称', show: { type: 'text', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入液源地名称', trigger: 'blur' }] },
      { field: 'address', name: '详细地址', show: { type: 'text', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入详细地址', trigger: 'blur' }] },
      { field: 'pointAddress', name: '经纬度', show: { type: 'map', ou: 2, mulField: { longitude: 0, latitude: 1 }, sign: ',', style: 'width: 90%;', placeholder: '经纬度' }, rules: [{ required: true, message: '请选择经纬度', trigger: 'change' }] }
    ],
    sourceConfigRecord: [
      { field: 'name', name: '液源地', fiexed: 'left' },
      { field: 'price', name: '液源价格(元/吨)' },
      { field: 'operatorName', name: '操作人' },
      { field: 'operatorTime', name: '操作时间', formatFun: 'formateTData', stype: 'format' }
    ],
    gasStockList: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '加气站企业名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
      { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'stock', name: '库存量(公斤)' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'record', name: '入库记录' }] }
    ],
    gasStockListRecord: [
      { field: 'lngFromName', name: '液源地', fixed: 'left' },
      { field: 'downloadWeight', name: '入库量(kg)' },
      { field: 'completeTime', name: '时间', formatFun: 'formateTData', stype: 'format', sort: true }
    ],
    lngPlan: [
      { field: 'id', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '加气站企业名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
      { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'planTime', name: '期望到站日期' },
      { field: 'createTime', name: '提报时间' },
      { field: 'status', name: '状态', formatter: 'planStatus', search: { type: 'select', obj: 'planStatus', placeholder: '请选择状态' } },
      // { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'enter', name: '确认' }, { type: 'cancel', name: '取消' }, { type: 'detail', name: '详情' }] }
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: params => lngPlan(params) }
    ],
    carrierManConfig: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '物流公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入物流公司名称' }, show: { type: 'text', isDisabled: true, remote: true, subField: 'orgName', obj: 'orgId', style: 'width: 90%;', placeholder: '请输入物流公司名称' }, rules: [{ required: true, message: '请输入物流公司名称', trigger: 'blur' }] },
      { field: 'managerName', name: '营销合作经理姓名', search: { type: 'text', placeholder: '请输入营销合作经理姓名' } },
      { field: 'managerPhone', name: '营销合作经理电话' },
      { field: '', name: '营销合作经理', hide: true, show: { type: 'select', value: 0, obj: '', placeholder: '请选择' } },
      { field: 'operateDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'edit', name: '配置合作经理' }] }
    ],
    gasstationConfig: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'gasstationName', stype: 'mapping', name: '加气站名称', mapping: 'gasstationName', search: { type: 'text', placeholder: '请输入加气站名称' }, show: { type: 'text', isDisabled: true, remote: true, subField: 'orgName', obj: 'orgId', style: 'width: 90%;', placeholder: '请输入加气站名称' }, rules: [{ required: true, message: '请输入加气站名称', trigger: 'blur' }] },
      { field: 'managerName', name: '营销合作经理姓名', search: { type: 'text', placeholder: '请输入营销合作经理姓名' } },
      { field: 'managerPhone', name: '营销合作经理电话' },
      { field: '', name: '营销合作经理', hide: true, show: { type: 'select', value: 0, obj: '', placeholder: '请选择' } },
      { field: 'operateDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'edit', name: '配置合作经理' }] }
    ]
  }
}

// LNG计划管理状态函数
const lngPlan = (params) => {
  const status = params.row.status
  const list = [{ type: 'detail', name: '详情' }]
  if (status === 1 || status === 2 || status === 3 || status === 4) {
    list.unshift({ type: 'cancel', name: '取消' })
  }
  if (status === 2) {
    list.unshift({ type: 'write', name: '录入磅单' })
  } else if (status === 1 || status === 4) {
    list.unshift({ type: 'enter', name: '确认' })
  }
  return list
}

export default columns
