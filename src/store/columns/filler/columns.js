const columns = {
  firmList: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, show: { noShow: 1 } },
    { field: 'orgName', name: '企业名称', show: { type: 'text', ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请输入企业名称' }, search: { type: 'text', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }] },
    { field: 'address', name: '地址', show: { type: 'cascader', fieldList: ['address', 'areas'], formatter: 'address', obj: 'cascaderAddress', props: { value: 'label', label: 'label' }, iType: 'string', sign: '', ou: 1, noShow: 2, style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'change' }] },
    { field: 'areas', name: '详细地址', hide: true, show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入详细地址' }, rules: [{ required: true, message: '请输入详细地址！', trigger: 'blur' }] },
    { field: 'status', name: '状态', formatter: 'status' },
    { field: 'status', name: '认证状态', formatter: 'status' },
    { field: 'status', name: '账户余额扣款协议', formatter: 'status' },
    { field: 'status', name: '通联云商通合作协议', formatter: 'status' },
    { field: 'status', name: '绑定验证手机号', formatter: 'status' },
    { field: 'status', name: '创建时间', formatter: 'status' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'gedit', name: '编辑' }, { type: 'detail', name: '详情' }, { type: 'auth', name: '认证' }, { type: 'search', name: '查看收银员' }] }
  ],
  fillerAuth: [
    { field: 'status', name: '统一社会信用代码', show: { type: 'text', ou: 1 } },
    { field: 'status', name: '企业名称', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '法人姓名', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '法人联系电话', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '法人证件类型', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '法人证件号', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '纳税人识别号', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '企业对公账户', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '开户银行名称', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '开户行支行名称', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '支行行号', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '联系人', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '联系电话', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '邮箱', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '详细地址', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '企业状态', show: { type: 'text', ou: 3 } }
  ],
  fillerSAuth: [
    { field: 'status', name: '营业执照号', show: { type: 'text', ou: 1 } },
    { field: 'status', name: '税务登记证', show: { type: 'text', ou: 1 } },
    { field: 'status', name: '组机机构代码', show: { type: 'text', ou: 1 } },
    { field: 'status', name: '企业名称', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '法人姓名', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '法人联系电话', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '法人证件类型', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '法人证件号', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '纳税人识别号', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '企业对公账户', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '开户银行名称', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '开户行支行名称', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '支行行号', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '联系人', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '联系电话', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '邮箱', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '详细地址', show: { type: 'text', ou: 2 } },
    { field: 'status', name: '企业状态', show: { type: 'text', ou: 3 } }
  ],
  addGasStation: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'orgName', name: '公司名称', stype: 'mapping', mapping: 'orgName', show: { type: 'text', isDisabled: true, remote: true, ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请输入公司名称' } },
    { field: 'address', name: '详细地址', show: { type: 'text', ou: 1, style: 'width: 90%;', isDisabled: true, placeholder: '请输入公司名称' } },
    { field: 'gasstationName', name: '加气站名称', show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入加气站名称' }, rules: [{ required: true, message: '请输入加气站名称', trigger: 'blur' }] },
    { field: 'selectedOptions', name: '所在地区', show: { type: 'cascader', iType: 'string', ou: 2, obj: 'cascaderAddress', sign: '/', style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'blur' }] },
    { field: 'gasAddress', name: '详细地址', show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '详细地址' }, rules: [{ required: true, message: '请输入详细地址', trigger: 'blur' }] },
    { field: 'pointAddress', name: '经纬度', show: { type: 'map', ou: 2, mulField: { longitude: 0, latitude: 1 }, sign: ',', style: 'width: 90%;', placeholder: '经纬度' }, rules: [{ required: true, message: '请选择经纬度', trigger: 'change' }] },
    { field: 'timerPicker', name: '营业时间', show: { type: 'time-picker', ou: 2, range: true, style: 'width: 90%;', placeholder: '' }, rules: [{ required: true, message: '', trigger: 'blur' }] }
  ],
  info: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'orgName', stype: 'mapping', name: '加气站名称', mapping: 'orgName', show: { type: 'text', remote: true, ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入加气站企业名称' }, rules: [{ required: true, isDisable: true, message: '请输入加气站企业名称', trigger: 'blur' }] },
    { field: 'gasstationName', name: '加气站名称', show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入加气站名称' }, search: { type: 'text', placeholder: '请输入加气站名称' }, rules: [{ required: true, message: '请输入加气站名称', trigger: 'blur' }] },
    { field: 'listPrice', name: '加气站挂牌价(元/公斤)' },
    { field: 'listPrice', name: '平台挂牌价(元/公斤)' },
    { field: 'selectedOptions', hide: true, name: '所在地区', show: { type: 'cascader', iType: 'string', ou: 2, obj: 'cascaderAddress', sign: '/', style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'blur' }] },
    { field: 'address', hide: true, name: '详细地址', show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入详细地址' }, rules: [{ required: true, message: '请输入详细地址', trigger: 'blur' }] },
    { field: 'pointAddress', name: '经纬度', hide: true, show: { type: 'map', ou: 2, mulField: { longitude: 0, latitude: 1 }, sign: ',', style: 'width: 90%;', placeholder: '经纬度' }, rules: [{ required: true, message: '请选择经纬度', trigger: 'change' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 150, list: [{ type: 'edit', name: '编辑' }, { type: 'printer', name: '打印机' }] }
  ],
  printList: [
    { field: 'id', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, show: { noShow: 1 } },
    { field: 'printName', name: '打印机名称', show: { type: 'text', parent: 'printer', style: 'width: 90%;', placeholder: '请输入打印机名称' }, rules: [{ required: true, message: '请输入打印机名称', trigger: 'blur' }] },
    { field: 'machineCode', name: '终端号', show: { type: 'text', parent: 'printer', style: 'width: 90%;', placeholder: '请输入终端号' }, rules: [{ required: true, message: '请输入终端号', trigger: 'blur' }] },
    { field: 'msign', name: '密钥', show: { type: 'text', parent: 'printer', style: 'width: 90%;', placeholder: '请输入密钥' }, rules: [{ required: true, message: '请输入密钥', trigger: 'blur' }] },
    { field: 'phone', name: '流量卡号', show: { type: 'text', parent: 'printer', style: 'width: 90%;', placeholder: '请输入流量卡号' }, rules: [{ required: true, message: '请输入流量卡号', trigger: 'blur' }] },
    { field: 'status', name: '状态', formatter: 'printStatus', show: { noShow: 3 } },
    { field: 'print', name: '打印小票', show: { type: 'text', parent: 'printer', style: 'width: 90%;', placeholder: '请输入打印小票' }, rules: [{ required: true, message: '请输入打印小票', trigger: 'blur' }] },
    { field: 'voice', name: '音量', show: { type: 'text', parent: 'printer', style: 'width: 90%;', placeholder: '请输入音量' }, rules: [{ required: true, message: '请输入音量', trigger: 'blur' }] },
    // { field: 'print', name: '打印小票', formatter: 'status', show: { type: 'radio', value: 0, obj: 'status', placeholder: '请选择打印小票' }, rules: [{ required: true, message: '请选择打印小票！', trigger: 'blur' }] },
    // { field: 'voice', name: '音量', formatter: 'voiceStatus', show: { type: 'radio', value: 0, obj: 'voiceStatus', placeholder: '请选择音量' }, rules: [{ required: true, message: '请选择音量！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 90, list: [{ type: 'edit', name: '编辑' }] }
  ],
  account: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'accountId', name: '账号' },
    { field: 'balance', name: '账户余额' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 100, list: [{ type: 'check', name: '账号流水' }] }
  ],
  accountList: [
    { field: 'gasstationName', name: '加气站名称', fixed: 'left' },
    { field: 'orderId', name: '交易单号', show: { type: 'text' }, search: { type: 'text', placeholder: '请输入交易单号' } },
    { field: 'changeAmount', name: '交易类型' },
    { field: 'changeAmount', name: '变化金额' },
    { field: 'accountBalance', name: '变化后账户金额' },
    { field: 'createDate', name: '交易时间', stype: 'format', formatFun: 'formateTData', search: { type: 'date-picker', model: 'daterange' } },
    { field: 'note', name: '交易编号' }
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
    { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' }
  ],
  serviceChangeRecord: [
    { field: 'orgName', name: '加气站企业名称', fixed: 'left' },
    { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'platformFee', name: '平台服务费(元/公斤)' },
    { field: 'gasstationFee', name: '加气站服务费(元/公斤)' },
    { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' },
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
    { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' },
    { field: 'createrName', name: '操作人' }
  ]
}

export default columns
