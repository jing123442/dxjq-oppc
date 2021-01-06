import file from '../../modules/file'

const columns = {
  org: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', hide: true, width: 50, show: { noShow: 1 } },
    { field: 'orgName', name: '企业名称', fixed: 'left', search: { type: 'text', placeholder: '请输入企业名称' } },
    { field: 'address', name: '地址' },
    { field: 'status', name: '企业状态', formatter: 'status' },
    { field: 'authStatus', name: '认证状态', formatter: 'authStatus' },
    { field: 'protocolNo', name: '转账协议', stype: 'link-status', value: null, label: '已签约', linkLabel: '去签约' },
    { field: 'contractNo', name: '提现协议', stype: 'link-status', value: null, label: '已签约', linkLabel: '去签约' },
    { field: 'regnumStatus', name: '营业执照认证', formatter: 'authStatus' },
    { field: 'idcardStatus', name: '法人证件认证', formatter: 'authStatus' },
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
        optList.push({ type: 'auth', name: '认证' })
        if (row.bindPhone) optList.push({ type: 'unbind', name: '解绑手机号' })
        else optList.push({ type: 'bind', name: '绑定手机号' })

        return optList
      }
    }
  ],
  orgAutn: [
    { field: 'taxpayerPic', name: '', ispush: false, filefield: 'file', xs: 8, sm: 8, md: 8, lg: 8, xl: 8, nameSpan: 2, hide: true, show: { type: 'file', ou: 3, props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传营业执照图片', node: [], rules: [{ required: true, message: '请上传营业执照图片！', trigger: 'change' }] } },
    { field: 'identityzPic', name: '', ispush: false, filefield: 'file', xs: 8, sm: 8, md: 8, lg: 8, xl: 8, nameSpan: 2, hide: true, show: { type: 'file', ou: 3, props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传法人身份证人像面图片', node: [], rules: [{ required: true, message: '请上传法人身份证人像面图片！', trigger: 'change' }] } },
    { field: 'identityfPic', name: '', ispush: false, filefield: 'file', xs: 8, sm: 8, md: 8, lg: 8, xl: 8, nameSpan: 2, hide: true, show: { type: 'file', ou: 3, props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上法人身份证国徽面图片', node: [], rules: [{ required: true, message: '请上法人身份证国徽面图片！', trigger: 'change' }] } }
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
    { field: 'orgId', nameSpan: 5, name: '', stype: 'checkbox', align: 'center', fixed: 'left', hide: true, width: 50 },
    { field: 'orgName', nameSpan: 5, name: '公司名称', fixed: 'left', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称！', trigger: 'blur' }] },
    { field: 'accountId', nameSpan: 5, name: '账号' },
    { field: 'accountType', nameSpan: 5, name: '资金账户类型', formatter: 'accountType' },
    { field: 'balance', nameSpan: 5, name: '账户余额(元)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 190, list: [{ type: 'check', name: '流水列表' }, { type: 'cash', name: '提现' }, { type: 'cashdetail', name: '提现明细' }] }
  ],
  accountList: [
    { field: 'createDate', nameSpan: 5, name: '交易时间', fixed: 'left', formatFun: 'formateTData all', width: 140, stype: 'format' },
    /* { field: 'billId', nameSpan: 5, name: '交易单号', search: { type: 'text', placeholder: '请输入交易单号' } }, */
    { field: 'type', nameSpan: 5, name: '交易类型', formatter: 'type' },
    { field: 'anotherAccount', name: '对方账号' },
    { field: 'anotherName', name: '对方账户名称' },
    { field: 'changeAmount', nameSpan: 5, name: '变化金额(元)' },
    { field: 'accountBalance', nameSpan: 5, name: '变化后金额(元)' },
    { field: 'note', nameSpan: 5, name: '摘要' },
    { field: 'orderId', nameSpan: 5, name: '订单编号' }
  ],
  accountDetail: [
    { field: 'withdrawOrderId', name: '提现单号', fixed: 'left' },
    { field: 'amount', name: '提现金额(元)' },
    { field: 'createDate', name: '提现时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '' } },
    { field: 'status', name: '状态', formatter: 'status', filters: [{ value: 12, text: '银行处理中' }, { value: 3, text: '提现成功' }, { value: 4, text: '失败' }] },
    { field: 'note', name: '备注' },
    {
      field: 'useropts',
      stype: 'opt',
      ispush: false,
      name: '操作',
      fixed: 'right',
      width: 150,
      list: params => {
        const row = params.row
        const optList = [{ type: 'detail', name: '详细' }]

        row.receiptUrl && optList.push({ type: 'receipt', name: '查看回单' })

        return optList
      }
    }
  ]
}

export default columns
