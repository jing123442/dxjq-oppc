/* eslint-disable */
import file from '../../modules/file'
const columns = {
  pointsConfig: [
    { field: 'pointsNumber', name: '积分编号', hide: true, show: { type: 'text', isDisabled: true, placeholder: '请输入积分编号' } },
    { field: 'pointsName', name: '积分名称', hide: true, show: { type: 'text', placeholder: '请输入积分名称' }, rules: [{ required: true, message: '请输入积分名称！', trigger: 'blur' }] },
    { field: 'pointsValue', name: '积分价值', hide: true, show: { type: 'number', precision: null, placeholder: '请输入积分价值(1元等于多少积分)' }, rules: [{ required: true, message: '请输入积分价值(1元等于多少积分)', trigger: 'blur' }] },
    { field: 'pointsValidate', name: '积分有效期', hide: true, show: { type: 'select', obj: 'pointsValidate', placeholder: '请选择积分有效期' }, rules: [{ required: true, message: '请选择积分有效期', trigger: 'blur' }] },
    { field: 'remark', name: '备注', hide: true, show: { type: 'textarea', placeholder: '请输入备注' } }
  ],
  ruleList: [
    { field: 'id', hide: true, show: { type: 'hide', field: 'ruleId' } },
    { field: 'rewardType', fixed: 'left', name: '奖励类型', ispush: false, formatter: 'rewardType' },
    { field: 'points', name: '奖励积分', show: { type: 'text', placeholder: '请输入奖励积分' }, rules: [{ required: true, message: '请输入奖励积分', trigger: 'blur' }, { validator: 'validateInputValueNumber', option: { max: 999999 }, message: '最大值不能超过999999', trigger: 'blur' }] },
    { field: 'instructions', name: '规则说明', ispush: false },
    { field: 'ruleStatus', name: '规则状态', formatter: 'ruleStatus', show: { type: 'radio', obj: 'ruleStatus', value: 0 } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 80, list: [{ type: 'edit', name: '编辑' }] }
  ],
  supplier: [
    { field: 'id', hide: true, show: { type: 'hide',  noShow: 1 } },
    { field: 'supplierNum', fixed: 'left', name: '供应商编号', show: { type: 'span', ou: 1, noShow: 1, placeholder: '保存自动生成' }, search: { type: 'text', placeholder: '供应商编号' }, detail: { type: 'span', serial: 1, ou: 1 } },
    { field: 'supplierName', name: '供应商名称', show: { type: 'text', ou: 1, placeholder: '请输入供应商名称' }, rules: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }], search: { type: 'text', placeholder: '供应商名称' }, detail: { type: 'span', serial: 2, ou: 1 } },
    { field: 'address', name: '详细地址', hide: true, show: { type: 'text', ou: 1, placeholder: '请输入详细地址' }, detail: { type: 'span', serial: 3, ou: 1 } },
    { field: 'username', name: '联系人姓名', show: { type: 'text', ou: 2, placeholder: '请输入联系人姓名' }, rules: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }], detail: { type: 'span', serial: 4, ou: 2 } },
    { field: 'userPhone', name: '联系人电话', show: { type: 'text', ou: 2, placeholder: '请输入联系人电话' }, rules: [{ required: true, message: '请输入联系人电话', trigger: 'blur' }, { validator: 'isValidateMobile', message: '格式错误，请检查', trigger: 'blur' }], detail: { type: 'span', serial: 5, ou: 2 } },
    { field: 'job', name: '职位', hide: true, show: { type: 'text', ou: 2, placeholder: '请输入职位' }, detail: { type: 'span', serial: 6, ou: 2 } },
    { field: 'email', name: 'Email', hide: true, show: { type: 'text', ou: 2, placeholder: '请输入Email' }, detail: { type: 'span', serial: 7, ou: 2 }, rules: [{ validator: 'isEmail', message: '格式错误，请检查', trigger: 'blur' }] },
    { field: 'afterSalesPhone', name: '售后电话', hide: true, show: { type: 'text', ou: 2, placeholder: '请输入售后电话' }, detail: { type: 'span', serial: 8, ou: 2 }, rules: [{ validator: 'isValidateMobile', message: '格式错误，请检查', trigger: 'blur' }] },
    { field: 'bank', name: '开户银行', hide: true, show: { type: 'text', ou: 3, placeholder: '请输入开户银行' }, detail: { type: 'span', serial: 9, ou: 3 } },
    { field: 'bankAccount', name: '银行账号', hide: true, show: { type: 'text', ou: 3, placeholder: '请输入银行账号' }, detail: { type: 'span', serial: 10, ou: 3 }, rules: [{ validator: 'isValidateNumber', message: '格式错误，请检查', trigger: 'blur' }] },
    { field: 'taxNo', name: '纳税号', hide: true, show: { type: 'text', ou: 3, placeholder: '请输入纳税号' }, detail: { type: 'span', serial: 11, ou: 3 }, rules: [{ validator: 'isValidateNumber', message: '格式错误，请检查', trigger: 'blur' }] },
    { field: 'invoice', name: '发票抬头', hide: true, show: { type: 'text', ou: 3, placeholder: '请输入发票抬头' }, detail: { type: 'span', serial: 12, ou: 3 } },
    { field: 'tax', name: '价格含税', hide: true, formatter: 'taxStatus', show: { type: 'select', ou: 4, obj: 'taxStatus', value: '0', cascaderList: [{ value: '1', fields: ['rate'] }] }, detail: { type: 'span', model: 'select', cascaderList: [{ value: '1', fields: ['rate'] }], obj: 'taxStatus', serial: 13, ou: 4 } },
    { field: 'rate', name: '税率（%）', hide: true, show: { type: 'number', ou: 4, placeholder: '请输入税率' }, detail: { type: 'span', serial: 14, ou: 4 } },
    { field: 'remark', name: '备注', hide: true, show: { type: 'textarea', ou: 5, placeholder: '请输入备注' }, detail: { type: 'span', serial: 15, ou: 5 } },
    { field: 'supplierStatus', name: '供应商状态', formatter: 'supplierStatus', show: { type: 'hide' }, search: { type: 'select', obj: 'supplierStatus', placeholder: '供应商状态', value: '' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 180, list: item => supplierOpt(item) }
  ],
  order: [
    { field: 'orderCode', fixed: 'left', name: '平台订单号', search: { type: 'text', placeholder: '请输入平台订单号' } },
    { field: 'supplierOrderCode', name: '供应商订单号', search: { type: 'text', dataType: 'number', placeholder: '请输入供应商订单号' } },
    { field: 'userPhone', name: '用户手机号', search: { type: 'text', dataType: 'number', placeholder: '请输入用户手机号' } },
    { field: 'goodsType', name: '商品类型', formatter: 'goodsType' },
    { field: 'goodsName', name: '商品名称', search: { type: 'text', placeholder: '请输入商品名称' } },
    { field: 'goodsNorm', name: '规格/型号' },
    { field: 'quantity', name: '数量' },
    { field: 'createTime', name: '下单时间', search: { type: 'date-picker', placeholder: '' } },
    { field: 'exchangePrice', name: '兑换价(积分)' },
    { field: 'orderStatus', name: '订单状态', formatter: 'orderStatus', search: { type: 'select', obj: 'orderStatus', placeholder: '订单状态' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 80, list: [{ type: 'orderDetail', name: '详情' }] }
  ],
  orderDetail: [
    { field: 'orderCode', hide: true, name: '平台订单号', show: { type: 'span', ou: 1 } },
    { field: 'supplierOrderCode', hide: true, name: '供应商订单号', show: { type: 'span', ou: 1 } },
    { field: 'userId', hide: true, name: '用户ID', show: { type: 'span', ou: 1 } },
    { field: 'userPhone', hide: true, name: '用户手机号', show: { type: 'span', ou: 1 } },
    { field: 'orderStatus', hide: true, name: '订单状态', show: { type: 'span', model: 'select', obj: 'orderStatus', ou: 1 } },
    { field: 'createTime', hide: true, name: '下单时间', show: { type: 'span', stype: 'format', formatFun: 'formateTData all', ou: 1 } },
    { field: 'channel', hide: true, name: '兑换渠道', show: { type: 'span', model: 'select', obj: 'channel', ou: 1 } },
    { field: 'goodsNum', hide: true, name: '商品编号', show: { type: 'span', ou: 2 } },
    { field: 'goodsName', hide: true, name: '商品名称', show: { type: 'span', ou: 2 } },
    { field: 'supplierNum', hide: true, name: '供应商编号', show: { type: 'span', ou: 2 } },
    { field: 'supplierName', hide: true, name: '供应商名称', show: { type: 'span', ou: 2 } },
    { field: 'goodsType', hide: true, name: '商品类型', show: { type: 'span', model: 'select', obj: 'goodsType', ou: 2 } },
    { field: 'quantity', hide: true, name: '商品数量', show: { type: 'span', ou: 2 } },
    { field: 'goodsPrice', hide: true, name: '成本价(元)', show: { type: 'span', ou: 2 } },
    { field: 'exchangePrice', hide: true, name: '兑换价(积分)', show: { type: 'span', ou: 2 } },
    { field: 'addressUsername', hide: true, name: '收货人', show: { type: 'span', ou: 3 } },
    { field: 'addr', hide: true, name: '收货地址', show: { type: 'span', ou: 3 } },
    { field: 'addressUserPhone', hide: true, name: '手机号', show: { type: 'span', ou: 3 } },
    { field: 'courierCompany', hide: true, name: '快递公司', show: { type: 'span', ou: 4 } },
    { field: 'courier', hide: true, name: '快递单号', show: { type: 'span', ou: 4 } },
    { field: 'courierTime', hide: true, name: '发货时间', show: { type: 'span', ou: 4 } },
    { field: 'rechargeNumber', hide: true, name: '充值账号', show: { type: 'span', ou: 5 } },
    { field: 'cardNum', hide: true, name: '卡号', show: { type: 'span', ou: 6 } },
    { field: 'cardPwd', hide: true, name: '卡密', show: { type: 'span', ou: 6 } }
  ],
  category: [
    { field: 'id', hide: true, show: { type: 'hide', noShow: 1 } },
    { field: 'goodsType', fixed: 'left', name: '商品类型', formatter: 'goodsType', show: { type: 'select', obj: 'goodsType' }, search: { type: 'select', obj: 'goodsType', placeholder: '商品类型' }, rules: [{ required: true, message: '请选择商品类型', trigger: 'blur' }] },
    { field: 'categoryName', name: '商品分类', show: { type: 'text', placeholder: '请输入商品分类' }, search: { type: 'text', placeholder: '请输入商品分类' }, rules: [{ required: true, message: '请输入商品分类', trigger: 'blur' }] },
    { field: 'categoryStatus', name: '状态', formatter: 'categoryStatus' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 180, list: item => categoryOpt(item) }
  ],
  goods: [
    { field: 'listImageUrl', fixed: 'left', name: '商品图片', stype: 'image', filefield: 'file', xs: 6, sm: 6, md: 6, lg: 6, xl: 6, nameSpan: 6, show: { type: 'file', iType: 'string', ou: 4, props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传商品列表图', node: [], rules: [{ required: true, message: '请上传商品列表图！', trigger: 'change' }] },
      detail: { type: 'span', model: 'img', ou: 5, fileHost: file.state.fileHost }
    },
    { field: 'majorImageUrl', name: '商品主图', hide: true, stype: 'image', filefield: 'file', colspan: 18, nameSpan: 6, show: { type: 'file', iType: 'string', limit: 5, ou: 4, props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传商品主图', node: [], rules: [{ required: true, message: '请上传商品主图', trigger: 'change' }] },
      detail: { type: 'file', iType: 'string', model: 'img', isDisabled: true, ou: 5, action: file.state.fileUrl, fileHost: file.state.fileHost }
    },
    { field: 'id', hide: true, show: { type: 'hide', noShow: 1} },
    { field: 'goodsType', name: '商品类型', formatter: 'goodsType', 
      show: { type: 'select', ou: 2, obj: 'goodsType', value: 0, 
        cascaderTypeList: [{ value: 0, fields: { goodsNorm: 'text' } }, { value: 1, fields: { goodsNorm: 'select' }}] }, 
      rules: [{ required: true, message: '请选择商品类型', trigger: 'blur' }], detail: { type: 'select', isDisabled: true, obj: 'goodsType', serial: 5, ou: 2 } },
    { field: 'categoryId', name: '商品分类', stype: 'mapping', mapping: 'categoryName', show: { type: 'select', ou: 2, remote: true, obj: 'categoryList', placeholder: '请选择商品分类' }, rules: [{ required: true, message: '请输入商品分类', trigger: 'blur' }], detail: { type: 'select', isDisabled: true, obj: 'categoryList', serial: 6, ou: 2 } },
    { field: 'goodsNum', name: '商品编号', show: { type: 'text', ou: 2, placeholder: '请输入商品编号' }, rules: [{ required: true, message: '请输入商品编号', trigger: 'blur' }], detail: { type: 'span', serial: 3, ou: 2 } },
    { field: 'goodsName', name: '商品名称', show: { type: 'text', ou: 2, placeholder: '请输入商品名称' }, search: { type: 'text', placeholder: '请输入商品名称' }, rules: [{ required: true, message: '请输入商品名称', trigger: 'blur' }], detail: { type: 'span', serial: 4, ou: 2 } },
    { field: 'supplierId', name: '供应商名称', stype: 'mapping', mapping: 'supplierName', show: { type: 'select', ou: 1, remote: true, obj: 'supplierList', placeholder: '请选择供应商名称' }, search: { type: 'text', field: 'supplierName', placeholder: '请输入供应商名称' }, rules: [{ required: true, message: '请选择供应商名称', trigger: 'blur' }], detail: { type: 'select', isDisabled: true, obj: 'supplierList', serial: 1, ou: 1 } },
    { field: 'goodsBrand', name: '商品品牌', show: { type: 'text', ou: 2, placeholder: '请输入商品品牌' }, rules: [{ required: true, message: '请输入商品品牌', trigger: 'blur' }], detail: { type: 'span', serial: 7, ou: 2 } },
    { field: 'goodsNorm', name: '规格/型号', show: { type: 'text', ou: 2, placeholder: '请输入规格/型号', obj: 'specification' }, rules: [{ required: true, message: '请输入规格/型号', trigger: 'blur' }], detail: { type: 'span', serial: 8, ou: 2 } },
    { field: 'goodsPrice', name: '成本单价(元)', show: { type: 'text', ou: 3, placeholder: '请输入成本单价' }, rules: [{ required: true, message: '请输入成本单价', trigger: 'blur' }, { validator: 'validateMoneyNumber', message: '格式错误，请检查', trigger: 'blur' }], detail: { type: 'span', serial: 9, ou: 3 } },
    { field: 'linePrice', name: '划线单价(元)', hide: true, show: { type: 'text', ou: 3, placeholder: '请输入划线单价' }, rules: [{ required: true, message: '请输入划线单价', trigger: 'blur' }, { validator: 'validateMoneyNumber', message: '格式错误，请检查', trigger: 'blur' }], detail: { type: 'span', serial: 10, ou: 3 } },
    { field: 'exchangePrice', name: '兑换价(积分)', show: { type: 'text', ou: 3, placeholder: '请输入兑换价(积分)' }, rules: [{ required: true, message: '请输入兑换价', trigger: 'blur' }, { validator: 'isValidateNumber', message: '格式错误，请检查', trigger: 'blur' }], detail: { type: 'span', serial: 11, ou: 3 } },
    { field: 'inventory', name: '库存数量', show: { type: 'text', ou: 5, placeholder: '请输入库存数量' }, rules: [{ required: true, message: '请输入库存数量', trigger: 'blur' }, { validator: 'isValidateNumber', message: '格式错误，请检查', trigger: 'blur' }], detail: { type: 'span', serial: 11, ou: 4 } },
    { field: 'description', name: '商品描述', hide: true, xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 2, show: { type: 'ueditor', style: 'width: 98%', ou: 6, config: file.state.fileUEditorConfig, placeholder: '请输入商品描述' }, rules: [{ required: true, message: '请输入商品描述', trigger: 'blur' }], detail: { type: 'span', model: 'html', style: 'width: 97%;overflow: hidden;display: block;', ou: 6 } },
    { field: 'goodsStatus', name: '商品状态', formatter: 'goodsStatus', show: { type: 'radio', ou: 0, obj: 'goodsStatus', placeholder: '商品状态' }, search: { type: 'select', obj: 'goodsStatus', placeholder: '商品状态' }, rules: [{ required: true, message: '请选择商品状态', trigger: 'blur' }], detail: { type: 'radio', isDisabled: true, obj: 'goodsStatus', serial: 0, ou: 0 } },
    { field: 'imageStatus', name: '图片状态', formatter: 'imageStatus', search: { type: 'select', obj: 'imageStatus', placeholder: '图片状态' }, rules: [{ required: true, message: '请选择商品状态', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 120, list: [{ type: 'edit', name: '编辑' }, { type: 'detail', name: '详情' }] }
  ],
  pointsAccount: [
    { field: 'userId', fixed: 'left', name: '用户ID' },
    { field: 'mobile', name: '用户手机号', search: { type: 'text', dataType: 'number', placeholder: '请输入用户手机号' } },
    { field: 'userName', name: '用户姓名' },
    { field: 'accountId', name: '积分账户号' },
    { field: 'status', name: '账户状态', formatter: 'pointsAccoutStatus', search: { type: 'select', obj: 'pointsAccoutStatus', placeholder: '账户状态' } },
    { field: 'createDate', name: '账户开通时间', stype: 'format', formatFun: 'formateTData all' },
    { field: 'accountType', name: '账户类型', formatter: 'accountType' },
    { field: 'balance', name: '积分余额', search: { type: 'input-range', startPlaceholder: '请输入积分余额起始值', endPlaceholder: '请输入积分余额终止值' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 200, list: item => pointsAccoutOpt(item) }
  ],
  pointsAccountLog: [
    { field: 'id', fixed: 'left', name: '流水号', search: { type: 'text', dataType: 'number', placeholder: '请输入流水号'} },
    { field: 'type', name: '交易类型', formatter: 'accountLogType', search: { type: 'select', obj: 'accountLogType', placeholder: '交易类型' } },
    { field: 'note', name: '摘要' },
    { field: 'changeType', name: '变动类型' },
    { field: 'changeAmount', name: '发生额' },
    { field: 'accountBalance', name: '交易后余额' },
    { field: 'createDate', name: '交易时间', stype: 'format', formatFun: 'formateTData all', search: { type: 'date-picker', placeholder: '' } }
  ],
  pointChange: [
    { field: 'mobile', name: '用户手机号', ispush: false, show: { type: 'span' }},
    { field: 'userName', name: '用户姓名', ispush: false, show: { type: 'span' }},
    { field: 'orderId', show: { type: 'hide' }},
    { field: 'userId', show: { type: 'hide' }},
    { field: 'changeType', name: '调整类型', ispush: false, formatter: 'changeType', show: { type: 'select', obj: 'changeType', placeholder: '请选择调整类型' }, rules: [{ required: true, message: '请选择调整类型', trigger: 'blur' }] },
    { field: 'changeAmount', name: '调整数量', show: { type: 'text', placeholder: '请输入调整数量' }, rules: [{ required: true, message: '请输入调整数量', trigger: 'blur' }, { validator: 'validateInputValueNumber', option: { max: 999999 }, message: '最大值不能超过999999', trigger: 'blur' }] },
    { field: 'note', name: '备注', show: { type: 'textarea' } }
  ],
  inviteRecords: [
    { field: 'inviterMobile', fixed: 'left', name: '邀请人手机号', search: { type: 'text', dataType: 'number', placeholder: '请输入邀请人手机号' } },
    { field: 'inviteeMobile', name: '被邀请人手机号', search: { type: 'text', dataType: 'number', placeholder: '请输入被邀请人手机号' } },
    { field: 'inviteeRegisterDate', name: '被邀请人注册时间', stype: 'format', formatFun: 'formateTData all',  search: { type: 'date-picker', placeholder: '' } }
  ]
}

const supplierOpt = (item) => {
  const list = [{ type: 'edit', name: '编辑' }, { type: 'detail', name: '详情' }]
  const startUse = { type: 'startUse', name: '启用' }
  const stopUse = { type: 'stopUse', name: '停用' }
  if (item.row.supplierStatus == 0) {
    list.push(stopUse)
  } else if (item.row.supplierStatus == 1) {
    list.push(startUse)
  }
  return list
}
const categoryOpt = (item) => {
  const list = [{ type: 'edit', name: '编辑' }]
  const startUse = { type: 'startUse', name: '启用' }
  const stopUse = { type: 'stopUse', name: '停用' }
  if (item.row.categoryStatus == 0) {
    list.push(stopUse)
  } else if (item.row.categoryStatus == 1) {
    list.push(startUse)
  }
  return list
}
const pointsAccoutOpt = item => {
  const list = [{ type: 'tradeDetail', name: '交易明细' }, { type: 'pointsAdjust', name: '积分调整' }]
  const startUse = { type: 'startUse', name: '账户启用' }
  const stopUse = { type: 'stopUse', name: '账户停用' }
  if (item.row.status == 0) {
    list.push(stopUse)
  } else if (item.row.status == 1) {
    list.push(startUse)
  }
  return list
}
export default columns
