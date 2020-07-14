const columns = {
  state: {
    op: [
      { field: 'userId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', show: { type: 'select', remote: true, subField: 'orgName', ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请输入企业名称' }, search: { type: 'text', placeholder: '请输入企业名称' } },
      { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' } },
      { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
      { field: 'mobile', name: '电话', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入电话' }, search: { type: 'text', placeholder: '请输入电话' } },
      { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
      { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 0 } },
      { field: 'baseRole', name: '账号类型', formatter: 'baseRole', show: { type: 'select', ou: 1, isDisabled: true, obj: 'baseRole', style: 'width: 90%;', placeholder: '请输入账号类型' }, search: { type: 'select', obj: 'baseRole', placeholder: '请输入企业名称' } },
      { field: 'status', name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', ou: 1, obj: 'status', placeholder: '请输入账号状态' } },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'resetpwd', name: '重置密码' }] }
    ]
  }
}

export default columns
