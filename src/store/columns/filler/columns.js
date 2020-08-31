const columns = {
  state: {
    firmList: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, show: { noShow: 1 } },
      { field: 'orgName', name: '加气站企业名称', show: { type: 'text', ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请输入加气站企业名称' }, search: { type: 'text', placeholder: '请输入加气站企业名称' }, rules: [{ required: true, message: '请输入加气站企业名称', trigger: 'blur' }] },
      { field: 'selectedOptions', name: '所在地区', show: { type: 'cascader', formatter: 'address', obj: 'cascaderAddress', sign: '/', ou: 1, noShow: 2, style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'blur' }] },
      { field: 'address', name: '地址', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入地址' }, rules: [{ required: true, message: '请输入地址', trigger: 'blur' }] },
      { field: 'status', name: '账号状态', formatter: 'status' },
      { field: 'orgType', name: '', hide: true, show: { noShow: 2 } },
      { field: 'account', name: '银行账户', hide: true, show: { type: 'text', ou: 2, isCompare: true, style: 'width: 90%;', placeholder: '请输入银行账户' }, rules: [{ required: true, message: '请输入银行账户', trigger: 'blur' }] },
      { field: 'bank', name: '开户行', hide: true, show: { type: 'text', ou: 2, isCompare: true, style: 'width: 90%;', placeholder: '请输入开户行' }, rules: [{ required: true, message: '请输入开户行', trigger: 'blur' }] },
      { field: 'taxpayer', name: '纳税人识别号', hide: true, show: { type: 'text', ou: 2, isCompare: true, style: 'width: 90%;', placeholder: '请输入纳税人识别号' }, rules: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }] },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'addGas', name: '添加加气站' }, { type: 'edit', name: '编辑' }] }
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
    gapList: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '加气站企业名称', mapping: 'orgName', show: { type: 'text', remote: true, ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入加气站企业名称' }, rules: [{ required: true, isDisable: true, message: '请输入加气站企业名称', trigger: 'blur' }] },
      { field: 'gasstationName', name: '加气站名称', show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入加气站名称' }, search: { type: 'text', placeholder: '请输入加气站名称' }, rules: [{ required: true, message: '请输入加气站名称', trigger: 'blur' }] },
      { field: 'listPrice', name: '挂牌价（元/公斤）' },
      { field: 'status', name: '加气站状态', formatter: 'status', search: { type: 'select', obj: 'status', placeholder: '请选择状态' } },
      { field: 'cashierName', name: '收银员' },
      { field: 'selectedOptions', hide: true, name: '所在地区', show: { type: 'cascader', formatter: 'address', iType: 'string', ou: 2, obj: 'cascaderAddress', sign: '/', style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'blur' }] },
      { field: 'address', hide: true, name: '详细地址', show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入详细地址' }, rules: [{ required: true, message: '请输入详细地址', trigger: 'blur' }] },
      { field: 'pointAddress', name: '经纬度', show: { type: 'map', ou: 2, mulField: { longitude: 0, latitude: 1 }, sign: ',', style: 'width: 90%;', placeholder: '经纬度' }, rules: [{ required: true, message: '请选择经纬度', trigger: 'change' }] },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: [{ type: 'bind', name: '绑定收银员' }, { type: 'edit', name: '编辑' }, { type: 'printer', name: '打印机' }] }
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
      { field: 'orgName', stype: 'mapping', name: '加气站企业名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
      { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'accountId', name: '账号' },
      { field: 'balance', name: '账户余额' },
      { field: 'createDate', name: '创建日期', formatFun: 'formateTData', stype: 'format' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'check', name: '查看' }] }
    ],
    accountList: [
      { field: 'gasstationName', name: '加气站名称', fixed: 'left' },
      { field: 'orderId', name: '单据流水id', show: { type: 'text' }, search: { type: 'text', placeholder: '请输入单据流水id' } },
      { field: 'changeAmount', name: '变化金额' },
      { field: 'accountBalance', name: '变化后账户金额' },
      { field: 'createrName', name: '创建人' },
      { field: 'createDate', name: '创建时间', stype: 'format', formatFun: 'formateTData' },
      { field: 'note', name: '摘要' }
    ],
    sevicePrice: [
      { field: 'orgId', nameSpan: 10, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', nameSpan: 10, name: '加气站企业名称', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
      { field: 'gasstationName', nameSpan: 10, name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' }, show: { type: 'text', remote: true, subField: 'gasstationName', isDisabled: true, style: 'width: 90%;', placeholder: '请输入加气站名称' } },
      { field: 'platformFee', nameSpan: 10, name: '平台服务费（元/公斤）', show: { type: 'text', style: 'width: 90%;', placeholder: '请设置平台服务费' }, rules: [{ required: true, message: '请设置平台服务费', trigger: 'blur' }] },
      { field: 'gasstationFee', nameSpan: 10, name: '加气站服务费（元/公斤）', show: { type: 'text', style: 'width: 90%;', placeholder: '请设置加气站服务费' }, rules: [{ required: true, message: '请设置加气站服务费', trigger: 'blur' }] },
      { field: 'gasstationId', hide: true, show: { type: 'hide' } },
      { field: 'useropts', nameSpan: 10, stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: [{ type: 'edit', name: '修改' }, { type: 'record', name: '变更记录' }] }
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
      { field: 'orgId', nameSpan: 10, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', nameSpan: 10, name: '加气站企业名称', stype: 'mapping', mapping: 'orgName', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
      { field: 'gasstationName', nameSpan: 10, name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'listPrice', nameSpan: 10, name: '当前挂牌价（元/公斤）' },
      { field: 'useropts', nameSpan: 10, stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: [{ type: 'record', name: '变更记录' }] }
    ],
    lngUpdatePrice: [
      { field: 'orgName', name: '加气站企业名称', fixed: 'left' },
      { field: 'gasstationName', name: '加气站名称' },
      { field: 'listPrice', name: '当前挂牌价（元/公斤）' },
      { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData' },
      { field: 'createrName', name: '操作人' }
    ]
  }
}

export default columns
