import app from '../../modules/app'
const columns = {
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
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: params => lngPlan(params) }
  ],
  lngPlanDetail: [
    { field: 'orgName', nameSpan: 6, name: '加气站企业名称', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'gasstationName', nameSpan: 6, name: '加气站名称', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'downloadContactName', nameSpan: 6, name: '卸车联系人', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'downloadContactPhone', nameSpan: 6, name: '卸车联系人电话', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'planTime', nameSpan: 6, name: '期望送达时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'createTime', nameSpan: 6, name: '提报时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'businessContactName', nameSpan: 6, name: '平台联系人', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'businessContactPhone', nameSpan: 6, name: '平台联系电话', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'lngFromName', nameSpan: 6, name: '液源地', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'uploadWeight', nameSpan: 6, name: '出港量(公斤)', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'downloadWeight', nameSpan: 6, name: '实际到站量(公斤)', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'id', nameSpan: 6, name: '订单编号', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'confirmTime', nameSpan: 6, name: '确认时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'confirmerName', nameSpan: 6, name: '确认操作人', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'leaveTime', nameSpan: 6, name: '出港时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'leaverName', nameSpan: 6, name: '出港操作人', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'reachTime', nameSpan: 6, name: '签收时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'reacherName', nameSpan: 6, name: '签收操作人', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'completeTime', nameSpan: 6, name: '完成时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'completerName', nameSpan: 6, name: '完成操作人', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'cancelTime', nameSpan: 6, name: '取消时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'cancelerName', nameSpan: 6, name: '取消操作人', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'uploadUrl', nameSpan: 6, name: '出港重量图片', show: { type: 'file', isDialog: true, isDisabled: true, style: 'width: 90%;' } },
    { field: 'downloadUrl', nameSpan: 6, name: '到站重量图片', show: { type: 'file', isDialog: true, isDisabled: true, style: 'width: 90%;' } }
  ],
  lngPlanDepartures: [
    { field: 'uploadUrl', name: '加气站图片', filefield: 'file', serial: 9, show: { type: 'file', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: app.state.fileUrl, headers: app.state.fileHeaders, success: app.state.fileSuccess, listType: 'picture', style: 'width: 90%;', placeholder: '请上传加气站图片', node: [], rules: [{ required: true, message: '请上传加气站图片！', trigger: 'change' }] } },
    { field: 'uploadWeight', name: '出港重量(公斤)', nameSpan: 6, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入出港重量' }, rules: [{ required: true, message: '请输入出港重量', trigger: 'blur' }] },
    { field: 'lngFromCode', name: '液源地', nameSpan: 6, formatter: 'source', show: { type: 'select', subField: 'lngFromName', obj: 'source', style: 'width: 90%;', placeholder: '请选择' } }
  ],
  lngPlanComplete: [
    { field: 'downloadUrl', name: '加气站图片', filefield: 'file', serial: 9, show: { type: 'file', isDialog: true, props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, isDisabled: true, action: app.state.fileUrl, headers: app.state.fileHeaders, success: app.state.fileSuccess, listType: 'picture', style: 'width: 90%;', placeholder: '请上传加气站图片', node: [], rules: [{ required: true, message: '请上传加气站图片！', trigger: 'change' }] } },
    { field: 'downloadWeight', name: '到站重量(公斤)', nameSpan: 6, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入出港重量' }, rules: [{ required: true, message: '请输入出港重量', trigger: 'blur' }] }
  ],
  carrierManConfig: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', hide: true, width: 50 },
    { field: 'orgName', name: '物流公司名称', nameSpan: 5, fixed: 'left', ispush: false, search: { type: 'text', placeholder: '请输入物流公司名称' }, show: { type: 'text', isDisabled: true, style: 'width: 90%;', placeholder: '请输入物流公司名称' } },
    { field: 'managerInfo', name: '营销合作经理', stype: 'mapping', mapping: 'managerName', nameSpan: 5, show: { type: 'select', obj: 'userList', mulField: { managerId: 0, managerName: 1, managerPhone: 2 }, iType: 'string', placeholder: '请选择' }, search: { type: 'text', placeholder: '请输入营销合作经理' } },
    { field: 'managerPhone', name: '营销合作经理电话', ispush: false },
    { field: 'operateDate', name: '操作时间', ispush: false, stype: 'format', formatFun: 'formateTData' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'edit', name: '配置合作经理' }] }
  ],
  gasstationConfig: [
    { field: 'gasstationId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'gasstationName', nameSpan: 5, name: '加气站名称', ispush: false, search: { type: 'text', placeholder: '请输入加气站名称' }, show: { type: 'text', isDisabled: true, style: 'width: 90%;', placeholder: '请输入加气站名称' } },
    { field: 'managerInfo', name: '营销合作经理', stype: 'mapping', mapping: 'managerName', nameSpan: 5, show: { type: 'select', obj: 'userList', mulField: { managerId: 0, managerName: 1, managerPhone: 2 }, iType: 'string', placeholder: '请选择' }, search: { type: 'text', placeholder: '请输入营销合作经理' } },
    { field: 'managerPhone', name: '营销合作经理电话', ispush: false },
    { field: 'operateDate', name: '操作时间', ispush: false, stype: 'format', formatFun: 'formateTData' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'edit', name: '配置合作经理' }] }
  ]
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
    list.unshift({ type: (status == 1 ? 'enter' : 'complete'), name: '确认' })
  }
  return list
}

export default columns
