import app from '../../modules/app'

const columns = {
  firmList: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, show: { noShow: 1 } },
    { field: 'orgName', name: '企业名称', show: { type: 'text', ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请输入企业名称' }, search: { type: 'text', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }] },
    { field: 'address', name: '地址', show: { type: 'cascader', fieldList: ['address', 'areas'], formatter: 'address', obj: 'cascaderAddress', props: { value: 'label', label: 'label' }, iType: 'string', sign: '', ou: 1, noShow: 2, style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'change' }] },
    { field: 'areas', name: '详细地址', hide: true, show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入详细地址' }, rules: [{ required: true, message: '请输入详细地址！', trigger: 'blur' }] },
    { field: 'status', name: '状态', formatter: 'status' },
    { field: 'authStatus', name: '认证状态', formatter: 'authStatus' },
    { field: 'protocolNo', name: '转账协议', stype: 'format', formatFun: 'tableStatusToLabel' },
    { field: 'contractNo', name: '提现协议', stype: 'format', formatFun: 'tableStatusToLabel' },
    { field: 'bindPhone', name: '绑定验证手机号' },
    { field: 'createDate', name: '创建时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    {
      field: 'useropts',
      stype: 'opt',
      ispush: false,
      name: '操作',
      fixed: 'right',
      width: 210,
      list: params => {
        const row = params.row
        const optList = []

        row.authStatus != 2 && optList.push({ type: 'gedit', name: '编辑' })
        optList.push({ type: 'detail', name: '详情' })
        row.authStatus != 2 && optList.push({ type: 'auth', name: '认证' })
        optList.push({ type: 'search', name: '查看收银员' })

        return optList
      }
    }
  ],
  fillerAuth: [
    { field: 'taxpayer', name: '统一社会信用代码', nameSpan: 6, show: { type: 'text', ou: 1 } },
    { field: 'orgName', name: '企业名称', nameSpan: 6, show: { type: 'text', ou: 2 }, rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }] },
    { field: 'legalperson', name: '法人姓名', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'legalPhone', name: '法人联系电话', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'identityType', name: '法人证件类型', nameSpan: 6, show: { type: 'select', ou: 2, obj: 'identityType' } },
    { field: 'legalIds', name: '法人证件号', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'taxpayer', name: '纳税人识别号', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'account', name: '企业对公账户', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'bank', name: '开户银行名称', nameSpan: 6, show: { type: 'select', obj: 'bankList', ou: 2 } },
    { field: 'bankName', name: '开户行支行名称', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'unionBank', name: '支行行号', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'contacts', name: '联系人', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'mobile', name: '联系电话', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'email', name: '邮箱', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'address', name: '详细地址', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'status', name: '企业状态', nameSpan: 6, show: { type: 'radio', ou: 2, obj: 'status', value: 0 } }
  ],
  fillerSAuth: [
    { field: 'businessLicense', name: '营业执照号', nameSpan: 6, show: { type: 'text', ou: 1 } },
    { field: 'taxRegister', name: '税务登记证', nameSpan: 6, show: { type: 'text', ou: 1 } },
    { field: 'organizationCode', name: '组机机构代码', nameSpan: 6, show: { type: 'text', ou: 1 } },
    { field: 'orgName', name: '企业名称', nameSpan: 6, show: { type: 'text', ou: 2 }, rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }] },
    { field: 'legalperson', name: '法人姓名', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'legalPhone', name: '法人联系电话', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'identityType', name: '法人证件类型', nameSpan: 6, show: { type: 'select', ou: 2, obj: 'identityType' } },
    { field: 'legalIds', name: '法人证件号', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'taxpayer', name: '纳税人识别号', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'account', name: '企业对公账户', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'bank', name: '开户银行名称', nameSpan: 6, show: { type: 'select', obj: 'bankList', ou: 2 } },
    { field: 'bankName', name: '开户行支行名称', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'unionBank', name: '支行行号', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'contacts', name: '联系人', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'mobile', name: '联系电话', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'email', name: '邮箱', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'address', name: '详细地址', nameSpan: 6, show: { type: 'text', ou: 2 } },
    { field: 'status', name: '企业状态', nameSpan: 6, show: { type: 'radio', ou: 2, obj: 'status', value: 0 } }
  ],
  fillerUser: [
    { field: 'userName', name: '用户姓名', fixed: 'left' },
    { field: 'userCode', name: '登录账号' },
    { field: 'mobile', name: '手机号码' },
    { field: 'lastLoginDate', name: '最后登录时间' },
    { field: 'status', name: '账号状态', formatter: 'status' }
  ],
  info: [
    { field: 'gasstationId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'gasstationName', name: '加气站名称', show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入加气站名称' }, search: { type: 'text', placeholder: '请输入加气站名称' }, rules: [{ required: true, message: '请输入加气站名称', trigger: 'blur' }] },
    { field: 'listPrice', name: '加气站挂牌价(元/公斤)', ispush: false },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)', ispush: false },
    { field: 'selectedOptions', hide: true, name: '所在地区', show: { type: 'cascader', iType: 'string', ou: 2, mulField: { province: 0, city: 1, region: 2 }, props: { value: 'label', label: 'label' }, obj: 'cascaderAddress', style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'blur' }] },
    { field: 'address', hide: true, name: '详细地址', show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入详细地址' }, rules: [{ required: true, message: '请输入详细地址', trigger: 'blur' }] },
    { field: 'pointAddress', name: '经纬度', hide: true, show: { type: 'map', ou: 2, mulField: { longitude: 0, latitude: 1 }, iType: 'string', sign: ',', style: 'width: 90%;', placeholder: '经纬度' }, rules: [{ required: true, message: '请选择经纬度', trigger: 'change' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 150, list: [{ type: 'edit', name: '编辑' }, { type: 'printer', name: '打印机' }] }
  ],
  printList: [
    { field: 'id', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, show: { noShow: 1 } },
    { field: 'printName', name: '打印机名称', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入打印机名称' }, rules: [{ required: true, message: '请输入打印机名称', trigger: 'blur' }] },
    { field: 'machineCode', name: '终端号', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入终端号' }, rules: [{ required: true, message: '请输入终端号', trigger: 'blur' }] },
    { field: 'msign', name: '密钥', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入密钥' }, rules: [{ required: true, message: '请输入密钥', trigger: 'blur' }] },
    { field: 'phone', name: '流量卡号', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入流量卡号' }, rules: [{ required: true, message: '请输入流量卡号', trigger: 'blur' }] },
    { field: 'status', name: '状态', formatter: 'printStatus', show: { noShow: 3 } },
    { field: 'print', name: '打印小票', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入打印小票' }, rules: [{ required: true, message: '请输入打印小票', trigger: 'blur' }] },
    { field: 'voice', name: '音量', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入音量' }, rules: [{ required: true, message: '请输入音量', trigger: 'blur' }] },
    // { field: 'print', name: '打印小票', formatter: 'status', show: { type: 'radio', value: 0, obj: 'status', placeholder: '请选择打印小票' }, rules: [{ required: true, message: '请选择打印小票！', trigger: 'blur' }] },
    // { field: 'voice', name: '音量', formatter: 'voiceStatus', show: { type: 'radio', value: 0, obj: 'voiceStatus', placeholder: '请选择音量' }, rules: [{ required: true, message: '请选择音量！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 90, list: [{ type: 'edit', name: '编辑' }] }
  ],
  account: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'orgName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'accountId', name: '账号' },
    { field: 'balance', name: '账户余额' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 100, list: [{ type: 'check', name: '流水列表' }] }
  ],
  accountList: [
    { field: 'createDate', name: '交易时间', fixed: 'left', stype: 'format', formatFun: 'formateTData all', width: 140, search: { type: 'date-picker', model: 'daterange' } },
    { field: 'billId', name: '交易单号', show: { type: 'text' }, search: { type: 'text', placeholder: '请输入交易单号' } },
    { field: 'type', name: '交易类型', formatter: 'type' },
    { field: 'anotherAccount', name: '对方账号' },
    { field: 'anotherName', name: '对方账户名称' },
    { field: 'changeAmount', name: '变化金额(元)' },
    { field: 'accountBalance', name: '变化后账户金额(元)' },
    { field: 'note', name: '摘要' },
    { field: 'orderId', name: '订单编号' }
  ],
  price: [
    { field: 'gasstationName', nameSpan: 5, name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'listPrice', nameSpan: 5, name: '当前挂牌价(元/公斤)' },
    { field: 'useropts', nameSpan: 5, stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 100, list: [{ type: 'record', name: '变更记录' }] }
  ],
  priceLog: [
    { field: 'gasstationName', nameSpan: 5, name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'listPrice', nameSpan: 5, name: '当前挂牌价(元/公斤)' },
    { field: 'createrName', name: '操作人' },
    { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 }
  ],
  serviceChangeRecord: [
    { field: 'orgName', name: '加气站企业名称', fixed: 'left' },
    { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'platformFee', name: '平台服务费(元/公斤)' },
    { field: 'gasstationFee', name: '加气站服务费(元/公斤)' },
    { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'createrName', name: '操作人' }
  ],
  updatePrice: [
    { field: 'orgId', nameSpan: 5, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'orgName', nameSpan: 5, name: '加气站企业名称', stype: 'mapping', mapping: 'orgName', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
    { field: 'gasstationName', nameSpan: 5, name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'listPrice', nameSpan: 5, name: '当前挂牌价（元/公斤）' },
    { field: 'useropts', nameSpan: 5, stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: [{ type: 'record', name: '变更记录' }] }
  ],
  lngUpdatePrice: [
    { field: 'orgName', name: '加气站企业名称', fixed: 'left' },
    { field: 'gasstationName', name: '加气站名称' },
    { field: 'listPrice', name: '当前挂牌价（元/公斤）' },
    { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'createrName', name: '操作人' }
  ],
  gasStockList: [
    { field: 'gasstationName', name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'stock', name: '库存量(公斤)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'record', name: '库存记录' }, { type: 'update', name: '库存调整' }] }
  ],
  gasUpdateStock: [
    { field: 'gasstationId', name: '', nameSpan: 6, show: { type: 'hide', isDisabled: true } },
    { field: 'stock', name: '当前库存(公斤)', nameSpan: 6, show: { type: 'text', isDisabled: true } },
    { field: 'increase', name: '调整重量(公斤)', nameSpan: 6, show: { type: 'text', placeholder: '请输入调整重量' } },
    { field: 'note', name: '摘要', nameSpan: 6, show: { type: 'textarea', placeholder: '请输入调整库存重量摘要' } }
  ],
  gasStockListRecord: [
    { field: 'createDate', name: '时间', fixed: 'left', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'stockType', name: '变更类型', formatter: 'stockType' },
    { field: 'quantity', name: '变更量(公斤)' },
    { field: 'stock', name: '变更后库存(公斤)' },
    { field: 'note', name: '摘要' }
  ],
  lngPlan: [
    { field: 'gasstationName', name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'planTime', name: '期望到站日期' },
    { field: 'createTime', name: '提报时间' },
    { field: 'status', name: '状态', formatter: 'planStatus', search: { type: 'select', obj: 'planStatus', placeholder: '请选择状态' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: params => lngPlan(params) }
  ],
  lngPlanDetail: [
    /* { field: 'orgName', nameSpan: 6, name: '加气站企业名称', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } }, */
    { field: 'gasstationName', nameSpan: 3, lg: 24, xl: 24, inputSpan: 21, name: '加气站名称', show: { type: 'text', isDisabled: true, style: 'width: 96%;' } },
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
    { field: 'uploadUrl', name: '上传出港磅单', filefield: 'file', nameSpan: 6, serial: 9, show: { type: 'file', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: app.state.fileUrl, headers: app.state.fileHeaders, success: app.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: app.state.fileHost, placeholder: '请上传加气站图片', node: [], rules: [{ required: true, message: '请上传加气站图片！', trigger: 'change' }] } },
    { field: 'uploadWeight', name: '出港重量(公斤)', nameSpan: 6, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入出港重量' }, rules: [{ required: true, message: '请输入出港重量', trigger: 'blur' }] },
    { field: 'lngFromCode', name: '液源地', nameSpan: 6, formatter: 'source', show: { type: 'select', subField: 'lngFromName', obj: 'source', style: 'width: 90%;', placeholder: '请选择' } }
  ],
  lngPlanComplete: [
    { field: 'downloadUrl', name: '出港磅单图片', filefield: 'file', nameSpan: 6, serial: 9, show: { type: 'file', isDialog: true, props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, isDisabled: true, action: app.state.fileUrl, headers: app.state.fileHeaders, success: app.state.fileSuccess, listType: 'picture', style: 'width: 90%;', placeholder: '请上传加气站图片', node: [], rules: [{ required: true, message: '请上传加气站图片！', trigger: 'change' }] } },
    { field: 'downloadWeight', name: '到站重量(公斤)', nameSpan: 6, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入到站重量' }, rules: [{ required: true, message: '请输入到站重量', trigger: 'blur' }] }
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
