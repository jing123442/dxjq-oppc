const columns = {
  state: {
    org: [
      { field: 'orgId', nameSpan: 10, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, show: { noShow: 1 } },
      { field: 'orgName', nameSpan: 10, name: '企业名称', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入企业名称' }, search: { type: 'text', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请输入企业名称！', trigger: 'blur' }, { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }] },
      { field: 'contacts', nameSpan: 10, name: '联系人', hide: true, show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入联系人' }, rules: [{ required: true, message: '请输入联系人！', trigger: 'blur' }] },
      { field: 'mobile', nameSpan: 10, name: '联系电话', hide: true, show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入联系电话' }, rules: [{ required: true, message: '请输入联系电话！', trigger: 'blur' }] },
      { field: 'address', nameSpan: 10, name: '地址', show: { type: 'cascader', fieldList: ['address', 'areas'], formatter: 'address', obj: 'cascaderAddress', props: { value: 'label', label: 'label' }, iType: 'string', sign: '', ou: 1, noShow: 2, style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'blur' }] },
      { field: 'email', nameSpan: 10, name: '邮箱', hide: true, show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入邮箱' } },
      { field: 'areas', nameSpan: 10, name: '详细地址', hide: true, show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入详细地址' }, rules: [{ required: true, message: '请输入详细地址！', trigger: 'blur' }] },
      { field: 'createDate', nameSpan: 10, name: '创建时间', formatFun: 'formateTData all', stype: 'format' },
      { field: 'createrName', nameSpan: 10, name: '创建人' },
      { field: 'status', nameSpan: 10, name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, search: { type: 'select', obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
      { field: 'legalperson', nameSpan: 10, name: '法人姓名', hide: true, show: { type: 'text', ou: 2, placeholder: '请输入法人姓名' }, rules: [{ required: true, message: '请输入法人姓名！', trigger: 'blur' }] },
      { field: 'idCardNo', nameSpan: 10, name: '身份证号码', hide: true, show: { type: 'text', ou: 2, placeholder: '请输入身份证号码' }, rules: [{ required: true, message: '请输入身份证号码！', trigger: 'blur' }] },
      { field: 'taxpayer', nameSpan: 10, name: '纳税人识别号', hide: true, show: { type: 'text', ou: 2, placeholder: '请输入纳税人识别号' }, rules: [{ required: true, message: '请输入纳税人识别号！', trigger: 'blur' }] },
      { field: 'bank', nameSpan: 10, name: '开户行', hide: true, show: { type: 'text', ou: 2, placeholder: '请输入开户行' }, rules: [{ required: true, message: '请输入开户行！', trigger: 'blur' }] },
      { field: 'account', nameSpan: 10, name: '银行账户', hide: true, show: { type: 'text', ou: 2, placeholder: '请输入银行账户' }, rules: [{ required: true, message: '请输入银行账户！', trigger: 'blur' }] },
      { field: 'orgType', nameSpan: 10, name: '', hide: true, show: { type: 'hide', ou: 2, value: 0 } },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'edit', name: '编辑' }, { type: 'detail', name: '详情' }] }
    ],
    orgDetail: [
      { field: 'orgName', nameSpan: 10, name: '公司名称', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'contacts', nameSpan: 10, name: '联系人', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'mobile', nameSpan: 10, name: '联系电话', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'address', nameSpan: 10, name: '地址', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'email', nameSpan: 10, name: '邮箱', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'legalperson', nameSpan: 10, name: '法人姓名', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'idCard', nameSpan: 10, name: '法人身份证号码', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'taxpayer', nameSpan: 10, name: '纳税人识别号', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'status', nameSpan: 10, name: '企业状态', show: { type: 'select', obj: 'status', style: 'width: 90%;', isDisabled: true } }
    ],
    account: [
      { field: 'orgId', nameSpan: 10, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', nameSpan: 10, name: '公司名称', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称！', trigger: 'blur' }] },
      { field: 'accountId', nameSpan: 10, name: '账号' },
      { field: 'balance', nameSpan: 10, name: '余额' },
      { field: 'createDate', nameSpan: 10, name: '创建时间', formatFun: 'formateTData', stype: 'format' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '账户流水', fixed: 'right', width: 110, list: [{ type: 'check', name: '查看' }] }
    ],
    accountList: [
      { field: 'id', nameSpan: 10, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orderId', nameSpan: 10, name: '单据流水id', search: { type: 'text', placeholder: '请输入单据流水id' } },
      { field: 'changeAmount', nameSpan: 10, name: '变化金额' },
      { field: 'accountBalance', nameSpan: 10, name: '变化后账户金额' },
      { field: 'createrName', nameSpan: 10, name: '创建人' },
      { field: 'createDate', nameSpan: 10, name: '创建时间', formatFun: 'formateTData', stype: 'format' },
      { field: 'note', nameSpan: 10, name: '摘要' }
    ]
  }
}

export default columns
