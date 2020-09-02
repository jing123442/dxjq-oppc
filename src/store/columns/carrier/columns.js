const columns = {
  state: {
    logistics: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', show: { type: 'text', remote: true, obj: 'orgName', style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
      { field: 'selectedOptions', name: '所在地区', show: { type: 'cascader', formatter: 'address', obj: 'cascaderAddress', sign: '/', noShow: 2, style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'blur' }] },
      { field: 'address', name: '地址', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入地址' }, rules: [{ required: true, message: '请输入地址', trigger: 'blur' }] },
      { field: 'mobile', name: '联系电话', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入联系电话' }, rules: [{ required: true, message: '请输入联系电话', trigger: 'blur' }] },
      { field: 'contacts', name: '联系人', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入联系人' }, rules: [{ required: true, message: '请输入联系人', trigger: 'blur' }] },
      { field: 'createDate', name: '创建时间', formatFun: 'formateTData', stype: 'format' },
      { field: 'status', name: '账号状态', formatter: 'status', show: { type: 'radio', value: 0, obj: 'status', placeholder: '请选择账号状态' }, search: { type: 'select', obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
      { field: 'email', name: '邮箱', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入邮箱' }, rules: [{ required: true, message: '请输入邮箱', trigger: 'blur' }] },
      { field: 'account', name: '银行账户', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入银行账户' }, rules: [{ required: true, message: '请输入银行账户', trigger: 'blur' }] },
      { field: 'bank', name: '开户行', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入开户行' }, rules: [{ required: true, message: '请输入开户行', trigger: 'blur' }] },
      { field: 'legalperson', name: '法人姓名', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入法人姓名' }, rules: [{ required: true, message: '请输入法人姓名', trigger: 'blur' }] },
      { field: 'idCard', name: '法人身份证号码', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入法人身份证号码' }, rules: [{ required: true, message: '请输入法人身份证号码', trigger: 'blur' }] },
      { field: 'taxpayer', name: '纳税人识别号', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入纳税人识别号' }, rules: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }] },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'addCar', name: '添加车辆' }, { type: 'edit', name: '编辑' }, { type: 'detail', name: '详情' }] }
    ],
    addCar: [
      { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', show: { type: 'text', isDisabled: true, remote: true, style: 'width: 90%;', placeholder: '请输入公司名称' } },
      { field: 'truckName', name: '卡车名称', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入卡车名称' }, rules: [{ required: true, message: '请输入卡车名称', trigger: 'blur' }] },
      { field: 'carNumber', name: '车牌号', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入车牌号' }, rules: [{ required: true, message: '请输入车牌号', trigger: 'blur' }] },
      { field: 'frameNumber', name: '车架号', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入车架号' }, rules: [{ required: true, message: '请输入车架号', trigger: 'blur' }] },
      { field: 'trailerNumber', name: '挂车牌号', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入挂车牌号' } },
      { field: 'purchaseDate', name: '购车日期', show: { type: 'date-picker', model: 'date', style: 'width: 90%;', placeholder: '请输入购车日期' } },
      { field: 'color', name: '颜色', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入颜色' }, rules: [{ required: true, message: '请输入颜色', trigger: 'blur' }] },
      { field: 'deadWeight', name: '载重量', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入载重量' }, rules: [{ required: true, message: '请输入载重量', trigger: 'blur' }] },
      { field: 'capacity', name: '储气罐容量', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入储气罐容量' }, rules: [{ required: true, message: '请输入储气罐容量', trigger: 'blur' }] },
      { field: 'manufacturer', name: '生产厂家', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入生产厂家' }, rules: [{ required: true, message: '请输入生产厂家', trigger: 'blur' }] }
    ],
    logisticsDetail: [
      { field: 'orgName', nameSpan: 10, name: '公司名称', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'contacts', nameSpan: 10, name: '联系人', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'mobile', nameSpan: 10, name: '联系电话', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'address', nameSpan: 10, name: '地址', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'email', nameSpan: 10, name: '邮箱', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'legalperson', nameSpan: 10, name: '法人姓名', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'idCard', nameSpan: 10, name: '法人身份证号码', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'bank', nameSpan: 10, name: '开户行', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'account', nameSpan: 10, name: '银行账户', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'taxpayer', nameSpan: 10, name: '纳税人识别号', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
      { field: 'status', nameSpan: 10, name: '账号状态', show: { type: 'select', obj: 'status', style: 'width: 90%;', isDisabled: true } }
    ],
    firmAccount: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
      { field: 'orgName', stype: 'mapping', name: '公司名称', ispush: false, mapping: 'orgName', show: { type: 'text', isDisabled: true, remote: true, subField: 'orgName', obj: 'orgId', style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
      { field: 'accountId', name: '公司账户管理' },
      { field: 'balance', name: '账户余额（元）', ispush: false },
      { field: 'autoAccount', name: '是否自动圈存', formatter: 'autoAccount', show: { type: 'radio', value: 0, obj: 'autoAccount', placeholder: '请选择是否自动圈存' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
      { field: 'createDate', name: '创建时间', ispush: false, formatFun: 'formateTData', stype: 'format' },
      { field: 'accountPassword', hide: true },
      { field: 'updater', hide: true },
      { field: 'updaterName', hide: true },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'recharge', name: '充值' }, { type: 'load', name: '圈存' }, { type: 'accState', name: '账户流水' }, { type: 'edit', name: '编辑' }] }
    ],
    firmAccountList: [
      { field: 'id', nameSpan: 10, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', nameSpan: 10, name: '公司名称' },
      { field: 'orderId', nameSpan: 10, name: '单据流水id', search: { type: 'text', placeholder: '请输入单据流水id' } },
      { field: 'changeAmount', nameSpan: 10, name: '变化金额' },
      { field: 'accountBalance', nameSpan: 10, name: '变化后账户金额' },
      { field: 'createrName', nameSpan: 10, name: '创建人' },
      { field: 'createDate', nameSpan: 10, name: '创建时间', formatFun: 'formateTData', stype: 'format' },
      { field: 'note', nameSpan: 10, name: '摘要' }
    ],
    firmAccountRecharge: [
      { field: 'orgName', name: '公司名称', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'mobile', name: '手机号', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'address', name: '公司地址', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'amount', name: '充值', show: { type: 'text', placeholder: '请输入充值金额', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入充值金额！', trigger: 'blur' }] },
      { field: 'note', name: '摘要', show: { type: 'textarea', placeholder: '请输入充值摘要', style: 'width: 90%;' } }
    ],
    vehicleCircle: [
      { field: 'truckId', nameSpan: 10, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'carNumber', nameSpan: 10, name: '车牌号', search: { type: 'text', placeholder: '请输入车牌号' } },
      { field: 'balance', nameSpan: 10, name: '车辆账户余额' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'circle', name: '圈存' }] }
    ],
    vehicleCircleEvent: [
      { field: 'orgName', name: '公司名称', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'balance', name: '账户余额', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'carNumber', name: '车牌号', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'thuckBalance', name: '卡车余额', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'amount', name: '圈存金额', show: { type: 'text', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入圈存金额！', trigger: 'blur' }] }
    ],
    vehicle: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', name: '公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
      { field: 'carNumber', name: '车牌号', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入车牌号' }, search: { type: 'text', placeholder: '请输入车牌号' }, rules: [{ required: true, message: '请输入车牌号', trigger: 'blur' }] },
      { field: 'status', name: '车辆状态', formatter: 'status', show: { type: 'radio', value: 0, obj: 'status', placeholder: '请选择车辆状态' }, search: { type: 'select', obj: 'status', placeholder: '请选择车辆状态' }, rules: [{ required: true, message: '请选择车辆状态！', trigger: 'blur' }] },
      { field: 'truckDriverList', name: '当前绑定司机', formatter: '', stype: 'list-tag', porps: { name: 'createrName' } },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 240, list: [{ type: 'bind', name: '绑定司机' }, { type: 'edit', name: '编辑' }, { type: 'detail', name: '详情' }, { type: 'money', name: '资金归集' }] }
    ],
    truckAccount: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
      { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
      { field: 'accountId', name: '账号' },
      { field: 'carNumber', name: '车牌号' },
      { field: 'balance', name: '余额' },
      { field: 'createDate', name: '创建时间', formatFun: 'formateTData', stype: 'format' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '账户流水', fixed: 'right', width: 140, list: [{ type: 'detail', name: '查看' }] }
    ],
    truckAccountList: [
      { field: 'id', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', name: '公司名称' },
      { field: 'orderId', name: '单据流水id', search: { type: 'text', placeholder: '请输入单据流水id' } },
      { field: 'changeAmount', nameSpan: 10, name: '变化金额' },
      { field: 'accountBalance', nameSpan: 10, name: '变化后账户金额' },
      { field: 'createrName', nameSpan: 10, name: '创建人' },
      { field: 'createDate', nameSpan: 10, name: '创建时间', formatFun: 'formateTData', stype: 'format' },
      { field: 'note', nameSpan: 10, name: '摘要' }
    ],
    rechargeRecord: [
      { field: 'rechargeOrderId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
      { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
      { field: 'tel', name: '手机号', search: { type: 'text', placeholder: '请输入手机号' } },
      { field: 'rechargeDate', name: '充值时间', formatFun: 'formateTData', stype: 'format' },
      { field: 'amount', name: '充值金额' },
      { field: 'status', name: '状态', formatter: 'utilsCheck', search: { type: 'select', obj: 'utilsCheck', placeholder: '请选择' } },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: params => params.row.status === 1 ? [{ type: 'detail', name: '详情' }] : [{ type: 'check', name: '审核' }, { type: 'detail', name: '详情' }] }
    ],
    rechargeRecordCheck: [
      { field: 'orgName', name: '公司名称', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'tel', name: '手机号', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'amount', name: '充值金额', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'rechargeDate', name: '充值时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } }
    ],
    rechargeRecordDetail: [
      { field: 'orgName', name: '公司名称', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'tel', name: '手机号', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'amount', name: '充值金额', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'rechargeDate', name: '充值时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'note', name: '摘要', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'status', name: '状态', formatter: 'orderStatus', show: { type: 'select', isDisabled: true, style: 'width: 90%;' } },
      { field: 'auditerName', name: '审核人', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'auditDate', name: '审核时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } }
    ],
    inventoryManager: [
      { field: 'transferOrderId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
      { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
      { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入车牌号' } },
      { field: 'type', name: '类别', formatter: 'utilsAccountType', search: { type: 'select', obj: 'utilsAccountType', placeholder: '请选择类别' } },
      { field: 'amount', name: '圈存金额' },
      { field: 'createDate', name: '圈存日期', formatFun: 'formateTData', stype: 'format' }
    ],
    orderManager: [
      { field: 'orderId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
      { field: 'orderId', stype: 'mapping', name: '订单号', mapping: 'orderId', search: { type: 'text', placeholder: '请输入订单号' } },
      { field: 'gasstationName', name: '加气站', search: { type: 'text', placeholder: '请输入加气站' } },
      { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入车牌号' } },
      { field: 'cashierName', name: '司机名称', search: { type: 'text', placeholder: '请输入司机名称' } },
      { field: 'gasQty', name: '加气量' },
      { field: 'amount', name: '付款金额' },
      { field: 'orderStatus', name: '订单状态', formatter: 'orderStatus', search: { type: 'select', obj: 'orderStatus', placeholder: '请选择订单状态' } },
      { field: 'createDate', name: '创建日期', formatFun: 'formateTData', stype: 'format' },
      { field: 'a', name: '日期筛选', hide: true, search: { type: 'date', modal: 'daterange' } },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'detaila', name: '详情' }] }
    ],
    orderManagerDetail: [
      { field: 'orderId', name: '订单号', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
      { field: 'carrierOrgName', name: '物流公司名称', show: { type: 'text', ou: 0, isDisabled: true, style: 'width: 90%;' } },
      { field: 'carNumber', name: '车牌号', show: { type: 'text', ou: 0, isDisabled: true, style: 'width: 90%;' } },
      { field: 'driverName', name: '司机名称', show: { type: 'text', ou: 0, isDisabled: true, style: 'width: 90%;' } },
      { field: 'gasstationName', name: '加气站名称', show: { type: 'text', ou: 1, isDisabled: true, style: 'width: 90%;' } },
      { field: 'cashierName', name: '收银员名称', show: { type: 'text', ou: 1, isDisabled: true, style: 'width: 90%;' } },
      { field: 'gasQty', name: '加气量', show: { type: 'text', ou: 2, isDisabled: true, style: 'width: 90%;' } },
      { field: 'listPrice', name: '挂牌气价', show: { type: 'text', ou: 2, isDisabled: true, style: 'width: 90%;' } },
      { field: 'actualPrice', name: '实际气价', show: { type: 'text', ou: 2, isDisabled: true, style: 'width: 90%;' } },
      { field: 'amount', name: '实际加气金额', show: { type: 'text', ou: 2, isDisabled: true, style: 'width: 90%;' } },
      { field: 'createDate', name: '加气时间', show: { type: 'text', ou: 2, isDisabled: true, style: 'width: 90%;' } }
    ]
  }
}

export default columns
