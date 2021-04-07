import file from '../../modules/file'

/* eslint-disable */
const columns = {
  orgOAuth: [
    { field: 'taxpayer', name: '统一社会信用代码', nameSpan: 6, show: { type: 'text', ou: 1 }, detail: { type: 'span', ou: 1 } }
  ],
  orgSAuth: [
    { field: 'businessLicense', name: '营业执照号', nameSpan: 6, show: { type: 'text', ou: 1 }, detail: { type: 'span', ou: 1 } },
    { field: 'taxRegister', name: '税务登记证', nameSpan: 6, show: { type: 'text', ou: 1 }, detail: { type: 'span', ou: 1 } },
    { field: 'organizationCode', name: '组机机构代码', nameSpan: 6, show: { type: 'text', ou: 1 }, detail: { type: 'span', ou: 1 } }
  ],
  orgAuthInfo: [
    { field: 'orgName', name: '企业名称', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 }, rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }] },
    { field: 'legalperson', name: '法人姓名', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 } },
    { field: 'legalPhone', name: '法人联系电话', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 }, rules: [{ validator: 'isValidateMobile', message: '请输入正确格式的法人联系电话', trigger: 'blur' }] },
    { field: 'identityType', name: '法人证件类型', nameSpan: 6, show: { type: 'select', ou: 2, obj: 'identityType' }, detail: { type: 'span', model: 'select', obj: 'identityType', ou: 2 } },
    { field: 'legalIds', name: '法人证件号', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 } },
    { field: 'taxpayer', name: '纳税人识别号', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 } },
    { field: 'account', name: '企业对公账户', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 } },
    { field: 'bank', name: '开户银行名称', nameSpan: 6, show: { type: 'select', obj: 'bankList', ou: 2 }, detail: { type: 'span', ou: 2 } },
    { field: 'bankName', name: '开户行支行名称', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 } },
    { field: 'unionBank', name: '支行行号', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 }, rules: [{ validator: 'isValidateUnionBank', message: '请输入正确格式的支行行号', trigger: 'blur' }] },
    { field: 'contacts', name: '联系人', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 } },
    { field: 'mobile', name: '联系电话', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 }, rules: [{ validator: 'isValidateMobile', message: '请输入正确格式的联系电话', trigger: 'blur' }] },
    { field: 'email', name: '邮箱', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 } },
    { field: 'address', name: '详细地址', nameSpan: 6, show: { type: 'text', ou: 2 }, detail: { type: 'span', ou: 2 } },
    { field: 'status', name: '企业状态', nameSpan: 6, show: { type: 'radio', ou: 2, obj: 'status', value: 0 }, detail: { type: 'span', model: 'select', ou: 2, obj: 'status' } },
    { field: 'authDate', name: '认证时间', nameSpan: 6, detail: { type: 'span', ou: 2, stype: 'format', formatFun: 'formateTData all' } }
  ],
  orgAuthManageInfo: [
    { field: 'manageInfo', name: '管理员', xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 3, detail: { type: 'span', ou: 3, style: 'width: 97.5%' } }
  ],
  orgAuthContractInfo: [
    { field: 'contractStatus', name: '合同状态', nameSpan: 6, detail: { type: 'span', ou: 5, stype: 'format', formatFun: 'tableContractStatusToLabel' } },
    { field: 'contractDate', name: '签约完成时间', nameSpan: 6, detail: { type: 'span', ou: 5 } }
  ],
  orgAuthOther: [
    { field: 'bindPhone', name: '提现手机号绑定', nameSpan: 6, detail: { type: 'span', ou: 6 } },
    { field: 'contractNo', name: '提现协议', nameSpan: 6, detail: { type: 'span', ou: 6, stype: 'format', formatFun: 'tableStatusToLabel' } },
    { field: 'protocolNo', name: '转账协议', nameSpan: 6, detail: { type: 'span', ou: 6, stype: 'format', formatFun: 'tableStatusToLabel' } }
  ],
  orgAuthCarrierInfo: [
    { field: 'yyzzPic', name: '营业执照照片', nameSpan: 6, detail: { type: 'span', ou: 4 } },
    { field: 'yyzzPicDate', name: '营业执照认证时间', nameSpan: 6, detail: { type: 'span', ou: 4 } },
    { field: 'sfzghPicDate', name: '法人身份证认证时间', xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 3, detail: { type: 'span', ou: 4, style: 'width: 40.5%' } },
    { field: 'sfzrlPic', name: '法人身份证人物面', nameSpan: 6, detail: { type: 'span', ou: 4 } },
    { field: 'sfzghPic', name: '法人身份证国徽面', nameSpan: 6, detail: { type: 'span', ou: 4 } },
    { field: 'dlysPic', name: '道路运输许可证', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4 } },
    { field: 'dlysPicDate', name: '道路运输许可证认证时间', nameSpan: 6, detail: { type: 'span', ou: 4 } }
  ],
  // 用户信息
  userBaseInfo: [
    {
      field: 'userId', name: '客户ID', fixed: 'left', nameSpan: 6,
      detail: { type: 'span', placeholder: '客户ID', ou: 0 }
    }, {
      field: 'openId', name: '微信openid', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '微信openid', ou: 0 }
    }, {
      field: 'userName', name: '姓名(昵称)', nameSpan: 6,
      search: { type: 'text', style: 'width: 200px;', placeholder: '请输入姓名' },
      detail: { type: 'span', placeholder: '客户姓名', ou: 0 }
    }, {
      field: 'baseRole', name: '类型', nameSpan: 6, hide: true, formatter: 'baseRole',
      detail: { type: 'span', model: 'select', obj: 'baseRole', placeholder: '类型', ou: 0 }
    }, {
      field: 'nickname', name: '微信昵称', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '微信昵称', ou: 0 }
    }, {
      field: 'mobile', name: '手机号', nameSpan: 6,
      detail: { type: 'span', placeholder: '手机号', ou: 0 },
      search: { type: 'text', style: 'width: 200px;', placeholder: '请输入手机号' },
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: 'isValidateMobile', message: '请输入正确格式的手机号', trigger: 'blur' }]
    }, {
      field: 'province', name: '省份', nameSpan: 6, hide: true,
      detail: { type: 'span', ou: 0 }
    }, {
      field: 'city', name: '城市', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '城市', ou: 0 }
    }, {
      field: 'createDate', name: '注册时间', nameSpan: 6, hide: true,
      detail: { type: 'span', stype: 'format', formatFun: 'formateTData all', ou: 0 }
    }, {
      field: 'lastLoginDate', name: '最后登录时间', nameSpan: 6, stype: 'format', formatFun: 'formateTData all',
      detail: { type: 'span', stype: 'format', formatFun: 'formateTData all', ou: 0 }
    }, {
      field: 'status', name: '状态', formatter: 'status', nameSpan: 6, width: 80,
      detail: { type: 'span', model: 'select', obj: 'status', ou: 0 }
    }, {
      field: 'sex', name: '性别', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '性别', model: 'select', obj: 'sex', ou: 0 }
    }
  ],
  userAuthInfo: [
    {
      field: 'realname', name: '姓名', nameSpan: 6, hide: true,
      detail: { type: 'span', model: 'select', obj: 'sex', ou: 1 }
    }, {
      field: 'idcardNo', name: '身份证号', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '性别', model: 'select', obj: 'sex', ou: 1 }
    }, {
      field: 'authDate', name: '身份认证时间', xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 3, hide: true,
      detail: { type: 'span', placeholder: '性别', model: 'select', style: 'width: 40.7%;', obj: 'sex', ou: 1 }
    }, {
      field: 'idcardFaceUrl', name: '身份证人物面', nameSpan: 6, hide: true,
      detail: { type: 'span', model: 'img',vague: true, vagueType: 'style', ou: 1, fileHost: file.state.fileHost }
    }, {
      field: 'idcardBackUrl', name: '身份证国徽面', nameSpan: 6, hide: true,
      detail: { type: 'span', model: 'img',vague: true, vagueType: 'style', ou: 1 }
    }
  ],
  userIntentionOptsInfo: [{
      field: 'useropts', stype: 'opt', ispush: false, name: '操作', align: 'center', fixed: 'right',
      list: [{ type: 'detail', size: 'small', icon: '', style: '', name: '详情' }]
  }]
}

export default columns
