const columns = {
  op: [
    { field: 'userId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', show: { type: 'select', remote: true, subField: 'orgName', findKey: 'orgName', paramKey: ['param', 'org'], ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', field: 'orgName', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
    { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
    { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
    { field: 'mobile', name: '手机号码', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入手机号码' }, search: { type: 'text', placeholder: '请输入手机号码' }, rules: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }] },
    { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
    { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 0 } },
    { field: 'baseRole', name: '账号类型', formatter: 'baseRole', show: { type: 'radio', value: 1, ou: 1, isDisabled: true, obj: 'baseRole', placeholder: '请选择账号类型' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号类型' }, rules: [{ required: true, message: '请选择账号类型', trigger: 'blur' }] },
    { field: 'status', name: '账号状态', formatter: 'status', width: 120, filters: [{ value: 0, text: '启用' }, { value: 1, text: '停用' }], show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'resetpwd', name: '重置密码' }] }
  ],
  carrier: [
    { field: 'userId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', show: { type: 'select', remote: true, subField: 'orgName', findKey: 'orgName', paramKey: ['param', 'org'], ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', field: 'orgName', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
    { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
    { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
    { field: 'mobile', name: '手机号码', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入手机号码' }, search: { type: 'text', placeholder: '请输入手机号码' }, rules: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }] },
    { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
    { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 2 } },
    { field: 'baseRole', name: '账号类型', formatter: 'baseRole', show: { type: 'radio', value: 6, ou: 1, isDisabled: true, obj: 'baseRole', placeholder: '请选择账号类型' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号类型' }, rules: [{ required: true, message: '请选择账号类型', trigger: 'blur' }] },
    { field: 'status', name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'resetpwd', name: '重置密码' }] }
  ],
  cashier: [
    { field: 'userId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', show: { type: 'select', remote: true, subField: 'orgName', findKey: 'orgName', paramKey: ['param', 'org'], ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', field: 'orgName', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
    { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
    { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
    { field: 'mobile', name: '手机号码', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入手机号码' }, search: { type: 'text', placeholder: '请输入手机号码' }, rules: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }] },
    { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
    { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 1 } },
    { field: 'baseRole', name: '账号类型', formatter: 'baseRole', show: { type: 'radio', value: 4, ou: 1, isDisabled: true, obj: 'baseRole', placeholder: '请选择账号类型' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号类型' }, rules: [{ required: true, message: '请选择账号类型', trigger: 'blur' }] },
    { field: 'status', name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'resetpwd', name: '重置密码' }] }
  ],
  business: [
    { field: 'orgId', stype: 'mapping', name: '企业名称', nameSpan: 6, mapping: 'orgName', show: { type: 'select', remote: true, findKey: 'orgName', paramKey: 'param', subField: 'orgName', ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请选择企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] }
  ]
}

export default columns
