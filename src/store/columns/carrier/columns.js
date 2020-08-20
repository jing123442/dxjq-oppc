const columns = {
  state: {
    logistics: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50 },
      { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', show: { type: 'text', remote: true, subField: 'orgName', obj: 'orgId', style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
      { field: 'address', name: '地址', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入地址' }, rules: [{ required: true, message: '请输入地址', trigger: 'blur' }] },
      { field: 'mobile', name: '联系电话', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入联系电话' }, rules: [{ required: true, message: '请输入联系电话', trigger: 'blur' }] },
      { field: 'createDate', name: '创建时间' },
      { field: 'status', name: '账号状态', formatter: 'status', show: { type: 'radio', value: 0, obj: 'status', placeholder: '请选择账号状态' }, search: { type: 'select', obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
      { field: 'email', name: '邮箱', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入邮箱' }, rules: [{ required: true, message: '请输入邮箱', trigger: 'blur' }] },
      { field: 'account', name: '银行账户', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入银行账户' } },
      { field: 'bank', name: '开户行', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入开户行' } },
      { field: 'legalperson', name: '法人姓名', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入法人姓名' }, rules: [{ required: true, message: '请输入法人姓名', trigger: 'blur' }] },
      { field: 'legalperson', name: '法人身份证号码', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入法人身份证号码' } },
      { field: 'taxpayer', name: '纳税人识别号', hide: true, show: { type: 'text', isCompare: true, style: 'width: 90%;', placeholder: '请输入纳税人识别号' }, rules: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }] },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'addCar', name: '添加车辆' }, { type: 'edit', name: '编辑' }, { type: 'detail', name: '详情' }] }
    ],
    firmAccount: [
      { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
      { field: 'orgName', stype: 'mapping', name: '公司名称', ispush: false, mapping: 'orgName', show: { type: 'text', isDisabled: true, remote: true, subField: 'orgName', obj: 'orgId', style: 'width: 90%;', placeholder: '请输入公司名称' }, search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
      { field: 'accountId', name: '公司账户管理' },
      { field: 'balance', name: '账户余额（元）', ispush: false },
      { field: 'autoAccount', name: '是否自动圈存', formatter: 'autoAccount', show: { type: 'radio', value: 0, obj: 'autoAccount', placeholder: '请选择是否自动圈存' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
      { field: 'createDate', name: '创建时间', ispush: false },
      { field: 'accountPassword', hide: true },
      { field: 'updater', hide: true },
      { field: 'updaterName', hide: true },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'pay', name: '充值' }, { type: 'load', name: '圈存' }, { type: 'accState', name: '账户流水' }, { type: 'edit', name: '编辑' }] }
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
      { field: 'createDate', name: '创建时间' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '账户流水', fixed: 'right', width: 140, list: [{ type: 'detail', name: '查看' }] }
    ],
    rechargeRecord: [
      { field: 'rechargeOrderId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
      { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
      { field: 'tel', name: '手机号', search: { type: 'text', placeholder: '请输入手机号' } },
      { field: 'rechargeDate', name: '充值时间' },
      { field: 'amount', name: '充值金额' },
      { field: 'status', name: '状态', formatter: 'utilsCheck', search: { type: 'select', obj: 'utilsCheck', placeholder: '请选择' } },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: [{ type: 'check', name: '审核' }, { type: 'detail', name: '详情' }] }
    ],
    inventoryManager: [
      { field: 'transferOrderId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, ispush: false },
      { field: 'orgName', stype: 'mapping', name: '公司名称', mapping: 'orgName', search: { type: 'text', placeholder: '请输入公司名称' }, rules: [{ required: true, message: '请输入公司名称', trigger: 'blur' }] },
      { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入车牌号' } },
      { field: 'type', name: '类别', formatter: 'utilsAccountType', search: { type: 'select', obj: 'utilsAccountType', placeholder: '请选择类别' } },
      { field: 'amount', name: '圈存金额' },
      { field: 'createDate', name: '圈存日期' }
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
      { field: 'createDate', name: '创建日期' },
      { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: [{ type: 'detail', name: '详情' }] }
    ]
  }
}

export default columns
