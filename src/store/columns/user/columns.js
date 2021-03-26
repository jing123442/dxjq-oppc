const columns = {
  op: [
    { field: 'userId', name: '', stype: 'checkbox', align: 'center', hide: true, fixed: 'left', width: 50 },
    { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', fixed: 'left', show: { type: 'select', remote: true, subField: 'orgName', findKey: 'orgName', paramKey: ['param', 'org'], ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', field: 'orgName', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
    { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
    { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
    { field: 'mobile', name: '手机号码', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入手机号码' }, search: { type: 'text', placeholder: '请输入手机号码' }, rules: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }] },
    { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
    { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 0 } },
    { field: 'baseRole', name: '账号角色', formatter: 'baseRole', show: { type: 'select', style: 'width: 90%;', ou: 1, isDisabled: true, obj: 'roleList', placeholder: '请选择账号角色' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号类型' }, rules: [{ required: true, message: '请选择账号角色', trigger: 'blur' }] },
    { field: 'status', name: '账号状态', formatter: 'status', width: 120, filters: [{ value: 0, text: '启用' }, { value: 1, text: '停用' }], show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'reset_pwd', name: '重置密码' }] }
  ],
  carrier: [
    { field: 'userId', name: '11', stype: 'checkbox', align: 'center', hide: true, fixed: 'left', width: 50 },
    { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', fixed: 'left', show: { type: 'select', remote: true, subField: 'orgName', findKey: 'orgName', paramKey: ['param', 'org'], ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', field: 'orgName', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
    { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
    { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
    { field: 'mobile', name: '手机号码', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入手机号码' }, search: { type: 'text', placeholder: '请输入手机号码' }, rules: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }] },
    { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
    { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 2 } },
    { field: 'baseRole', name: '账号角色', formatter: 'baseRole', show: { type: 'radio', value: 'driver', ou: 1, isDisabled: true, obj: 'baseRole', placeholder: '请选择账号角色' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号角色' }, rules: [{ required: true, message: '请选择账号角色', trigger: 'blur' }] },
    { field: 'status', name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'reset_pwd', name: '重置密码' }] }
  ],
  cashier: [
    { field: 'userId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', hide: true, width: 50 },
    { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', fixed: 'left', show: { type: 'select', remote: true, subField: 'orgName', findKey: 'orgName', paramKey: ['param', 'org'], ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', field: 'orgName', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
    { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
    { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
    { field: 'mobile', name: '手机号码', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入手机号码' }, search: { type: 'text', placeholder: '请输入手机号码' }, rules: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }] },
    { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
    { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 1 } },
    { field: 'baseRole', name: '账号角色', formatter: 'baseRole', show: { type: 'radio', value: 'cashier', ou: 1, isDisabled: true, obj: 'baseRole', placeholder: '请选择账号角色' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号角色' }, rules: [{ required: true, message: '请选择账号角色', trigger: 'blur' }] },
    { field: 'status', name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'reset_pwd', name: '重置密码' }] }
  ],
  business: [
    { field: 'orgId', stype: 'mapping', name: '企业名称', nameSpan: 6, mapping: 'orgName', show: { type: 'select', remote: true, findKey: 'orgName', paramKey: 'param', subField: 'orgName', ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请选择企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] }
  ],
  intention: [
    { field: 'userId', name: '客户ID', fixed: 'left', nameSpan: 5, detail: { type: 'span', placeholder: '客户ID' } },
    { field: 'userName', name: '客户姓名', nameSpan: 5, show: { type: 'text', placeholder: '请输入客户姓名' }, search: { type: 'text', style: 'width: 200px;', placeholder: '请输入                                                                                                                           姓名' }, detail: { type: 'span', placeholder: '客户姓名' }, rules: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }] },
    { field: 'mobile', name: '手机号', nameSpan: 5, show: { type: 'text', placeholder: '请输入手机号' }, detail: { type: 'span', placeholder: '手机号' }, search: { type: 'text', style: 'width: 200px;', placeholder: '请输入手机号' }, rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: 'isValidateMobile', message: '请输入正确格式的手机号', trigger: 'blur' }] },
    { field: 'createChannel', name: '登记渠道', nameSpan: 5, hide: true, formatter: 'channel', show: { type: 'span', model: 'select', obj: 'channel', placeholder: '请选择登记渠道', value: 1, dataType: 'number' }, detail: { type: 'span', model: 'select', obj: 'channel', placeholder: '' } },
    { field: 'status', name: '类型', nameSpan: 5, hide: true, formatter: 'status', detail: { type: 'span', model: 'select', obj: 'status', placeholder: '类型' } },
    { field: 'address', name: '常住地址', nameSpan: 5, hide: true, show: { type: 'text', placeholder: '请输入常住地址' }, detail: { type: 'span', placeholder: '类型' }, rules: [{ required: true, message: '请输入常住地址', trigger: 'blur' }] },
    { field: 'carrierOrgName', name: '挂靠物流公司', nameSpan: 5, hide: true, show: { type: 'text', placeholder: '请输入挂靠物流公司' }, detail: { type: 'span', placeholder: '类型' } },
    { field: 'frequentLine', name: '常跑路线', nameSpan: 5, hide: true, show: { type: 'text', placeholder: '请输入常跑路线' }, detail: { type: 'span', placeholder: '类型' }, rules: [{ required: true, message: '请输入常跑路线', trigger: 'blur' }] },
    { field: 'frequentGasstation', name: '常去加气站', nameSpan: 5, hide: true, show: { type: 'text', placeholder: '请输入常去加气站' }, detail: { type: 'span', placeholder: '类型' }, rules: [{ required: true, message: '请输入常去加气站', trigger: 'blur' }] },
    { field: 'fromChannel', name: '了解渠道', nameSpan: 5, hide: true, show: { type: 'text', placeholder: '请输入了解渠道' }, detail: { type: 'span', placeholder: '类型' } },
    { field: 'remark', name: '备注', nameSpan: 5, hide: true, show: { type: 'textarea', placeholder: '请输入备注' }, detail: { type: 'span', placeholder: '类型' } },
    { field: 'createDate', name: '创建时间', nameSpan: 5, stype: 'format', formatFun: 'formateTData all', detail: { type: 'span', stype: 'format', formatFun: 'formateTData all' } },
    {
      field: 'useropts',
      stype: 'opt',
      ispush: false,
      name: '操作',
      align: 'center',
      fixed: 'right',
      list: [
        { type: 'detail', size: 'small', icon: '', style: '', name: '详情' }
      ]
    }
  ]
}

export default columns
