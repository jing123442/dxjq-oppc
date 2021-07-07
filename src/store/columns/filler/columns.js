import file from '../../modules/file'
import { buttonLNGPlanList, buttonOrgFillerList } from '@/utils/button'
import { monthTimeArea } from '@/utils/tools'
import { utilsTableOptionsToFilters, utilsCommonAuthStatus, utilsContractStatus } from '@/utils/select'

const columns = {
  firmList: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, hide: true, show: { noShow: 1 } },
    { field: 'orgName', name: '企业名称', fixed: 'left', show: { type: 'text', ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请输入企业名称' }, search: { type: 'text', field: 'keyword', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }] },
    { field: 'orgShortName', name: '加气站名称' },
    { field: 'address', name: '地址', show: { type: 'cascader', fieldList: ['address', 'areas'], formatter: 'address', obj: 'cascaderAddress', props: { value: 'label', label: 'label' }, iType: 'string', sign: '', ou: 1, noShow: 2, style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'change' }] },
    { field: 'areas', name: '详细地址', hide: true, show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入详细地址' }, rules: [{ required: true, message: '请输入详细地址！', trigger: 'blur' }] },
    { field: 'status', name: '状态', formatter: 'status', width: 60 },
    { field: 'authStatus', name: '认证状态', formatter: 'authStatus', filters: [{ value: 0, text: '未认证' }, { value: 1, text: '认证中' }, { value: 2, text: '已认证' }, { value: 3, text: '认证失败' }] },
    { field: 'protocolNo', name: '转账协议', stype: 'format', formatFun: 'tableStatusToLabel', width: 70 },
    { field: 'contractNo', name: '提现协议', stype: 'format', formatFun: 'tableStatusToLabel', width: 70 },
    { field: 'regnumStatus', name: '营业执照认证', formatter: 'authStatus' },
    { field: 'idcardStatus', name: '法人证件认证', formatter: 'authStatus' },
    { field: 'bindPhone', name: '绑定验证手机号', width: 110 },
    { field: 'authDate', name: '认证时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 200, list: params => buttonOrgFillerList(params) }
  ],
  fillerAuthList: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, hide: true },
    { field: 'orgName', name: '企业名称', fixed: 'left', search: { type: 'text', placeholder: '请输入企业名称' } },
    { field: 'orgShortName', name: '加气站名称' },
    { field: 'address', name: '地址' },
    { field: 'mobile', name: '管理员手机号', width: 110 },
    { field: 'status', name: '状态', formatter: 'status', width: 60 },
    { field: 'authStatus', name: '认证状态', formatter: 'authStatus', filters: utilsTableOptionsToFilters('utilsAuthStatus') },
    { field: 'gasLicenseStatus', name: '加气站执照', stype: 'link-status', value: [1], obj: utilsCommonAuthStatus() },
    { field: 'gasBusinessStatus', name: '燃气经营状态', stype: 'link-status', value: [1], obj: utilsCommonAuthStatus() },
    { field: 'gasFillingStatus', name: '气瓶充装状态', stype: 'link-status', value: [1], obj: utilsCommonAuthStatus() },
    { field: 'fireControlStatus', name: '消防验收', stype: 'link-status', value: [1], obj: utilsCommonAuthStatus() },
    { field: 'envImpactStatus', name: '环评报告', stype: 'link-status', value: [1], obj: utilsCommonAuthStatus() },
    { field: 'contractStatus', name: '合同签约', stype: 'link-status', value: [1], obj: utilsContractStatus() },
    { field: 'authDate', name: '认证时间', stype: 'format', formatFun: 'formateTData all', width: 140, search: { type: 'date-picker', placeholder: '' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 100, list: [{ type: 'self_detail', name: '详情' }] }
  ],
  fillerChild: [
    { field: 'orgId', name: '企业名称', fixed: 'left', show: { type: 'select', ou: 1, findKey: 'orgName', remote: true, obj: 'fillerParent', style: 'width: 90%;', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }] },
    { field: 'orgShortName', name: '加气站名称', fixed: 'left', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入加气站名称' }, rules: [{ required: true, message: '请输入加气站名称', trigger: 'blur' }] },
    { field: 'adminName', name: '姓名', fixed: 'left', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }] },
    { field: 'adminMobile', name: '手机号', fixed: 'left', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入手机号' }, rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }] }
  ],
  fillerUser: [
    { field: 'userName', name: '用户姓名', fixed: 'left' },
    { field: 'userCode', name: '登录账号' },
    { field: 'mobile', name: '手机号码' },
    { field: 'lastLoginDate', name: '最后登录时间' },
    { field: 'status', name: '账号状态', formatter: 'status' }
  ],
  info: [
    { field: 'gasstationId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, hide: true, show: { type: 'hide', isNode: true, parent: 'gasstationVO' } },
    { field: 'gasstationName', name: '企业名称', nameSpan: 6, fixed: 'left', show: { type: 'text', ou: 2, isNode: true, parent: 'gasstationVO', style: 'width: 90%;', placeholder: '请输入企业名称', isDisabled: true }, search: { type: 'text', nameSpan: 0, placeholder: '请输入企业名称' } },
    { field: 'nickName', name: '加气站名称', nameSpan: 6, show: { type: 'text', ou: 2, isNode: true, parent: 'gasstationVO', style: 'width: 90%;', placeholder: '请输入加气站名称' }, rules: [{ required: true, message: '请输入加气站名称', trigger: 'blur' }] },
    { field: 'gasType', name: '站点类型', formatter: 'gasstationType', nameSpan: 6, show: { type: 'select', ou: 2, obj: 'gasstationType', parent: 'gasstationVO', style: 'width: 90%;', placeholder: '请选择站点类型' }, rules: [{ required: true, message: '请选择站点类型', trigger: 'blur' }] },
    { field: 'listPrice', name: '加气站挂牌价(元/公斤)', ispush: false },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)', ispush: false },
    { field: 'qrcode', name: '收款码类型', formatter: 'qrcodeType', ispush: false },
    { field: 'selectedOptions', hide: true, name: '所在地区', nameSpan: 6, show: { type: 'cascader', parent: 'gasstationVO', iType: 'string', ou: 2, mulField: { province: 0, city: 1, region: 2 }, props: { value: 'label', label: 'label' }, obj: 'cascaderAddress', style: 'width: 90%;', placeholder: '请选择所在地区' }, rules: [{ required: true, message: '请选择所在地区', trigger: 'blur' }] },
    { field: 'address', name: '详细地址', nameSpan: 6, show: { type: 'text', ou: 2, parent: 'gasstationVO', style: 'width: 90%;', placeholder: '请输入详细地址' }, rules: [{ required: true, message: '请输入详细地址', trigger: 'blur' }] },
    { field: 'pointAddress', name: '经纬度', colspan: 24, hide: true, nameSpan: 3, show: { type: 'map', ou: 2, parent: 'gasstationVO', mulField: { longitude: 0, latitude: 1 }, iType: 'string', sign: ',', style: 'width: 40.5%', placeholder: '经纬度' }, rules: [{ required: true, message: '请选择经纬度', trigger: 'change' }] },
    { field: 'url', name: '加气站头像', filefield: 'file', hide: true, nameSpan: 6, show: { type: 'file', ou: 2, parent: 'gasstationVO', iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传加气站头像', node: [], rules: [{ required: true, message: '请上传加气站头像！', trigger: 'change' }] } },
    { field: 'orgPics', name: '加气站形象图', filefield: 'file', ispush: false, hide: true, nameSpan: 6, show: { type: 'file', ou: 2, limit: 6, size: 1024, iType: 'string', btnType: true, paramField: 'url', props: { url: 'picPath', name: 'picPath' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传加气站形象图', node: [], successAxios: file.state.successAxios, deleteAxios: file.state.deleteAxios, rules: [{ required: true, message: '请上传加气站形象图！', trigger: 'change' }] } },
    { field: 'introduce', hide: true, name: '加气站宣传文案', nameSpan: 6, show: { type: 'textarea', ou: 2, maxlength: 400, isWordLimit: true, style: 'width: 90%;', placeholder: '请输入加气站宣传文案' } },
    { field: 'mobile', hide: true, name: '加气站联系电话', nameSpan: 6, show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入加气站联系电话', util: '<div style="font-size: 12px;color: #efab10;">此联系电话将在加气站名片和物流公司的订单详情中显示</div>' }, rules: [{ validator: 'isValidateMobile', message: '请输入正确的加气站联系电话', trigger: 'blur' }] },
    { field: 'fillingMachineNum', hide: true, name: '加注机数量', nameSpan: 6, show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入加注机数量' } },
    { field: 'cashierNum', hide: true, name: '收银员数量', nameSpan: 6, show: { type: 'text', ou: 2, style: 'width: 90%;', placeholder: '请输入收银员数量' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 150, list: [{ type: 'edit', name: '编辑' }, { type: 'printer', name: '小票机' }] }
  ],
  printList: [
    { field: 'id', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, hide: true, show: { type: 'hide', noShow: 1 } },
    { field: 'printName', name: '小票机名称', fixed: 'left', show: { type: 'text', style: 'width: 90%;', placeholder: '请输入小票机名称' }, rules: [{ required: true, message: '请输入小票机名称', trigger: 'blur' }] },
    { field: 'machineCode', name: '终端号', show: { type: 'text', isDisabled: true, style: 'width: 90%;', placeholder: '请输入终端号' }, rules: [{ required: true, message: '请输入终端号', trigger: 'blur' }] },
    { field: 'msign', name: '密钥', show: { type: 'text', isDisabled: true, style: 'width: 90%;', placeholder: '请输入密钥' }, rules: [{ required: true, message: '请输入密钥', trigger: 'blur' }] },
    { field: 'phone', name: '流量卡号', show: { type: 'text', isDisabled: true, style: 'width: 90%;', placeholder: '请输入流量卡号' }, rules: [{ required: true, message: '请输入流量卡号', trigger: 'blur' }] },
    { field: 'status', name: '状态', formatter: 'printStatus', show: { noShow: 3 } },
    { field: 'print', name: '打印小票', formatter: 'printPaper', show: { type: 'radio', value: 0, obj: 'printPaper', placeholder: '请选择打印小票' }, rules: [{ required: true, message: '请选择打印小票！', trigger: 'blur' }] },
    { field: 'voice', name: '音量', formatter: 'voiceStatus', show: { type: 'radio', value: 0, obj: 'voiceStatus', placeholder: '请选择音量' }, rules: [{ required: true, message: '请选择音量！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 90, list: [{ type: 'edit', name: '编辑' }, { type: 'delete', name: '删除' }] }
  ],
  account: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', hide: true, width: 50 },
    { field: 'orgName', name: '企业名称', fixed: 'left', search: { type: 'text', placeholder: '请输入企业名称' } },
    { field: 'orgShortName', name: '加气站名称' },
    { field: 'accountId', name: '账号' },
    { field: 'balance', name: '账户余额' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 100, list: [{ type: 'list', name: '流水列表' }] }
  ],
  accountList: [
    { field: 'createDate', name: '交易时间', fixed: 'left', stype: 'format', formatFun: 'formateTData all', width: 140, search: { type: 'date-picker', model: 'daterange' } },
    /* { field: 'billId', name: '交易单号', show: { type: 'text' }, search: { type: 'text', placeholder: '请输入交易单号' } }, */
    { field: 'type', name: '交易类型', formatter: 'type' },
    { field: 'anotherAccount', name: '对方账号' },
    { field: 'anotherName', name: '对方账户名称' },
    { field: 'changeAmount', name: '变化金额(元)' },
    { field: 'accountBalance', name: '变化后账户金额(元)' },
    { field: 'note', name: '摘要' },
    { field: 'orderId', name: '订单编号', search: { type: 'text', placeholder: '请输入订单编号' } }
  ],
  price: [
    { field: 'gasstationName', nameSpan: 5, name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'listPrice', nameSpan: 5, name: '当前挂牌价(元/公斤)' },
    { field: 'useropts', nameSpan: 5, stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 100, list: [{ type: 'record', name: '变更记录' }] }
  ],
  priceLog: [
    { field: 'gasstationName', nameSpan: 5, name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'listPrice', nameSpan: 5, name: '当前挂牌价(元/公斤)' },
    { field: 'createrName', name: '操作人' },
    { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 }
  ],
  serviceChangeRecord: [
    { field: 'orgName', name: '加气站企业名称', fixed: 'left' },
    { field: 'gasstationName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'platformFee', name: '平台服务费(元/公斤)' },
    { field: 'gasstationFee', name: '加气站服务费(元/公斤)' },
    { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'createrName', name: '操作人' }
  ],
  lngUpdatePrice: [
    { field: 'orgName', name: '加气站企业名称', fixed: 'left' },
    { field: 'gasstationName', name: '加气站名称' },
    { field: 'listPrice', name: '当前挂牌价（元/公斤）' },
    { field: 'createDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'createrName', name: '操作人' }
  ],
  gasStockList: [
    { field: 'nickName', name: '加气站名称', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'stock', name: '库存量(公斤)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'list', name: '库存记录' }, { type: 'update', name: '库存调整' }] }
  ],
  gasUpdateStock: [
    { field: 'gasstationId', name: '', nameSpan: 6, show: { type: 'hide', isDisabled: true } },
    { field: 'stock', name: '当前库存(公斤)', nameSpan: 6, show: { type: 'text', isDisabled: true } },
    { field: 'increase', name: '调整重量(公斤)', nameSpan: 6, show: { type: 'text', placeholder: '请输入调整重量' } },
    { field: 'note', name: '摘要', nameSpan: 6, show: { type: 'textarea', placeholder: '请输入调整库存重量摘要' } }
  ],
  gasStockListRecord: [
    { field: 'createDate', name: '时间', fixed: 'left', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'stockType', name: '变更类型', formatter: 'stockType' },
    { field: 'quantity', name: '变更量(公斤)' },
    { field: 'stock', name: '变更后库存(公斤)' },
    { field: 'note', name: '摘要' }
  ],
  lngPlan: [
    { field: 'id', name: '计划编号', fixed: 'left', nameSpan: 6, width: 140, detail: { type: 'span', serial: 1, ou: 1 } },
    { field: 'gasstationName', name: '企业名称', nameSpan: 6, width: 140, detail: { type: 'span', serial: 3, ou: 1 } },
    { field: 'nickName', name: '加气站名称', nameSpan: 6, width: 140, search: { type: 'text', serial: 1, findStyle: 'width: 18%;height: 50px;', style: 'width: 100%', nameSpan: 0, placeholder: '请输入加气站名称' }, detail: { type: 'span', serial: 3, ou: 1 } },
    { field: 'planTime', name: '期望到站日期', nameSpan: 6, width: 140, stype: 'format', formatFun: 'formateTData all', search: { type: 'date-picker', serial: 3, findStyle: 'width: 32%;', style: 'width: 100%', nameSpan: 0, placeholder: { start: '期望到站开始时间', end: '期望到站结束时间' } }, detail: { type: 'span', serial: 4, ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'status', name: '订单状态', formatter: 'planStatus', nameSpan: 6, search: { type: 'select', serial: 2, nameSpan: 0, obj: 'planStatus', placeholder: '请选择状态', style: 'width: 100%', findStyle: 'width: 18%;height: 50px;' }, detail: { type: 'span', model: 'select', obj: 'planStatus', serial: 2, ou: 1 } },
    { field: 'createTime', name: '提报时间', nameSpan: 6, width: 140, stype: 'format', formatFun: 'formateTData all', search: { type: 'date-picker', serial: 5, nameSpan: 0, placeholder: '', style: 'width: 100%', findField: 'createTime', dtime: ['00:00:00', '23:59:59'], value: (function() { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) }, currSearch: { type: 'select', nameSpan: 0, style: 'width: 100%', subField: 'createDateName', hideName: true, obj: 'currLNGDataSearch', value: 'createTime' } },
    { field: 'lockTime', name: '锁定时间', width: 140, stype: 'format', formatFun: 'formateTData all' },
    { field: 'modifyApplyTime', name: '变更提报时间', width: 140, stype: 'format', formatFun: 'formateTData all' },
    { field: 'confirmTime', name: '确认时间', width: 140, stype: 'format', formatFun: 'formateTData all' },
    { field: 'leaveTime', name: '出港时间', width: 140, stype: 'format', formatFun: 'formateTData all', search: { type: 'date-picker', serial: 4, style: 'width: 100%', findStyle: 'width: 32%;', placeholder: { start: '出港开始时间', end: '出港结束时间' } } },
    { field: 'uploadTime', name: '出港磅单录入时间', width: 140, stype: 'format', formatFun: 'formateTData all' },
    { field: 'reachTime', name: '签收时间', width: 140, stype: 'format', formatFun: 'formateTData all' },
    { field: 'completeTime', name: '完成时间', width: 140, stype: 'format', formatFun: 'formateTData all' },
    { field: 'cancelTime', name: '取消时间', width: 140, stype: 'format', formatFun: 'formateTData all' },
    { field: 'exceptionApplyTime', name: '异常提报时间', width: 140, stype: 'format', formatFun: 'formateTData all' },
    { field: 'downloadContactName', name: '卸车联系人', hide: true, nameSpan: 6, detail: { type: 'span', serial: 5, ou: 1 } },
    { field: 'downloadContactPhone', name: '卸车人联系电话', hide: true, nameSpan: 6, detail: { type: 'span', serial: 6, ou: 1 } },
    { field: 'createNote', name: '提报备注', hide: true, nameSpan: 6, detail: { type: 'span', serial: 7, ou: 1 } },
    { field: 'lngFromName', name: '液原地', hide: true, nameSpan: 6, detail: { type: 'span', serial: 8, ou: 1 } },
    { field: 'uploadWeight', name: '出港量(公斤)', hide: true, nameSpan: 6, detail: { type: 'span', serial: 9, ou: 1 } },
    { field: 'leaveTime', name: '出港时间', hide: true, nameSpan: 6, detail: { type: 'span', serial: 10, ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'checkWeight', name: '核准气量(公斤)', hide: true, nameSpan: 6, detail: { type: 'span', serial: 11, ou: 1 } },
    { field: 'operatorReachTime', name: '签收时间', hide: true, nameSpan: 6, detail: { type: 'span', serial: 12, ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'driverName', name: '驾驶员', hide: true, nameSpan: 6, detail: { type: 'span', serial: 13, ou: 1 } },
    { field: 'driverPhone', name: '驾驶员联系方式', hide: true, nameSpan: 6, detail: { type: 'span', serial: 14, ou: 1 } },
    { field: 'carNumber', name: '车牌号', hide: true, nameSpan: 6, detail: { type: 'span', serial: 15, ou: 1 } },
    { field: 'trailerNumber', name: '挂牌号', hide: true, nameSpan: 6, detail: { type: 'span', serial: 16, ou: 1 } },
    { field: 'uploadUrl', name: '出港磅单', hide: true, nameSpan: 6, detail: { type: 'span', model: 'img', serial: 17, ou: 1 } },
    { field: 'downloadUrl', name: '到站榜单', hide: true, nameSpan: 6, detail: { type: 'span', model: 'img', serial: 18, ou: 1 } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 250, list: params => buttonLNGPlanList(params) }
  ],
  lngPlanCancelInfo: [
    { field: 'id', name: '计划编号', fixed: 'left', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'status', name: '订单状态', nameSpan: 6, show: { type: 'span', model: 'select', obj: 'planStatus', ou: 1 } },
    { field: 'nickName', name: '加气站名称', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'planTime', name: '期望送达时间', nameSpan: 6, show: { type: 'span', ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'downloadContactName', name: '卸车联系人', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'downloadContactPhone', name: '卸车联系电话', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'createNote', name: '提报备注', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'note', name: '计划取消原因', nameSpan: 6, show: { type: 'text', ou: 2 }, rules: [{ required: true, message: '请输入计划取消原因', trigger: 'blur' }] }
  ],
  lngPlanLeaveInfo: [
    { field: 'id', name: '计划编号', fixed: 'left', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'status', name: '订单状态', nameSpan: 6, show: { type: 'span', model: 'select', obj: 'planStatus', ou: 1 } },
    { field: 'nickName', name: '加气站名称', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'planTime', name: '期望送达时间', nameSpan: 6, show: { type: 'span', ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'createNote', name: '提报备注', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'uploadWeight', name: '出港重量(公斤)', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入出港重量' }, rules: [{ required: true, message: '请输入出港重量', trigger: 'blur' }] },
    { field: 'driverName', name: '驾驶员', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入驾驶员' }, rules: [{ required: true, message: '请输入驾驶员', trigger: 'blur' }] },
    { field: 'lngFromCode', name: '液原地', nameSpan: 6, show: { type: 'select', subField: 'lngFromName', ou: 2, obj: 'source', placeholder: '请选择液原地' }, rules: [{ required: true, message: '请选择液原地', trigger: 'blur' }] },
    { field: 'driverPhone', name: '驾驶员联系方式', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入驾驶员联系方式' }, rules: [{ required: true, message: '请输入驾驶员联系方式', trigger: 'blur' }, { validator: 'isValidateMobile', message: '请输入正确格式的驾驶员联系方式', trigger: 'blur' }] },
    { field: 'leaveTime', name: '出港时间(装车结束时间)', nameSpan: 6, show: { type: 'date-picker', model: 'datetime', ou: 2, placeholder: '请选择出港时间' }, rules: [{ required: true, message: '请选择出港时间', trigger: 'blur' }] },
    { field: 'carNumber', name: '车牌号', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入车牌号' }, rules: [{ required: true, message: '请输入车牌号', trigger: 'blur' }] },
    { field: 'uploadUrl', name: '上传出港磅单', nameSpan: 6, filefield: 'file', show: { type: 'file', ou: 2, iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传出港磅单', node: [] } },
    { field: 'trailerNumber', name: '挂车号', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入挂车号' }, rules: [{ required: true, message: '请输入挂车号', trigger: 'blur' }] }
  ],
  lngPlanCheckInfo: [
    { field: 'id', name: '计划编号', fixed: 'left', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'status', name: '订单状态', nameSpan: 6, show: { type: 'span', model: 'select', obj: 'planStatus', ou: 1 } },
    { field: 'nickName', name: '加气站名称', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'planTime', name: '期望送达时间', nameSpan: 6, show: { type: 'span', ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'createNote', name: '提报备注', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'lngFromName', name: '液原地', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'uploadWeight', name: '出港重量(公斤)', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'uploadTime', name: '出港时间(装车结束时间)', nameSpan: 6, show: { type: 'span', ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'driverName', name: '驾驶员', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'driverPhone', name: '驾驶员联系方式', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'carNumber', name: '车牌号', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'trailerNumber', name: '挂车号', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'uploadUrl', name: '出港磅单', nameSpan: 6, show: { type: 'span', model: 'img', ou: 1 } },
    { field: 'downloadUrl', name: '到港磅单', nameSpan: 6, show: { type: 'span', model: 'img', ou: 1 } },
    { field: 'checkType', name: '核对磅单', nameSpan: 6, show: { type: 'select', clearable: false, obj: 'checkType', cascaderList: [{ value: 1, fields: ['note'] }], ou: 2 }, rules: [{ required: true, message: '请选择核对磅单', trigger: 'blur' }] },
    { field: 'note', name: '退回原因', nameSpan: 6, show: { type: 'text', ou: 2 }, rules: [{ required: true, message: '请输入退回原因', trigger: 'blur' }] }
  ],
  lngPlanAnomalousInfo: [
    { field: 'id', name: '计划编号', fixed: 'left', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'status', name: '订单状态', nameSpan: 6, show: { type: 'span', model: 'select', obj: 'planStatus', ou: 1 } },
    { field: 'nickName', name: '加气站名称', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'planTime', name: '期望送达时间', nameSpan: 6, show: { type: 'span', ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'createNote', name: '提报备注', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'lngFromName', name: '液原地', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'uploadWeight', name: '出港重量(公斤)', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'uploadTime', name: '出港时间(装车结束时间)', nameSpan: 6, show: { type: 'span', ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'driverName', name: '驾驶员', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'driverPhone', name: '驾驶员联系方式', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'carNumber', name: '车牌号', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'trailerNumber', name: '挂车号', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'uploadUrl', name: '出港磅单', nameSpan: 6, show: { type: 'span', model: 'img', ou: 1 } },
    { field: 'downloadUrl', name: '到港磅单', nameSpan: 6, show: { type: 'span', model: 'img', ou: 1 } },
    { field: 'exceptionApplyTime', name: '异常申报时间', nameSpan: 6, show: { type: 'span', ou: 2, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'exceptionApplyNote', name: '申报原因', nameSpan: 6, show: { type: 'span', ou: 2 } },
    { field: 'bearType', name: '处理方式', xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 3, inputSpan: 9, show: { type: 'select', clearable: false, obj: 'bearType', ou: 2, cascaderList: [{ value: 1, fields: ['exceptionHandleUrl', 'exceptionUploadUrl', 'exceptionUploadWeight', 'exceptionLngFromCode'] }, { value: 2, fields: ['exceptionUploadUrl', 'exceptionUploadWeight', 'exceptionLngFromCode'] }, { value: 3, fields: ['exceptionHandleUrl', 'exceptionCheckWeight', 'exceptionCheckNote'] }] }, rules: [{ required: true, message: '请输入处理方式', trigger: 'blur' }] },
    { field: 'exceptionUploadUrl', name: '修正出港磅单', filefield: 'file', nameSpan: 6, show: { type: 'file', ou: 2, iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传修正出港磅单', node: [] } },
    { field: 'exceptionUploadWeight', name: '出港重量(公斤)', nameSpan: 6, show: { type: 'text', ou: 2 }, rules: [{ required: true, message: '请输入出港重量', trigger: 'blur' }] },
    { field: 'exceptionLngFromCode', name: '液原地', nameSpan: 6, show: { type: 'select', subField: 'exceptionLngFromName', ou: 2, obj: 'source', placeholder: '请选择液原地' }, rules: [{ required: true, message: '请选择液原地', trigger: 'blur' }] },
    { field: 'exceptionHandleUrl', name: '上传凭证附件', filefield: 'file', nameSpan: 6, show: { type: 'file', ou: 2, iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传上传凭证附件', node: [] }, rules: [{ required: true, message: '请输入上传凭证附件', trigger: 'change' }] },
    { field: 'exceptionCheckWeight', name: '核准气量(公斤)', nameSpan: 6, show: { type: 'text', ou: 2 }, rules: [{ required: true, message: '请输入核准气量', trigger: 'blur' }] },
    { field: 'exceptionCheckNote', name: '处理答复', nameSpan: 6, show: { type: 'text', ou: 2 }, rules: [{ required: true, message: '请输入处理答复', trigger: 'blur' }] }
  ],
  lngPlanChange: [
    { field: 'id', name: '计划编号', fixed: 'left', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'status', name: '订单状态', nameSpan: 6, show: { type: 'span', model: 'select', obj: 'planStatus', ou: 1 } },
    { field: 'nickName', name: '加气站名称', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'planTime', name: '期望送达时间', nameSpan: 6, show: { type: 'span', ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'createNote', name: '提报备注', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'modifyCreateTime', name: '变更提报时间', nameSpan: 6, show: { type: 'span', ou: 2, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'modifyCreateNote', name: '变更发起原因', nameSpan: 6, show: { type: 'span', ou: 2 } },
    { field: 'modifyApplyType', name: '变更类型', xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 3, inputSpan: 9, show: { type: 'span', model: 'select', obj: 'modifyApplyType', ou: 2 } },
    { field: 'planTime', name: '期望送达时间(前)', nameSpan: 6, show: { type: 'span', ou: 2, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'modifyPlanTime', name: '期望送达时间(后)', nameSpan: 6, show: { type: 'span', ou: 2, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'downloadContactName', name: '卸车联系人(前)', nameSpan: 6, show: { type: 'span', ou: 2 } },
    { field: 'modifyDownloadContactName', name: '卸车联系人(后)', nameSpan: 6, show: { type: 'span', ou: 2 } },
    { field: 'downloadContactPhone', name: '卸车联系电话(前)', nameSpan: 6, show: { type: 'span', ou: 2 } },
    { field: 'modifyDownloadContactPhone', name: '卸车联系电话(后)', nameSpan: 6, show: { type: 'span', ou: 2 } },
    { field: 'handleType', name: '处理方式', nameSpan: 6, show: { type: 'select', clearable: false, obj: 'handleType', cascaderList: [{ value: 1, fields: ['rejectNote'] }], ou: 2, placeholder: '请选择处理方式' }, rules: [{ required: true, message: '请选择处理方式', trigger: 'blur' }] },
    { field: 'rejectNote', name: '驳回描述', nameSpan: 6, show: { type: 'text', ou: 2, placeholder: '请输入驳回描述' }, rules: [{ required: true, message: '请输入驳回描述', trigger: 'blur' }] }
  ],
  lngPlanInfo: [
    { field: 'id', name: '计划编号', fixed: 'left', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'status', name: '订单状态', nameSpan: 6, show: { type: 'span', model: 'select', obj: 'planStatus', ou: 1 } },
    { field: 'nickName', name: '加气站名称', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'planTime', name: '期望送达时间', nameSpan: 6, show: { type: 'span', ou: 1, stype: 'format', formatFun: 'formateTData all' } },
    { field: 'downloadContactName', name: '卸车联系人', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'downloadContactPhone', name: '卸车联系电话', nameSpan: 6, show: { type: 'span', ou: 1 } },
    { field: 'createNote', name: '提报备注', nameSpan: 6, show: { type: 'span', ou: 1 } }
  ],
  lngPlanChangeInfo: [
    { field: 'operatorTime', name: '操作时间', width: 140, fixed: 'left', stype: 'format', formatFun: 'formateTData all' },
    { field: 'operatorName', name: '操作人', width: 100 },
    { field: 'typeName', name: '操作类型', width: 120 },
    { field: 'content', name: '操作内容', stype: 'v-html' }
  ]
}

export default columns
