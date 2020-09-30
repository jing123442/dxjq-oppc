const columns = {
  logistics: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, show: { noShow: 1 } },
    { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', show: { type: 'text', remote: true, obj: 'orgName', style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
    { field: 'address', name: '地址', show: { type: 'cascader', fieldList: ['address', 'areas'], formatter: 'address', obj: 'cascaderAddress', props: { value: 'label', label: 'label' }, iType: 'string', sign: '', ou: 1, noShow: 2, style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'change' }] },
    { field: 'status', name: '企业状态', formatter: 'status' },
    { field: 'authStatus', name: '认证状态', formatter: 'authStatus' },
    { field: 'protocolNo', name: '转账协议', stype: 'format', formatFun: 'tableStatusToLabel' },
    { field: 'contractNo', name: '提现协议', stype: 'format', formatFun: 'tableStatusToLabel' },
    { field: 'legalPhone', name: '验证码手机号' },
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
        optList.push({ type: 'addCar', name: '添加车辆' })

        return optList
      }
    }
  ],
  addCar: [
    { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', show: { type: 'text', isDisabled: true, remote: true, style: 'width: 90%;', placeholder: '请输入公司名称' } },
    { field: 'truckName', name: '卡车名称', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入卡车名称' }, rules: [{ required: true, message: '请输入卡车名称', trigger: 'blur' }] },
    { field: 'linked', name: '卡车类型', show: { type: 'select', obj: 'truckType', cascaderList: [{ value: 1, fields: ['autoAccount'] }], style: 'width: 90%;', placeholder: '请选择卡车类型' }, rules: [{ required: true, message: '请选择卡车类型', trigger: 'blur' }] },
    { field: 'carNumber', name: '车牌号', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入车牌号' }, rules: [{ required: true, message: '请输入车牌号', trigger: 'blur' }] },
    { field: 'frameNumber', name: '车架号', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入车架号' }, rules: [{ required: true, message: '请输入车架号', trigger: 'blur' }] },
    { field: 'trailerNumber', name: '挂车牌号', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入挂车牌号' } },
    { field: 'purchaseDate', name: '购车日期', show: { type: 'date-picker', model: 'date', style: 'width: 90%;', placeholder: '请输入购车日期' } },
    { field: 'color', name: '颜色', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入颜色' }, rules: [{ required: true, message: '请输入颜色', trigger: 'blur' }] },
    { field: 'deadWeight', name: '载重量', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入载重量' }, rules: [{ required: true, message: '请输入载重量', trigger: 'blur' }] },
    { field: 'capacity', name: '储气罐容量', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入储气罐容量' }, rules: [{ required: true, message: '请输入储气罐容量', trigger: 'blur' }] },
    { field: 'manufacturer', name: '生产厂家', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入生产厂家' }, rules: [{ required: true, message: '请输入生产厂家', trigger: 'blur' }] },
    { field: 'autoAccount', name: '圈存方式', show: { type: 'radio', obj: 'autoAccount', value: 0, placeholder: '请选择圈存方式' }, rules: [{ required: true, message: '请选择圈存方式', trigger: 'blur' }] }
  ],
  logisticsDetail: [
    { field: 'orgName', nameSpan: 5, name: '公司名称', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'contacts', nameSpan: 5, name: '联系人', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'mobile', nameSpan: 5, name: '联系电话', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'address', nameSpan: 5, name: '地址', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'email', nameSpan: 5, name: '邮箱', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'legalperson', nameSpan: 5, name: '法人姓名', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'idCard', nameSpan: 5, name: '法人身份证号码', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'bank', nameSpan: 5, name: '开户行', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'account', nameSpan: 5, name: '银行账户', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'taxpayer', nameSpan: 5, name: '纳税人识别号', show: { type: 'text', style: 'width: 90%;', isDisabled: true } },
    { field: 'status', nameSpan: 5, name: '账号状态', show: { type: 'select', obj: 'status', style: 'width: 90%;', isDisabled: true } }
  ],
  firmAccount: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
    { field: 'orgName', stype: 'mapping', name: '公司名称', ispush: false, mapping: 'orgName', show: { type: 'text', isDisabled: true, remote: true, subField: 'orgName', obj: 'orgId', style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
    { field: 'accountId', name: '公司账户管理' },
    { field: 'balance', name: '账户余额（元）', ispush: false },
    { field: 'autoAccount', name: '是否自动圈存', formatter: 'autoAccount', nameSpan: 5, show: { type: 'radio', value: 0, obj: 'autoAccount', placeholder: '请选择是否自动圈存' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'createDate', name: '创建时间', ispush: false, formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'accountPassword', hide: true },
    { field: 'updater', hide: true },
    { field: 'updaterName', hide: true },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'load', name: '圈存' }, { type: 'accState', name: '流水列表' }, { type: 'edit', name: '编辑' }] }
  ],
  firmAccountList: [
    { field: 'createDate', nameSpan: 5, name: '交易时间', fixed: 'left', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', model: 'daterange' } },
    /* { field: 'billId', name: '交易单号', show: { type: 'text' }, search: { type: 'text', placeholder: '请输入交易单号' } }, */
    { field: 'type', name: '交易类型', formatter: 'type' },
    { field: 'anotherAccount', name: '对方账号' },
    { field: 'anotherName', name: '对方账户名称' },
    { field: 'changeAmount', nameSpan: 5, name: '变化金额(元)' },
    { field: 'accountBalance', nameSpan: 5, name: '变化后账户金额(元)' },
    { field: 'note', nameSpan: 5, name: '摘要' },
    { field: 'orderId', name: '订单编号' }
  ],
  firmAccountRecharge: [
    { field: 'orgName', name: '公司名称', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'mobile', name: '手机号', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'address', name: '公司地址', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'amount', name: '充值', show: { type: 'text', placeholder: '请输入充值金额', style: 'width: 90%;' }, rules: [{ required: true, message: '请输入充值金额！', trigger: 'blur' }] },
    { field: 'note', name: '摘要', show: { type: 'textarea', placeholder: '请输入充值摘要', style: 'width: 90%;' } }
  ],
  vehicleCircle: [
    { field: 'truckId', nameSpan: 5, name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'carNumber', nameSpan: 5, name: '车牌号', search: { type: 'text', placeholder: '请输入车牌号' } },
    { field: 'balance', nameSpan: 5, name: '车辆账户余额' },
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
    { field: 'orgId', name: '公司名称', stype: 'mapping', mapping: 'orgName', fixed: 'left', show: { type: 'hide', subField: 'orgName' }, search: { type: 'text', field: 'orgName', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
    { field: 'truckId', name: '', hide: true },
    { field: 'truckName', name: '卡车名称', hide: true, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入卡车名称' }, rules: [{ required: true, message: '请输入卡车名称', trigger: 'blur' }] },
    { field: 'carNumber', name: '车牌号', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入车牌号' }, search: { type: 'text', placeholder: '请输入车牌号' }, rules: [{ required: true, message: '请输入车牌号', trigger: 'blur' }] },
    { field: 'linked', name: '车辆类型', formatter: 'truckType', show: { type: 'select', obj: 'truckType', cascaderList: [{ value: 1, fields: ['autoAccount'] }], style: 'width: 90%;', placeholder: '请选择卡车类型' }, rules: [{ required: true, message: '请选择卡车类型', trigger: 'blur' }] },
    { field: 'frameNumber', name: '车架号', hide: true, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入车架号' }, rules: [{ required: true, message: '请输入车架号', trigger: 'blur' }] },
    { field: 'trailerNumber', name: '挂车牌号', hide: true, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入挂车牌号' } },
    { field: 'purchaseDate', name: '购车日期', hide: true, show: { type: 'date-picker', model: 'date', format: 'yyyy-MM-dd', style: 'width: 90%;', placeholder: '请输入购车日期' } },
    { field: 'color', name: '颜色', hide: true, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入颜色' }, rules: [{ required: true, message: '请输入颜色', trigger: 'blur' }] },
    { field: 'deadWeight', name: '载重量', hide: true, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入载重量' } },
    { field: 'capacity', name: '储气罐容量', hide: true, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入储气罐容量' }, rules: [{ required: true, message: '请输入储气罐容量', trigger: 'blur' }] },
    { field: 'manufacturer', name: '生产厂家', hide: true, show: { type: 'text', style: 'width: 90%;', placeholder: '请输入生产厂家' }, rules: [{ required: true, message: '请输入生产厂家', trigger: 'blur' }] },
    { field: 'status', name: '车辆状态', formatter: 'status', show: { type: 'radio', value: 0, obj: 'status', placeholder: '请选择车辆状态' }, search: { type: 'select', obj: 'status', placeholder: '请选择车辆状态' }, rules: [{ required: true, message: '请选择车辆状态！', trigger: 'blur' }] },
    { field: 'autoAccount', name: '圈存方式', hide: true, show: { type: 'radio', obj: 'autoAccount', value: 0, placeholder: '请选择圈存方式' }, rules: [{ required: true, message: '请选择圈存方式', trigger: 'blur' }] },
    { field: 'truckDriverList', name: '当前绑定司机', ispush: false, formatter: '', stype: 'list-tag', porps: { name: 'driverName' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 240, list: [{ type: 'bind', name: '绑定司机' }, { type: 'edit', name: '编辑' }, { type: 'detail', name: '详情' }, { type: 'money', name: '资金归集' }] }
  ],
  vehicle_detail: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
    { field: 'truckName', name: '卡车名称', hide: true, show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'carNumber', name: '车牌号', show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'frameNumber', name: '车架号', hide: true, show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'trailerNumber', name: '挂车牌号', hide: true, show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'purchaseDate', name: '购车日期', hide: true, show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'color', name: '颜色', hide: true, show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'deadWeight', name: '载重量', hide: true, show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'capacity', name: '储气罐容量', hide: true, show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'manufacturer', name: '生产厂家', hide: true, show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'driverInfo', name: '', show: { type: 'span', ou: 1, isDisabled: true } },
    { field: 'balance', name: '账户余额', show: { type: 'span', ou: 2, isDisabled: true } },
    { field: 'status', name: '车辆状态', formatter: 'status', show: { type: 'radio', obj: 'status', ou: 2, isDisabled: true } }
  ],
  vehicle_collect: [
    { field: 'amount', name: '归集金额', lg: 24, xl: 24, show: { type: 'text', placeholder: '请输入归集金额' }, rules: [{ required: true, message: '请输入归集金额', trigger: 'blur' }] },
    { field: 'balanceInfo', name: '', lg: 24, xl: 24, show: { type: 'span' } }
  ],
  vehicle_bind: [
    { field: 'orgName', name: '卡车名称', lg: 24, xl: 24, hide: true, show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'carNumber', name: '车牌号', lg: 24, xl: 24, show: { type: 'text', ou: 0, isDisabled: true } },
    { field: 'driverInfo', name: '绑定司机', lg: 24, xl: 24, show: { type: 'select', multiple: true, obj: 'driverList', placeholder: '请选择要绑定的司机' } }
  ],
  truckAccount: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
    { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
    { field: 'accountId', name: '账号' },
    { field: 'carNumber', name: '车牌号' },
    { field: 'balance', name: '余额' },
    { field: 'createDate', name: '创建时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: [{ type: 'detail', name: '流水列表' }] }
  ],
  truckAccountList: [
    { field: 'createDate', name: '交易时间', fixed: 'left', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'orderId', name: '交易单号', search: { type: 'text', placeholder: '请输入交易单号' } },
    { field: 'type', name: '交易类型', formatter: 'type' },
    { field: 'anotherAccount', name: '对方账号' },
    { field: 'anotherName', name: '对方账户名称' },
    { field: 'changeAmount', name: '变化金额(元)' },
    { field: 'accountBalance', name: '变化后账户金额(元)' },
    { field: 'note', name: '摘要' },
    { field: 'orderId', name: '订单编号' }
  ],
  rechargeRecord: [
    { field: 'rechargeOrderId', name: '订单编号', fixed: 'left', search: { type: 'text', placeholder: '请输入充值方或订单编号' } },
    { field: 'createDate', name: '充值时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'orgName', name: '充值方' },
    { field: 'amount', name: '充值金额(元)' },
    { field: 'type', name: '支付方式', formatter: 'rechargeType' },
    { field: 'status', name: '订单状态', formatter: 'utilsCheck' }
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
    { field: 'status', name: '状态', formatter: 'utilsCheck', show: { type: 'select', isDisabled: true, obj: 'utilsCheck', style: 'width: 90%;' } },
    { field: 'auditerName', name: '审核人', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } },
    { field: 'auditDate', name: '审核时间', show: { type: 'text', isDisabled: true, style: 'width: 90%;' } }
  ],
  inventoryManager: [
    { field: 'transferOrderId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
    { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
    { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入车牌号' } },
    { field: 'type', name: '类别', formatter: 'utilsAccountType', search: { type: 'select', obj: 'utilsAccountType', placeholder: '请选择类别' } },
    { field: 'amount', name: '圈存金额' },
    { field: 'createDate', name: '圈存日期', formatFun: 'formateTData all', width: 140, stype: 'format' }
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
    { field: 'createDate', name: '创建日期', formatFun: 'formateTData all', width: 140, stype: 'format' },
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

export default columns
