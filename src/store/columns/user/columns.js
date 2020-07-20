const columns = {
  state: {
    op: [
      { field: 'userId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', show: { type: 'select', remote: true, subField: 'orgName', ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', placeholder: '请选择企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
      { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
      { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
      { field: 'mobile', name: '电话', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入电话' }, search: { type: 'text', placeholder: '请输入电话' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
      { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
      { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 0 } },
      { field: 'baseRole', name: '账号类型', formatter: 'baseRole', show: { type: 'radio', value: 1, ou: 1, isDisabled: true, obj: 'baseRole', placeholder: '请选择账号类型' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号类型' }, rules: [{ required: true, message: '请选择账号类型', trigger: 'blur' }] },
      { field: 'status', name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'resetpwd', name: '重置密码' }] }
    ],
    carrier: [
      { field: 'userId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', show: { type: 'select', remote: true, subField: 'orgName', ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', placeholder: '请选择企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
      { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
      { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
      { field: 'mobile', name: '电话', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入电话' }, search: { type: 'text', placeholder: '请输入电话' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
      { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
      { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 2 } },
      { field: 'baseRole', name: '账号类型', formatter: 'baseRole', show: { type: 'radio', value: 3, ou: 1, isDisabled: true, obj: 'baseRole', placeholder: '请选择账号类型' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号类型' }, rules: [{ required: true, message: '请选择账号类型', trigger: 'blur' }] },
      { field: 'status', name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'resetpwd', name: '重置密码' }] }
    ],
    cashier: [
      { field: 'userId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', show: { type: 'select', remote: true, subField: 'orgName', ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', placeholder: '请选择企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
      { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
      { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
      { field: 'mobile', name: '电话', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入电话' }, search: { type: 'text', placeholder: '请输入电话' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
      { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
      { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 1 } },
      { field: 'baseRole', name: '账号类型', formatter: 'baseRole', show: { type: 'radio', value: 5, ou: 1, isDisabled: true, obj: 'baseRole', placeholder: '请选择账号类型' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号类型' }, rules: [{ required: true, message: '请选择账号类型', trigger: 'blur' }] },
      { field: 'status', name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'resetpwd', name: '重置密码' }] }
    ]
  }
}

export default columns
