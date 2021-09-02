import file from '../../modules/file'

/* eslint-disable */
const columns = {
  orgOAuth: [
    { field: 'taxpayer', name: '统一社会信用代码', nameSpan: 6, show: { type: 'text', ou: 1, placeholder: '请输入统一社会信用代码' }, detail: { type: 'span', ou: 1 } }
  ],
  orgSAuth: [
    { field: 'businessLicense', name: '营业执照号', nameSpan: 6, show: { type: 'text', ou: 1, placeholder: '请输入营业执照号' }, detail: { type: 'span', ou: 1 } },
    { field: 'taxRegister', name: '税务登记证', nameSpan: 6, show: { type: 'text', ou: 1, placeholder: '请输入税务登记证' }, detail: { type: 'span', ou: 1 } },
    { field: 'organizationCode', name: '组机机构代码', nameSpan: 6, show: { type: 'text', ou: 1, placeholder: '请输入组机机构代码' }, detail: { type: 'span', ou: 1 } }
  ],
  orgAuthInfo: [
    { field: 'orgName', name: '企业名称', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入企业名称' }, detail: { type: 'span', ou: 2 }, rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }] },
    { field: 'legalperson', name: '法人姓名', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入法人姓名' }, detail: { type: 'span', ou: 2 } },
    { field: 'legalPhone', name: '法人联系电话', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入法人联系电话' }, detail: { type: 'span', ou: 2 }, rules: [{ validator: 'isValidateMobile', message: '请输入正确格式的法人联系电话', trigger: 'blur' }] },
    { field: 'identityType', name: '法人证件类型', nameSpan: 6, show: { type: 'select', ou: 2, obj: 'identityType', placeholder: '请选择法人证件类型' }, detail: { type: 'span', model: 'select', obj: 'identityType', ou: 2 } },
    { field: 'legalIds', name: '法人证件号', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入法人证件号' }, detail: { type: 'span', ou: 2 } },
    { field: 'cardValidDatetime', name: '法人证件有效期', nameSpan: 6, show: { type: 'date-picker', model: 'daterange', format: 'yyyy-MM-dd', ou: 2, placeholder: '请输入法人证件有效期', dtime: ['00:00:00', '00:00:00'] }, detail: { type: 'span', stype: 'format', formatFun: 'cardValidDatetime', ou: 2 } },
    { field: 'taxpayer', name: '纳税人识别号', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入纳税人识别号' }, detail: { type: 'span', ou: 2 } },
    { field: 'account', name: '企业对公账户', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入企业对公账户' }, detail: { type: 'span', ou: 2 } },
    { field: 'bank', name: '开户银行名称', nameSpan: 6, show: { type: 'select', obj: 'bankList', ou: 2, placeholder: '请选择开户银行名称' }, detail: { type: 'span', ou: 2 } },
    { field: 'bankName', name: '开户行支行名称', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入开户行支行名称' }, detail: { type: 'span', ou: 2 } },
    { field: 'unionBank', name: '支行行号', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入支行行号' }, detail: { type: 'span', ou: 2 }, rules: [{ validator: 'isValidateUnionBank', message: '请输入正确格式的支行行号', trigger: 'blur' }] },
    { field: 'contacts', name: '联系人', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入联系人' }, detail: { type: 'span', ou: 2 } },
    { field: 'mobile', name: '联系电话', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入联系电话' }, detail: { type: 'span', ou: 2 }, rules: [{ validator: 'isValidateMobile', message: '请输入正确格式的联系电话', trigger: 'blur' }] },
    { field: 'email', name: '邮箱', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入邮箱' }, detail: { type: 'span', ou: 2 } },
    { field: 'address', name: '详细地址', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入详细地址' }, detail: { type: 'span', ou: 2 } },
    { field: 'authDate', name: '认证时间', nameSpan: 6, detail: { type: 'span', ou: 2, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'status', name: '企业状态', nameSpan: 6, show: { type: 'radio', ou: 2, obj: 'status', value: 0 }, detail: { type: 'radio', ou: 2, obj: 'status', value: 0 } }
  ],
  selfAuthInfo: [
    { field: 'taxpayer', name: '统一社会信用代码', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入统一社会信用代码' }, detail: { type: 'span', ou: 2 } },
    { field: 'orgName', name: '企业名称', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入企业名称' }, detail: { type: 'span', ou: 2 }, rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }] },
    { field: 'legalperson', name: '经营者姓名', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入经营者姓名' }, detail: { type: 'span', ou: 2 } },
    { field: 'identityType', name: '经营者证件类型', nameSpan: 6, show: { type: 'select', ou: 2, obj: 'identityType', placeholder: '请选择经营者证件类型' }, detail: { type: 'span', model: 'select', obj: 'identityType', ou: 2 } },
    { field: 'legalIds', name: '经营者证件号', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入经营者证件号' }, detail: { type: 'span', ou: 2 } },
    { field: 'address', name: '详细地址', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入详细地址' }, detail: { type: 'span', ou: 2 } }
  ],
  gasstationFieldInfo: [
    { field: 'orgShortName', name: '加气站名称', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入加气站名称' }, detail: { type: 'span', ou: 2 }, rules: [{ required: true, message: '请输入加气站名称', trigger: 'blur' }] },
  ],
  carrierFieldInfo: [
    { field: 'orgSubType', name: '客户类型', nameSpan: 6, show: { type: 'hide', ou: 2, value: 21 }, detail: { type: 'span', model: 'select', obj: 'orgSubType', cascaderList: [{ value: 22, fields: ['comStatus'] }], ou: 2 } },
    { field: 'comStatus', name: '组合支付', nameSpan: 6, detail: { type: 'span', model: 'select', obj: 'comPayType', ou: 2 } },
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
  // 物流公司企业
  orgAuthCarrierInfo: [
    { field: 'yyzzPic', name: '营业执照照片', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost } },
    { field: 'yyzzPicDate', name: '营业执照认证时间', nameSpan: 6, detail: { type: 'span', ou: 4 } },
    { field: 'sfzghPicDate', name: '法人身份证认证时间', xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 3, detail: { type: 'span', ou: 4, style: 'width: 40.5%' } },
    { field: 'sfzrlPic', name: '法人身份证人物面', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost } },
    { field: 'sfzghPic', name: '法人身份证国徽面', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost } },
    { field: 'dlysPic', name: '道路运输许可证', filefield: 'file', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_d: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_u: { type: 'file', ou: 4, iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传道路运输许可证', node: [], rules: [{ required: true, message: '请上传道路运输许可证！', trigger: 'change' }] } },
    { field: 'dlysPicDate', name: '道路运输许可证认证时间', nameSpan: 6, detail: { type: 'span', ou: 4, style: 'margin-bottom: 94px;width: 90%;' } }
  ],
  // 加气站
  orgAuthFillerInfo: [
    { field: 'yyzzPic', name: '营业执照照片', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost } },
    { field: 'yyzzPicDate', name: '营业执照认证时间', nameSpan: 6, detail: { type: 'span', ou: 4 } },
    { field: 'sfzghPicDate', name: '法人身份证认证时间', xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 3, detail: { type: 'span', ou: 4, style: 'width: 40.5%' } },
    { field: 'sfzrlPic', name: '法人身份证人物面', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost } },
    { field: 'sfzghPic', name: '法人身份证国徽面', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost } },
    { field: 'jqzyyzzPic', name: '加气站营业执照', filefield: 'file', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_d: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_u: { type: 'file', ou: 4, iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传加气站营业执照', node: [], rules: [{ required: true, message: '请上传加气站营业执照！', trigger: 'change' }] } },
    { field: 'jqzyyzzPicDate', name: '加气站营业执照认证时间', nameSpan: 6, detail: { type: 'span', ou: 4, style: 'margin-bottom: 94px;width: 90%;' } },
    { field: 'rqjyPic', name: '燃气经营许可证', filefield: 'file', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_d: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_u: { type: 'file', ou: 4, iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传燃气经营许可证', node: [], rules: [{ required: true, message: '请上传燃气经营许可证！', trigger: 'change' }] } },
    { field: 'rqjyPicDate', name: '燃气经营许可证认证时间', nameSpan: 6, detail: { type: 'span', ou: 4, style: 'margin-bottom: 94px;width: 90%;' } },
    { field: 'qpczPic', name: '气瓶充装许可证', filefield: 'file', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_d: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_u: { type: 'file', ou: 4, iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传气瓶充装许可证', node: [], rules: [{ required: true, message: '请上传气瓶充装许可证！', trigger: 'change' }] } },
    { field: 'qpczPicDate', name: '气瓶充装许可证认证时间', nameSpan: 6, detail: { type: 'span', ou: 4, style: 'margin-bottom: 94px;width: 90%;' } },
    { field: 'xfysPic', name: '消防验收', filefield: 'file', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_d: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_u: { type: 'file', ou: 4, iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传消防验收许可证', node: [], rules: [{ required: true, message: '请上传消防验收许可证！', trigger: 'change' }] } },
    { field: 'xfysPicDate', name: '消防验收认证时间', nameSpan: 6, detail: { type: 'span', ou: 4, style: 'margin-bottom: 94px;width: 90%;' } },
    { field: 'hbpjPic', name: '环评报告', filefield: 'file', nameSpan: 6, detail: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_d: { type: 'span', model: 'img', ou: 4, fileHost: file.state.fileHost },
      detail_u: { type: 'file', ou: 4, iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传环评报告许可证', node: [], rules: [{ required: true, message: '请上传环评报告许可证！', trigger: 'change' }] } },
    { field: 'hbpjPicDate', name: '环评报告认证时间', nameSpan: 6, detail: { type: 'span', ou: 4, style: 'margin-bottom: 94px;width: 90%;' } }
  ],
  // 平台管理用户信息
  userIntentionBaseInfo: [
    {
      field: 'userId', name: '客户ID', fixed: 'left', nameSpan: 6,
      detail: { type: 'span', placeholder: '客户ID', serial: 1, ou: 0 }
    }, {
      field: 'userName', name: '姓名(昵称)', nameSpan: 6,
      search: { type: 'text', style: 'width: 200px;', placeholder: '请输入姓名' },
      detail: { type: 'span', placeholder: '客户姓名', serial: 3, ou: 0 }
    }, {
      field: 'baseRole', name: '类型', nameSpan: 6, hide: true, formatter: 'baseRole',
      detail: { type: 'span', model: 'select', obj: 'baseRole', placeholder: '类型', serial: 4, ou: 0 }
    }, {
      field: 'mobile', name: '手机号', nameSpan: 6,
      detail: { type: 'span', placeholder: '手机号', serial: 6, ou: 0 },
      search: { type: 'text', style: 'width: 200px;', placeholder: '请输入手机号' }
      // rules: [{ required: true, message: '请输入手机号', trigger: 'blur' },
      //   { validator: 'isValidateMobile', message: '请输入正确格式的手机号', trigger: 'blur' }]
    }, {
      field: 'lastLoginDate', name: '最后登录时间', nameSpan: 6, stype: 'format', formatFun: 'formateTData all',
      detail: { type: 'span', stype: 'format', formatFun: 'formateTData all', serial: 9, ou: 0 }
    }, {
      field: 'status', name: '状态', formatter: 'status', nameSpan: 6, width: 80,
      detail: { type: 'radio', value: 0, serial: 10, ou: 0, obj: 'status', placeholder: '请选择账号状态' },
      rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }]
    }
  ],
  // 平台管理用户信息
  userBaseInfo: [
    {
      field: 'userId', name: 'ID', fixed: 'left', nameSpan: 6,
      detail: { type: 'span', placeholder: '客户ID', serial: 1, ou: 0 }
    }, {
      field: 'orgName', name: '企业名称', nameSpan: 6,
      search: { type: 'text', style: 'width: 200px;', placeholder: '请输入姓名' },
      detail: { type: 'span', placeholder: '客户姓名', serial: 3, ou: 0 }
    }, {
      field: 'userName', name: '姓名(昵称)', nameSpan: 6,
      search: { type: 'text', style: 'width: 200px;', placeholder: '请输入姓名' },
      detail: { type: 'span', placeholder: '客户姓名', serial: 3, ou: 0 }
    }, {
      field: 'mobile', name: '手机号', nameSpan: 6,
      detail: { type: 'span', placeholder: '手机号', serial: 6, ou: 0 },
      search: { type: 'text', style: 'width: 200px;', placeholder: '请输入手机号' }
      // rules: [{ required: true, message: '请输入手机号', trigger: 'blur' },
      //   { validator: 'isValidateMobile', message: '请输入正确格式的手机号', trigger: 'blur' }]
    }, {
      field: 'lastLoginDate', name: '最后登录时间', nameSpan: 6, stype: 'format', formatFun: 'formateTData all',
      detail: { type: 'span', stype: 'format', formatFun: 'formateTData all', serial: 10, ou: 0 }
    }, {
      field: 'baseRole', name: '类型', nameSpan: 6, formatter: 'baseRole',
      detail: { type: 'span', model: 'select', obj: 'baseRole', placeholder: '类型', serial: 4, ou: 0 }
    }, {
      field: 'status', name: '状态', formatter: 'status', nameSpan: 6, width: 80,
      detail: { type: 'radio', value: 0, serial: 11, ou: 0, obj: 'status', placeholder: '请选择账号状态' },
      rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }]
    }
  ],
  userWxBaseInfo: [
    {
      field: 'nickname', name: '微信昵称', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '微信昵称', serial: 5, ou: 0 }
    }, {
      field: 'openId', name: '微信openid', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '微信openid', serial: 2, ou: 0 }
    }, {
      field: 'province', name: '省份', nameSpan: 6, hide: true,
      detail: { type: 'span', serial: 7, ou: 0 }
    }, {
      field: 'city', name: '城市', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '城市', serial: 8, ou: 0 }
    }, {
      field: 'createDate', name: '注册时间', nameSpan: 6, hide: true,
      detail: { type: 'span', stype: 'format', formatFun: 'formateTData all', serial: 9, ou: 0 }
    }, {
      field: 'sex', name: '性别', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '性别', model: 'select', obj: 'sex', serial: 12, ou: 0 }
    }
  ],
  userAuthInfo: [
    {
      field: 'realname', name: '姓名', nameSpan: 6, hide: true,
      detail: { type: 'span', serial: 12, ou: 1 }
    }, {
      field: 'idcardNo', name: '身份证号', nameSpan: 6, hide: true,
      detail: { type: 'span', serial: 13, ou: 1 }
    }, {
      field: 'authDate', name: '身份认证时间', xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 3, hide: true,
      detail: { type: 'span', style: 'width: 40.7%;', serial: 14, stype: 'format', formatFun: 'formateTData all', ou: 1 }
    }, {
      field: 'idcardFaceUrl', name: '身份证人物面', nameSpan: 6, hide: true,
      detail: { type: 'span', model: 'img',/* vague: true, vagueType: 'style', */ ou: 1, serial: 15, fileHost: file.state.fileHost }
    }, {
      field: 'idcardBackUrl', name: '身份证国徽面', nameSpan: 6, hide: true,
      detail: { type: 'span', model: 'img', serial: 16,/* vague: true, vagueType: 'style', */ ou: 1, fileHost: file.state.fileHost }
    }
  ],
  userTruckAuthInfo: [
    {
      field: 'licenseNo', name: '驾驶证号', nameSpan: 6, hide: true,
      detail: { type: 'span', ou: 2 }
    }, {
      field: 'issueDate', name: '初次领证日期', nameSpan: 6, hide: true,
      detail: { type: 'span', stype: 'format', formatFun: 'formateTData all', ou: 2 }
    }, {
      field: 'drivingType', name: '准驾车型', nameSpan: 6, hide: true,
      detail: { type: 'span', ou: 2 }
    }, {
      field: 'validityDate', name: '有效期限', nameSpan: 6, hide: true,
      detail: { type: 'span', stype: 'format', formatFun: 'formateTData all', ou: 2 }
    }, {
      field: 'faceUrl', name: '驾驶证照片', nameSpan: 6, hide: true,
      detail: { type: 'span', model: 'img', ou: 2, fileHost: file.state.fileHost }
    }
  ],
  userIntentionOptsInfo: [{
      field: 'useropts', stype: 'opt', ispush: false, name: '操作', align: 'center', fixed: 'right',
      list: [{ type: 'detail', size: 'small', icon: '', style: '', name: '详情' }]
  }]
}

export default columns
