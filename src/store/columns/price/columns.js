import { buttonPublishReleaseList, discountCarrierOpt } from '@/utils/button'
import { monthTimeArea } from '@/utils/tools'
import file from '@/store/modules/file'

const columns = {
  listing: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'nickName', fixed: 'left' },
    { field: 'address', name: '加气站地址', search: { type: 'text', field: 'keyWord', placeholder: '请输入名称/地址/操作人' } },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)' },
    { field: 'harbourPrice', name: '出港价(元/吨)' },
    { field: 'benefit', name: '区域优惠(元/吨)' },
    { field: 'freight', name: '运费(元/吨)' },
    { field: 'profit', name: '加气站利润(元/公斤)' },
    { field: 'gasprice', name: '气价调节(元/吨)' },
    { field: 'lngFromName', name: '液源地' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', width: 230, fixed: 'right', list: [{ type: 'config_source', name: '液源地选择' }, { type: 'list', name: '变更记录' }, { type: 'config_gas_price', name: '气价调节' }] }
  ],
  direct: [
    { field: 'id', name: '', hide: true, show: { type: 'hide' } },
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'nickName', fixed: 'left',
      show: { type: 'select', subField: 'nickName', obj: 'gasstationList', placeholder: '请选择加气站' },
      search: { type: 'text', placeholder: '请输入内容', findField: 'gasstationId' },
      currSearch: { type: 'select', subField: 'currFieldName', style: 'width: 100%;', hideName: true, obj: 'currFieldSearch', value: 'gasstationId' } },
    { field: 'carrierOrgId', name: '物流客户', stype: 'mapping', mapping: 'carrierOrgName',
      show: { type: 'select', subField: 'carrierOrgName', obj: 'carrierList', placeholder: '请选择加气站' } },
    { field: 'gasstationDirectPrice', ispush: false, name: '结算特价(元/公斤)' },
    { field: 'platformPrice', ispush: false, name: '挂牌特价(元/公斤)' },
    { field: 'gasstationDirectFee', name: '服务费特价(元/公斤)',
      show: { type: 'text', placeholder: '请输入服务费特价' }, },
    { field: 'gasstationFee', ispush: false, name: '服务费标准价(元/公斤)' },
    { field: 'url', name: '合作协议', filefield: 'file', stype: 'link', label: '查看',
      show: { type: 'file', iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl1, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'text', accept: '.pdf', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传合作协议', node: [] }},
    { field: 'operatorDate', name: '服务费更新时间', ispush: false, stype: 'format', formatFun: 'formateTData all' },
    { field: 'operatorName', name: '操作人', ispush: false, width: 80 },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', width: 140, fixed: 'right', list: [{ type: 'del', name: '删除' }, { type: 'edit', name: '修改' }] }
  ],
  directLog: [
    { field: 'nickName', name: '加气站' },
    { field: 'carrierOrgName', name: '物流客户' },
    { field: 'content', name: '操作内容' },
    { field: 'operatorDate', name: '操作时间' },
    { field: 'operator', name: '操作人' },
  ],
  listingQuery: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'nickName', fixed: 'left', search: { type: 'text', field: 'nickName', placeholder: '请输入加气站名称' } },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)' },
    { field: 'harbourPrice', name: '出港价(元/吨)' },
    { field: 'benefit', name: '区域优惠(元/吨)' },
    { field: 'freight', name: '运费(元/吨)' },
    { field: 'profit', name: '加气站利润(元/公斤)' },
    { field: 'gasprice', name: '气价调节(元/吨)' },
    { field: 'lngFromName', name: '液源地' }
  ],
  listingLog: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'nickName', fixed: 'left' },
    { field: 'harbourPrice', name: '出港价(元/吨)' },
    { field: 'benefit', name: '区域优惠(元/吨)' },
    { field: 'freight', name: '运费(元/吨)' },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)' },
    { field: 'gasprice', name: '气价调节(元/吨)' },
    { field: 'lngFromName', name: '液源地' },
    { field: 'applyName', name: '操作人' },
    { field: 'applyDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 }
  ],
  listingFrom: [
    { field: 'lngFromId', name: '液源地', placeholder: '请选择液源地！', show: { type: 'select', obj: 'fromList', subField: 'lngFromName' }, rules: [{ required: true, message: '请选择液源地', trigger: 'blur' }] }
  ],
  listingMeasure: [
    { field: 'measureMoney', name: '设置气价调节金额', nameSpan: 6, lg: 23, xl: 23, show: { type: 'text', placeholder: '请输入设置气价调节金额', util: ' 元/吨', style: 'width: 80%;' }, rules: [{ required: true, message: '请输入设置气价调节金额', trigger: 'blur' }] }
  ],
  listingRelease: [
    { field: 'releaseTime', name: '发布时间', nameSpan: 7, show: { type: 'date-picker', model: 'date', vformat: 'yyyy-MM-dd HH:mm:ss', dataType: 'datetime' }, rules: [{ required: true, message: '请选择发布时间', trigger: 'blur' }] }
  ],
  departure: [
    { field: 'operatorName', name: '操作人', fixed: 'left', ispush: false },
    { field: 'operatorDate', name: '操作时间', ispush: false, stype: 'format', formatFun: 'formateTData all' },
    { field: 'harbourPrice', name: '长城奥扬出港价(元/吨)', nameSpan: 8, show: { type: 'text' } }
  ],
  measure: [
    { field: 'operatorName', name: '操作人', fixed: 'left', ispush: false },
    { field: 'operatorDate', name: '操作时间', ispush: false, stype: 'format', formatFun: 'formateTData all' },
    { field: 'gasprice', name: '气价调节(元/吨)', nameSpan: 8 }
  ],
  preferential: [
    { field: 'areaList', name: '地区(省市)', fixed: 'left', stype: 'fields', fieldList: ['province', 'city'], show: { type: 'cascader', obj: 'addressList', mulField: { province: 0, city: 1 }, props: { label: 'label', value: 'label', multiple: true } }, search: { type: 'text', field: 'keyWord', placeholder: '请输入省或市' } },
    { field: 'lngFromId', name: '', hide: true },
    { field: 'benefit', name: '优惠(元/吨)', show: { type: 'text' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'self_edit', name: '编辑' }, { type: 'del', name: '删除' }] }
  ],
  preferentialEdit: [
    { field: 'areaList', name: '地区(省市)', fixed: 'left', stype: 'fields', fieldList: ['province', 'city'], show: { type: 'cascader', obj: 'addressList', mulField: { province: 0, city: 1 }, isDisabled: true, props: { label: 'label', value: 'label', multiple: true } }, search: { type: 'text', field: 'keyWord', placeholder: '请选择地区(省市)' } },
    { field: 'lngFromId', name: '', hide: true },
    { field: 'benefit', name: '优惠(元/吨)', show: { type: 'text' } }
  ],
  preferentialDel: [
    { field: 'lngFromId', name: '', hide: true, show: { type: 'hide' } },
    { field: 'info', name: '', lg: 24, xl: 24, show: { type: 'span', value: '确认要删除该记录！' } }
  ],
  estimate: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'nickName', fixed: 'left', search: { type: 'text', field: 'keyWord', placeholder: '请输入加气站' } },
    { field: 'address', name: '加气站地址', ispush: false },
    { field: 'lngFromId', name: '', hide: true },
    { field: 'freight', name: '配置运费(元/吨)', nameSpan: 10, show: { type: 'text' }, rules: [{ required: true, message: '请输入配置运费', trigger: 'blur' }] },
    { field: 'calFreight', name: '计算运费(元/吨)', ispush: false },
    { field: 'mileage', name: '距液源地里程(公里)', ispush: false },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', width: 140, fixed: 'right', list: [{ type: 'config', name: '配置' }, { type: 'list', name: '变更记录' }] }
  ],
  estimateLog: [
    { field: 'operatorName', name: '操作人', fixed: 'left' },
    { field: 'operatorDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'nickName' },
    { field: 'freight', name: '配置运费(元/吨)' },
    { field: 'calFreight', name: '计算运费(元/吨)' },
    { field: 'mileage', name: '距液源地里程(公里)' }
  ],
  freight: [
    { field: 'beginRange', stype: 'fields', fieldList: ['beginRange', 'endRange'], sign: ' ≤ X < ', name: '里程区间(公里)', fixed: 'left' },
    { field: 'startPrice', name: '起步价(元/吨/公里)' },
    { field: 'rate', name: '变动费率(元/吨/公里)' }
  ],
  freightLog: [
    { field: 'operatorName', name: '操作人', fixed: 'left' },
    { field: 'operatorDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', list: [{ type: 'list', name: '查看' }] }
  ],
  mileage: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'nickName', fixed: 'left', search: { type: 'text', field: 'keyWord', placeholder: '请输入加气站名称' } },
    { field: 'address', name: '加气站地址' },
    { field: 'mileage', name: '距液源地里程(公里)', nameSpan: 7, show: { type: 'text' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: [{ type: 'edit', name: '配置' }, { type: 'list', name: '变更记录' }] }
  ],
  mileageLog: [
    { field: 'gasstationId', name: '加气站', stype: 'mapping', mapping: 'nickName', fixed: 'left' },
    { field: 'mileage', name: '距液源地里程(公里)' },
    { field: 'operatorName', name: '操作人' },
    { field: 'operatorDate', name: '操作时间', stype: 'format', formatFun: 'formateTData all', width: 140 }
  ],
  release: [
    { field: 'releaseTime', name: '结算价发布时间', fixed: 'left', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'applyName', name: '申请人', search: { type: 'text', field: 'keyWord', placeholder: '请输入申请人/操作人' } },
    { field: 'applyDate', name: '申请时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'status', name: '状态', formatter: 'status' },
    { field: 'auditName', name: '审核人' },
    { field: 'auditDate', name: '审核时间', stype: 'format', formatFun: 'formateTData all', width: 140 },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 130, align: 'left', list: (scope) => buttonPublishReleaseList(scope) }
  ],
  releaseLog: [
    { field: 'nickName', name: '加气站', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)' },
    { field: 'harbourPrice', name: '出港价(元/吨)' },
    { field: 'benefit', name: '区域优惠(元/吨)' },
    { field: 'freight', name: '运费(元/吨)' },
    { field: 'lngFromName', name: '液源地' }
  ],
  discountCarrier: [
    { field: 'carrierOrgName', name: '物流公司名称', fixed: 'left', search: { type: 'text', placeholder: '请输入物流公司名称' } },
    { field: 'num', name: '享受优惠加气站数量' },
    { field: 'status', name: '状态', formatter: 'rebateStatus' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: row => discountCarrierOpt(row) }
  ],
  rebateConfig: [
    { field: 'gasstationShortName', name: '享受优惠加气站', fixed: 'left', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'rebate', name: '享受优惠额度（元/公斤）' },
    { field: 'truckType', name: '车辆经营类型', formatter: 'truckType', show: { type: 'select', obj: 'truckType' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: [{ type: 'rebateEdit', name: '优惠编辑' }, { type: 'gasRebateClose', name: '优惠关闭' }] }
  ],
  rebateFillerAdd: [
    { field: 'rebate', name: '享受优惠额度（元/公斤）', nameSpan: 8, show: { type: 'text', placeholder: '请输入享受优惠额度' }, rules: [{ required: true, message: '请输入享受优惠额度', trigger: 'blur' }] },
    { field: 'truckType', name: '车辆经营类型', formatter: 'truckType', nameSpan: 8, show: { type: 'select', obj: 'truckType', placeholder: '请选择车辆经营类型' }, rules: [{ required: true, message: '请选择车辆经营类型', trigger: 'change' }] }
  ],
  rebateEdit: [
    { field: 'gasstationShortName', name: '享受优惠加气站', nameSpan: 8, show: { type: 'span', placeholder: '' }},
    { field: 'rebate', name: '享受优惠额度（元/公斤）', nameSpan: 8, show: { type: 'text', placeholder: '请输入享受优惠额度' }, rules: [{ required: true, message: '请输入享受优惠额度', trigger: 'blur' }] },
    { field: 'truckType', name: '享受优惠车辆经营类型', formatter: 'truckType', nameSpan: 8, show: { type: 'select', obj: 'truckType', placeholder: '请选择车辆经营类型' }, rules: [{ required: true, message: '请选择车辆经营类型', trigger: 'change' }] }
  ],
  rebateConfigRecords: [
    { field: 'updaterName', name: '操作人', fixed: 'left', search: { type: 'text', placeholder: '请输入操作人', serial: 1 } },
    { field: 'updateDate', name: '发布时间', stype: 'format', formatFun: 'formateTData all', search: { type: 'date-picker', placeholder: { start: '发布开始时间', end: '发布结束时间' }, serial: 5 } },
    { field: 'configType', name: '优惠配置', formatter: 'configType', search: { type: 'select', obj: 'configType', placeholder: '请选择配置类型', serial: 2 } },
    { field: 'carrierOrgName', name: '物流公司', search: { type: 'text', placeholder: '请输入物流公司', serial: 3 } },
    { field: 'gasstationShortName', name: '加气站', search: { type: 'text', placeholder: '请输入加气站', serial: 4 } },
    { field: 'oldRebate', name: '发布前享受优惠额度（元/公斤）' },
    { field: 'newRebate', name: '发布后享受优惠额度（元/公斤）' },
    { field: 'oldTruckType', name: '发布前享受优惠车辆类型', formatter: 'truckType' },
    { field: 'newTruckType', name: '发布后享受优惠车辆类型', formatter: 'truckType' }
  ],
  rebateOrder: [
    { field: 'orderId', name: '订单编号', fixed: 'left', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 13 } },
    { field: 'tradeType', name: '交易模式', formatter: 'tradeType', detail: { type: 'span', obj: 'tradeType', model: 'select', isDisabled: true, style: 'width: 85%' } },
    { field: 'createDate', name: '创建时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', findStyle: 'width: 55%;height: 50px;', style: 'width: 100%;', findField: 'createDate', dtime: ['00:00:00', '23:59:59'], value: (function() { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) }, currSearch: { type: 'select', subField: 'createDateName', hideName: true, obj: 'currDataSearch', style: 'width: 100%;', value: 'createDate' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 15, formatFun: 'formateTData all', stype: 'format' } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 16, formatFun: 'formateTData all', stype: 'format' } },
    { field: 'gasQty', name: '加气量', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 6, util: '公斤' } },
    { field: 'platformPrice', name: '平台挂牌价', hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 7, util: '元/公斤' } },
    { field: 'actualPrice', name: '平台结算价', hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 8, util: '元/公斤' } },
    { field: 'amount', name: '订单金额(元)', width: 90 },
    { field: 'carrierRebate', name: '物流公司专享优惠 ', width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 10, util: '元' } },
    { field: 'amountTotal', name: '订单总金额', width: 90, hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 9, util: '元', value: function(row) { return (Number(row.amount) + Number(row.discountAmount) + Number(row.carrierRebate)).toFixed(2) } } },
    { field: 'discountAmount', name: '优惠金额 ', hide: true, width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 10, util: '元' } },
    { field: 'amount', name: '小计金额 ', hide: true, width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 11, util: '元' } },
    { field: 'comAmount', name: '立减 ', hide: true, width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 11, util: '元' } },
    { field: 'orderRealTotal', name: '实付金额 ', hide: true, width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 11, util: '元' } },
    { field: 'carrierOrgName', name: '物流公司', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 1 } },
    { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入', findStyle: 'width: 45%', style: 'width: 100%;', findField: 'carNumber' }, currSearch: { type: 'select', subField: 'currFieldName', style: 'width: 100%;', hideName: true, obj: 'currFieldSearch', value: 'carNumber' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2 } },
    { field: 'driverName', name: '司机姓名', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 4 } },
    { field: 'gasstationName', name: '加气站', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 3 } },
    { field: 'cashierName', name: '收银员姓名', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 5 } },
    { field: 'orderStatus', name: '订单状态', width: 70, formatter: 'orderStatus', search: { type: 'select', obj: 'orderStatus', placeholder: '订单状态' }, detail: { type: 'span', model: 'select', isDisabled: true, obj: 'orderStatus', style: 'width: 85%', serial: 14 } },
    { field: 'tradeType', name: '交易模式', hide: true, search: { type: 'select', obj: 'tradeType', placeholder: '交易模式' } },
    { field: 'payType', name: '支付方式', width: 90, formatter: 'payType',
      search: { type: 'select', obj: 'payType', placeholder: '支付方式', value: '' },
      detail: { type: 'span', model: 'select', isDisabled: true, obj: 'payType', style: 'width: 85%', serial: 12,
        cascaderList: [
          { value: 0, fields: ['comAmount', 'orderRealTotal'] },
          { value: 1, fields: ['comAmount', 'orderRealTotal'] },
          { value: 2, fields: ['comAmount', 'orderRealTotal'] }
        ] } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 80, list: [{ type: 'detail', name: '详情' }] }
  ]
}

export default columns
