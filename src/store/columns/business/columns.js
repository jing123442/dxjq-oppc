const columns = {
  org: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, show: { noShow: 1 } },
    { field: 'orgName', name: '企业名称', search: { type: 'text', placeholder: '请输入企业名称' } },
    { field: 'address', name: '地址' },
    { field: 'status', name: '企业状态', formatter: 'status' },
    { field: 'authStatus', name: '认证状态', formatter: 'authStatus' },
    { field: 'protocolNo', name: '转账协议', stype: 'link-status', value: null, label: '已签约', linkLabel: '去签约' },
    { field: 'contractNo', name: '提现协议', stype: 'link-status', value: null, label: '已签约', linkLabel: '去签约' },
    { field: 'bindPhone', name: '验证码手机号' },
    {
      field: 'useropts',
      stype: 'opt',
      ispush: false,
      name: '操作',
      fixed: 'right',
      width: 230,
      list: params => {
        const row = params.row
        const optList = []

        row.authStatus != 2 && optList.push({ type: 'gedit', name: '编辑' })
        optList.push({ type: 'detail', name: '详情' })
        row.authStatus != 2 && optList.push({ type: 'auth', name: '认证' })
        if (row.bindPhone) optList.push({ type: 'unbind', name: '解绑手机号' })
        else optList.push({ type: 'bind', name: '绑定手机号' })

        return optList
      }
    }
  ],
  orgDetail: [
    { field: 'orgName', nameSpan: 5, name: '公司名称', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'contacts', nameSpan: 5, name: '联系人', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'mobile', nameSpan: 5, name: '联系电话', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'address', nameSpan: 5, name: '地址', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'email', nameSpan: 5, name: '邮箱', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'legalperson', nameSpan: 5, name: '法人姓名', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'idCard', nameSpan: 5, name: '法人身份证号码', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'taxpayer', nameSpan: 5, name: '纳税人识别号', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'status', nameSpan: 5, name: '企业状态', show: { type: 'select', obj: 'status', style: 'width: 90%;', isDisabled: true } }
  ],
  account: [
    { field: 'orgId', nameSpan: 5, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'orgName', nameSpan: 5, name: '公司名称', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称！', trigger: 'blur' }] },
    { field: 'accountId', nameSpan: 5, name: '账号' },
    { field: 'accountType', nameSpan: 5, name: '资金账户类型', formatter: 'accountType' },
    { field: 'balance', nameSpan: 5, name: '账户余额(元)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'check', name: '流水列表' }, { type: 'cash', name: '提现' }] }
  ],
  accountList: [
    { field: 'id', nameSpan: 5, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'orgName', nameSpan: 5, name: '公司名称', search: { type: 'text', placeholder: '请输入公司名称' } },
    { field: 'billId', nameSpan: 5, name: '交易单号', search: { type: 'text', placeholder: '请输入交易单号' } },
    { field: 'changeAmount', nameSpan: 5, name: '交易类型' },
    { field: 'changeAmount', nameSpan: 5, name: '变化金额(元)' },
    { field: 'accountBalance', nameSpan: 5, name: '变化后金额(元)' },
    { field: 'createrName', nameSpan: 5, name: '创建人' },
    { field: 'createDate', nameSpan: 5, name: '创建时间', formatFun: 'formateTData', stype: 'format' },
    { field: 'orderId', nameSpan: 5, name: '订单编号' }
  ]
}

export default columns
