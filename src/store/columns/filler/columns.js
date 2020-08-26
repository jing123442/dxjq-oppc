const columns = {
  state: {
    firmList: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '加气站企业名称', mapping: 'orgName', show: { type: 'text', remote: true, subField: 'orgName', ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请输入加气站企业名称' }, search: { type: 'text', placeholder: '请输入加气站企业名称' }, rules: [{ required: true, message: '请输入加气站企业名称', trigger: 'blur' }] },
      { field: 'selectedOptions', name: '所在地区', show: { type: 'text', ou: 1, noShow: 2, style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'blur' }] },
      { field: 'address', name: '地址', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入地址' }, rules: [{ required: true, message: '请输入地址', trigger: 'blur' }] },
      { field: 'status', name: '账号状态', formatter: 'status' },
      { field: 'account', name: '银行账户', hide: true, show: { type: 'text', ou: 2, isCompare: true, style: 'width: 90%;', placeholder: '请输入银行账户' }, rules: [{ required: true, message: '请输入银行账户', trigger: 'blur' }] },
      { field: 'bank', name: '开户行', hide: true, show: { type: 'text', ou: 2, isCompare: true, style: 'width: 90%;', placeholder: '请输入开户行' }, rules: [{ required: true, message: '请输入开户行', trigger: 'blur' }] },
      { field: 'taxpayer', name: '纳税人识别号', hide: true, show: { type: 'text', ou: 2, isCompare: true, style: 'width: 90%;', placeholder: '请输入纳税人识别号' }, rules: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }] },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'addGap', name: '添加加气站' }, { type: 'edit', name: '编辑' }] }
    ],
    gapList: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '加气站企业名称', mapping: 'orgName', show: { type: 'text', remote: true, subField: 'orgName', ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入加气站企业名称' }, rules: [{ required: true, isDisable: true, message: '请输入加气站企业名称', trigger: 'blur' }] },
      { field: 'gasstationName', name: '加气站名称', show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入加气站名称' }, search: { type: 'text', placeholder: '请输入加气站名称' }, rules: [{ required: true, message: '请输入加气站名称', trigger: 'blur' }] },
      { field: 'listPrice', name: '挂牌价（元/公斤）' },
      { field: 'status', name: '加气站状态', formatter: 'status', search: { type: 'select', obj: 'status', placeholder: '请选择状态' } },
      { field: 'cashierName', name: '收银员' },
      { field: 'selectedOptions', hide: true, name: '所在地区', show: { type: 'cascader', formatter: 'address', iType: 'string', ou: 2, obj: 'cascaderAddress', sign: '/', style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'blur' }] },
      { field: 'address', hide: true, name: '详细地址', show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入详细地址' }, rules: [{ required: true, message: '请输入详细地址', trigger: 'blur' }] },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: [{ type: 'bind', name: '绑定收银员' }, { type: 'edit', name: '编辑' }, { type: 'print', name: '打印机' }] }
    ],
    account: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '加气站企业名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
      { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'accountId', name: '账号' },
      { field: 'balance', name: '账户余额' },
      { field: 'createDate', name: '创建日期', formatFun: 'formateTData', stype: 'format' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: [{ type: 'check', name: '查看' }] }
    ],
    sevicePrice: [
      { field: 'orgId', nameSpan: 10, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', nameSpan: 10, name: '加气站企业名称', stype: 'mapping', mapping: 'orgName', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
      { field: 'gasstationName', nameSpan: 10, name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' }, show: { type: 'text', remote: true, subField: 'gasstationName', isDisabled: true, style: 'width: 90%;', placeholder: '请输入加气站名称' } },
      { field: 'platformFee', nameSpan: 10, name: '平台服务费（元/公斤）', show: { type: 'text', style: 'width: 90%;', placeholder: '请设置平台服务费' }, rules: [{ required: true, message: '请设置平台服务费', trigger: 'blur' }] },
      { field: 'gasstationFee', nameSpan: 10, name: '加气站服务费（元/公斤）', show: { type: 'text', style: 'width: 90%;', placeholder: '请设置加气站服务费' }, rules: [{ required: true, message: '请设置加气站服务费', trigger: 'blur' }] },
      { field: 'gasstationId', hide: true, show: { type: 'hide' } },
      { field: 'useropts', nameSpan: 10, stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: [{ type: 'edit', name: '修改' }, { type: 'record', name: '变更记录' }] }
    ],
    updatePrice: [
      { field: 'orgId', nameSpan: 10, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', nameSpan: 10, name: '加气站企业名称', stype: 'mapping', mapping: 'orgName', search: { type: 'text', placeholder: '请输入加气站企业名称' } },
      { field: 'gasstationName', nameSpan: 10, name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
      { field: 'listPrice', nameSpan: 10, name: '当前挂牌价（元/公斤）' },
      { field: 'useropts', nameSpan: 10, stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: [{ type: 'record', name: '变更记录' }] }
    ]
  }
}

export default columns
