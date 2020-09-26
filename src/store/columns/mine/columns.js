const columns = {
  personal: [
    { field: 'userName', name: '姓名', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'userCode', name: '账户', show: { type: 'text', style: 'width: 90%;' } },
    { field: 'mobile', name: '电话', show: { type: 'text', isCompare: true, style: 'width: 90%;' } }
  ],
  passwordChange: [
    { field: 'oldPassword', name: '旧密码', show: { type: 'password', style: 'width: 90%;' } },
    { field: 'newPassword', name: '新密码', show: { type: 'password', style: 'width: 90%;' } }
  ]
}

export default columns
