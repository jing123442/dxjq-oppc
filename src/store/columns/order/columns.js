import { monthTimeArea, formatPeriodDate, dataPickerDefault, toolPickerOptions } from '@/utils/tools'

const columns = {
  order: [
    { field: 'orderId', name: '订单编号', fixed: 'left', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 1, ou: 1} },
    { field: 'createDate', name: '创建时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', findStyle: 'width: 51%;height: 50px;', style: 'width: 100%;', findField: 'createDate', dtime: ['00:00:00', '23:59:59'], value: (function () { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) }, currSearch: { type: 'select', subField: 'createDateName', hideName: true, obj: 'currDataSearch', style: 'width: 100%;', value: 'createDate' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2, formatFun: 'formateTData all', stype: 'format', ou: 1 } },
    // { field: 'createDate', name: '创建时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', findStyle: 'width: 30%;height: 50px;', style: 'width: 100%;', findField: 'createDate', dtime: ['00:00:00', '23:59:59'], value: (function() { const dateObj = monthTimeArea(new Date()); return ['2021-10-19', dateObj.end] }()) }, currSearch: { type: 'select', subField: 'createDateName', hideName: true, obj: 'currDataSearch', style: 'width: 100%;', value: 'createDate' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2, formatFun: 'formateTData all', stype: 'format', ou: 1 } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 21, formatFun: 'formateTData all', stype: 'format' , ou: 5} },
    { field: 'actualPrice', name: '结算价(元/公斤)', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 14, util: '元', ou: 3, name: '结算价' } },
    { field: 'gasQty', name: '加气量(公斤)', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 10, util: '公斤', ou: 3, name: '加气量' } },
    { field: 'platformPrice', name: '平台挂牌价', hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 8, util: '元/公斤' } },
    { field: 'actualPrice', name: '平台结算价', hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 9, util: '元/公斤' } },
    { field: 'amount', name: '结算金额(元)', width: 90, detail: { type: 'span', style: 'width: 85%', serial: 12, util: '元', ou: 3, name: '结算金额'} },
    { field: 'amountTotal', name: '订单总金额', width: 90, hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 11, util: '元', value: function(row) { return (Number(row.amount) + Number(row.discountAmount) + Number(row.carrierRebate)).toFixed(2) }, ou: 3 } },
    { field: 'carrierRebate', name: '优惠金额 ', hide: true, width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 13, util: '元', ou: 3 } },
    { field: 'gasPrice', name: '长城奥扬差价 ', hide: true, width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2, util: '元/公斤', ou: 6 } },
    { field: 'comAmount', name: '立减 ', hide: true, width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 13, util: '元' } },
    { field: 'orderRealTotal', name: '实付金额 ', hide: true, width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 11, util: '元' } },
    { field: 'carrierOrgName', name: '物流客户', search: { type: 'text', field: 'carrierOrgName', placeholder: '请输入物流公司', findStyle: 'width: 19%', }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 7, ou: 2 } },
    { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入', findStyle: 'width: 30%', style: 'width: 100%;', findField: 'carNumber' }, currSearch: { type: 'select', subField: 'currFieldName', style: 'width: 100%;', hideName: true, obj: 'currFieldSearch', value: 'carNumber' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 9, ou: 2 } },
    { field: 'driverName', name: '驾驶员姓名', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 8, ou: 2 } },
    { field: 'gasstationName', name: '加气站', search: { type: 'text', field: 'gasstationName', placeholder: '请输入加气站' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 5, ou: 1 } },
    { field: 'cashierName', name: '收银员姓名', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 6, ou: 1 } },

    { field: 'platformPrice', name: '加气站售卖价 ', hide: true, width: 90, 
    detail: { type: 'span', isDisabled: true,  style: 'width: 85%', serial: 1, util: '元', ou: 6,}
     },
     
    { field: 'marketType', name: '经营模式',  formatter: 'marketType', 
    search: { type: 'select', obj: 'marketType', placeholder: '经营模式' },
     detail: { type: 'span', isDisabled: true, style: 'width: 85%', model: 'select', obj: 'marketType', serial: 3, ou: 1 ,
      cascaderList:[{value:1,fields:['platformPrice','gasPrice']}] ,
    } },

    { field: 'priceType', name: '标准定价策略', formatter: 'priceType', search: { type: 'select', obj: 'priceType', placeholder: '标准定价策略' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', model: 'select', obj: 'priceType', serial: 3, ou: 1 } },
    { field: 'tradeType', name: '交易模式', formatter: 'tradeType', search: { type: 'select', obj: 'tradeType', placeholder: '交易模式' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', model: 'select', obj: 'tradeType', serial: 4, ou: 1 } },
    { field: 'platformPrice', hide: true, name: '总利润单价', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 15, util: '元/公斤', ou: 4 } },
    { field: 'freight', hide: true, name: '运费单价', hide: true, detail: { type: 'span', style: 'width: 85%', serial: 16, util: '元/公斤', ou: 4 } },
    { field: 'harbourPrice', hide: true, name: '出港价', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 17, util: '元/公斤', ou: 4 } },
    { field: 'benefit', hide: true, name: '优惠单价', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 18, util: '元/公斤', ou: 4} },
    { field: 'orderStatus', name: '订单状态', width: 70, formatter: 'orderStatus', search: { type: 'select', obj: 'orderStatus', placeholder: '订单状态' }, detail: { type: 'span', model: 'select', isDisabled: true, obj: 'orderStatus', style: 'width: 85%', serial: 19, ou: 5 } },
    { field: 'payType', name: '支付方式', width: 90, formatter: 'payType',
      search: { type: 'select', obj: 'payType', placeholder: '支付方式', value: '' },
      detail: { type: 'span', model: 'select', isDisabled: true, obj: 'payType', style: 'width: 85%', serial: 20, ou: 5,
        cascaderList: [
          { value: 0, fields: ['comAmount', 'orderRealTotal'] },
          { value: 1, fields: ['comAmount', 'orderRealTotal'] },
          { value: 2, fields: ['comAmount', 'orderRealTotal'] }
        ] } },
    { field: 'useropts', stype: 'opt', ispush: true, name: '操作', fixed: 'right', width: 80, 
  
    list: [{ type: 'detail', name: '详情', }] }
  ],

  buyOrder: [
    { field: 'orderId', name: '订单编号', fixed: 'left',  detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 1, ou: 1} },
    { field: 'createDate', name: '创建时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', findStyle: 'width: 51%;height: 50px;', style: 'width: 100%;', findField: 'createDate', dtime: ['00:00:00', '23:59:59'], value: (function () { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) }, currSearch: { type: 'select', subField: 'createDateName', hideName: true, obj: 'currDataSearch', style: 'width: 100%;', value: 'createDate' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2, formatFun: 'formateTData all', stype: 'format', ou: 1 } },
    // { field: 'createDate', name: '创建时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', findStyle: 'width: 30%;height: 50px;', style: 'width: 100%;', findField: 'createDate', dtime: ['00:00:00', '23:59:59'], value: (function() { const dateObj = monthTimeArea(new Date()); return ['2021-10-19', dateObj.end] }()) }, currSearch: { type: 'select', subField: 'createDateName', hideName: true, obj: 'currDataSearch', style: 'width: 100%;', value: 'createDate' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2, formatFun: 'formateTData all', stype: 'format', ou: 1 } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 21, formatFun: 'formateTData all', stype: 'format' , ou: 5} },

    { field: 'gasprice', name: '采购价(元)', width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2, util: '元', ou: 6 } },
    { field: 'gasQty', name: '采购量(公斤)', width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2, util: '公斤', ou: 6 } },
    { field: 'gasamount', name: '采购金额(元)',width: 90, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2, util: '元', ou: 6 } },

    { field: 'gasstationName', name: '加气站', search: { type: 'text', field: 'gasstationName', placeholder: '请输入加气站' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 5, ou: 1 } },
    { field: 'cashierName', name: '收银员姓名', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 6, ou: 1 } },
    { field: 'carrierOrgName', name: '物流客户', search: { type: 'text', field: 'carrierOrgName', placeholder: '请输入物流公司', findStyle: 'width: 19%', }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 7, ou: 2 } },
    { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入', findStyle: 'width: 30%', style: 'width: 100%;', findField: 'carNumber' }, 
    currSearch: { type: 'select', subField: 'currFieldName', style: 'width: 100%;', hideName: true, obj: 'currFieldSearch', value: 'carNumber' }, 
    detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 9, ou: 2 } },
    { field: 'driverName', name: '驾驶员姓名', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 8, ou: 2 } },
    

    { field: 'marketType', name: '经营模式',  formatter: 'marketType', 

     detail: { type: 'span', isDisabled: true, style: 'width: 85%', model: 'select', obj: 'marketType', serial: 3, ou: 1 ,
      cascaderList:[{value:1,fields:['platformPrice','gasPrice']}] ,
    } },

    { field: 'priceType', name: '标准定价策略', formatter: 'priceType', detail: { type: 'span', isDisabled: true, style: 'width: 85%', model: 'select', obj: 'priceType', serial: 3, ou: 1 } },
    { field: 'tradeType', name: '交易模式', formatter: 'tradeType',  detail: { type: 'span', isDisabled: true, style: 'width: 85%', model: 'select', obj: 'tradeType', serial: 4, ou: 1 } },
    { field: 'orderStatus', name: '订单状态', width: 70, formatter: 'orderStatus', search: { type: 'select', obj: 'orderStatus', placeholder: '订单状态' }, 
    detail: { type: 'span', model: 'select', isDisabled: true, obj: 'orderStatus', style: 'width: 85%', serial: 19, ou: 5 } },
    { field: 'payType', name: '支付方式', width: 90, formatter: 'payType',
    detail: { type: 'span', model: 'select', isDisabled: true, obj: 'payType', style: 'width: 85%', serial: 20, ou: 5,
      cascaderList: [
        { value: 0, fields: ['comAmount', 'orderRealTotal'] },
        { value: 1, fields: ['comAmount', 'orderRealTotal'] },
        { value: 2, fields: ['comAmount', 'orderRealTotal'] }
      ] } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 80, list: [{ type: 'detail', name: '详情' },]}
  ],

  sinopecOrder: [
    { field: 'orderId', name: '订单编号', fixed: 'left', search: { type: 'text', field: 'orderId', placeholder: '请输入订单编号' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 1, ou: 1 } },
    { field: 'createDate', name: '创建时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', findStyle: 'width: 51%;height: 50px;', style: 'width: 100%;', findField: 'createDate', dtime: ['00:00:00', '23:59:59'], value: (function() { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()), serial: 2 }, show: { type: 'span', ou: 1 }, currSearch: { type: 'select', subField: 'createDateName', hideName: true, obj: 'currDataSearch', style: 'width: 100%;', value: 'createDate' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 1, formatFun: 'formateTData all', stype: 'format' } },
    // { field: 'createDate', name: '创建时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', findStyle: 'width: 51%;height: 50px;', style: 'width: 100%;', findField: 'createDate', dtime: ['00:00:00', '23:59:59'], value: (function() { const dateObj = monthTimeArea(new Date()); return ['', ''] }())}, currSearch: { type: 'select', subField: 'createDateName', hideName: true, obj: 'currDataSearch', style: 'width: 100%;', value: 'createDate' }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 2, formatFun: 'formateTData all', stype: 'format', ou: 1 } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 12, formatFun: 'formateTData all', stype: 'format' , ou: 4} },
    { field: 'actualPrice', name: '零售价(元/公斤)', detail: { type: 'span', style: 'width: 85%', serial: 6, util: '元/公斤', ou: 2, name: '零售价' } },
    { field: 'gasQty', name: '加气量(公斤)', detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 4, util: '公斤', ou: 2, name: '加气量' } },
    { field: 'amount', name: '订单金额(元)', width: 90, detail: { type: 'span', style: 'width: 85%', serial: 5, util: '元', ou: 2, name: '订单金额' } },
    { field: 'gasstationName', name: '加气站', search: { type: 'text', field: 'gasstationName', placeholder: '请输入加气站', serial: 3 }, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 3, ou: 1 }},
    { field: 'platformPrice', name: '总利润单价', hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 7, util: '元/公斤', ou: 3 } },
    { field: 'freight', name: '运费单价', hide: true, detail: { type: 'span', style: 'width: 85%', serial: 8, util: '元/公斤', ou: 3 } },
    { field: 'harbourPrice', name: '出港价', hide: true, detail: { type: 'span', isDisabled: true, style: 'width: 85%', serial: 9, util: '公斤/元', ou: 3} },
    // 状态、支付
    { field: 'orderStatus', name: '订单状态', width: 70, formatter: 'orderStatus', detail: { type: 'span', model: 'select', isDisabled: true, obj: 'orderStatus', style: 'width: 85%', serial: 10, ou: 4 } },
    { field: 'payType', name: '支付方式', width: 90, formatter: 'payType',
      detail: { type: 'span', model: 'select', isDisabled: true, obj: 'payType', style: 'width: 85%', serial: 11, ou: 4,
        cascaderList: [
          { value: 0, fields: ['comAmount', 'orderRealTotal'] },
          { value: 1, fields: ['comAmount', 'orderRealTotal'] },
          { value: 2, fields: ['comAmount', 'orderRealTotal'] }
        ] } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 80, list: [{ type: 'detail', name: '详情' }] }
  ],
  selfOrder: [
    { field: 'id', hide: true, show: { type: 'hide', noShow: 1 } },
    { field: 'gasstationId', hide: true, show: { type: 'hide', noShow: 1 } },
    { field: 'flag', hide: true, show: { type: 'hide', noShow: 1 } },
    { field: 'gasstationName', name: '加气站', fixed: 'left', search: { type: 'text', placeholder: '请输入', findStyle: 'width: 30%', style: 'width: 100%;', findField: 'gasstationName' }, currSearch: { type: 'select', subField: 'currFieldName', style: 'width: 100%;', hideName: true, obj: 'currFieldSearch', value: 'gasstationName' }, show: { type: 'text', placeholder: '请输入' } },
    { field: 'tradeNo', name: '流水号', show: { type: 'text', placeholder: '请输入', noShow: 1 } },
    { field: 'tradeDate', name: '交易时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', placeholder: '', findStyle: 'width: 55%;height: 50px;', style: 'width: 100%;', findField: 'tradeDate', dtime: ['00:00:00', '23:59:59'], value: (function () { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) }, currSearch: { type: 'select', subField: 'tradeDateName', hideName: true, obj: 'currDataSearch', style: 'width: 100%;', value: 'tradeDate', isDisabled: true }, show: { type: 'date-picker', model: 'datetime', placeholder: '请输入' } },
    { field: 'gunNo', name: '枪号', show: { type: 'text', placeholder: '请输入' } },
    { field: 'nowGas', name: '加气量(公斤)', show: { type: 'text', placeholder: '请输入' }, rules: [{ required: true, message: '请输入加气量', trigger: 'blur' }] },
    { field: 'nowMoney', name: '订单金额(元)', show: { type: 'text', placeholder: '请输入' }, rules: [{ required: true, message: '请输入订单金额', trigger: 'blur' }] },
    { field: 'price', name: '结算单价(元/公斤)', show: { type: 'text', placeholder: '请输入' }, rules: [{ required: true, message: '请输入结算单价', trigger: 'blur' }] },
    { field: 'carNo', name: '车牌号', show: { type: 'text', placeholder: '请输入' } },
    { field: 'cashier', name: '收银员', show: { type: 'text', placeholder: '请输入' } },
    // 操作列
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', width: 140, fixed: 'right', list: [{ type: 'del', name: '删除' }, { type: 'edit', name: '修改' }] }
  ],
  fillerOrder: [
    { field: 'gasstationName', name: '企业名称', fixed: 'left' },
    { field: 'tradeType', name: '交易模式', formatter: 'tradeType', search: { type: 'select', obj: 'tradeType', placeholder: '交易模式' } },
    { field: 'nickName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'period', name: '', hide: true, search: { type: 'date-picker', model: 'month', placeholder: '请选择账期', clearable: false, value: (function() { const dateObj = formatPeriodDate(); return (dateObj.periodYear + '-' + dateObj.periodMonth + '-' + '01 00:00:00') }()) } },
    { field: 'gasQtyTotal', name: '加气量' },
    { field: 'gasamountTotal', note: '长城奥扬收款总额', name: '加气站结算金额' },
    { field: 'amountTotal', note: '物流公司付款总额', name: '平台结算金额' },
    { field: 'initialProfitBalance', note: '期初可提现金额', name: '期初利润余额' },
    { field: 'profitTotal', note: '区间内加气站服务费总金额', name: '加气站利润金额' },
    { field: 'withdrawTotal', note: '区间内提现金额', name: '本期提现金额' },
    { field: 'endProfitBalance', note: '期末可提现金额', name: '期末利润余额' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: [{ type: 'settle_list', name: '结算明细' }, { type: 'withdraw_list', name: '提现明细' }, { type: 'stock_list', name: '入库明细' }, { type: 'download', name: '下载申请' }] }
  ],
  orderDay: [
    { field: 'orderId', name: '订单编号', fixed: 'left', search: { type: 'text', serial: 2, placeholder: '请输入内容', findField: 'orderId' }, currSearch: { type: 'select', hideName: true, obj: 'currDaySearch', value: 'orderId' } },
    { field: 'tradeType', name: '交易模式', formatter: 'tradeType', search: { type: 'select', obj: 'tradeType', placeholder: '交易模式' } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', model: 'daterange', dataType: 'rangeType', rangeNumber: 7, style: 'width: 350px;', format: 'yyyy-MM-dd', timeOptions: toolPickerOptions(1), value: (function() { const dateObj = dataPickerDefault(new Date(), 1, 'yyyy-MM-dd hh:mm:ss', 1); return [dateObj.start, dateObj.end] })() } },
    { field: 'gasstationName', name: '企业名称' },
    { field: 'nickName', name: '加气站名称' },
    { field: 'carrierOrgName', name: '物流公司' },
    { field: 'carNumber', name: '车牌号' },
    { field: 'gasQty', name: '加气量' },
    { field: 'gasamount', note: '长城奥扬收款金额', name: '加气站结算金额' },
    { field: 'amount', note: '物流公司付款金额', name: '平台结算金额' },
    { field: 'serviceFee', note: '加气站利润金额', name: '加气站利润金额' }
  ],
  fillerDetail: [
    { field: 'orderId', name: '订单编号', fixed: 'left' },
    { field: 'updateDate', name: '订单支付时间', note: '支付成功时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'carrierOrgName', name: '物流公司' },
    { field: 'carNumber', name: '车牌号' },
    { field: 'gasQty', name: '加气量' },
    { field: 'gasamount', note: '长城奥扬收款金额', name: '加气站结算金额' },
    { field: 'amount', note: '物流公司付款金额', name: '平台结算金额' },
    { field: 'serviceFee', note: '加气站服务费金额', name: '加气站利润金额' }
  ],
  fillerWithdraw: [
    { field: 'withdrawOrderId', name: '提现编号', fixed: 'left' },
    { field: 'createDate', name: '提现申请时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'updateDate', name: '提现到账时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'amount', name: '提现金额' }
  ],
  carrierOrder: [
    { field: 'carrierOrgName', name: '公司名称', fixed: 'left', search: { type: 'text', placeholder: '请输入公司名称' } },
    { field: 'tradeType', name: '交易模式', formatter: 'tradeType', search: { type: 'select', obj: 'tradeType', placeholder: '交易模式' } },
    { field: 'period', name: '', hide: true, search: { type: 'date-picker', model: 'month', placeholder: '请选择账期', clearable: false, value: (function() { const dateObj = formatPeriodDate(); return (dateObj.periodYear + '-' + dateObj.periodMonth + '-' + '01 00:00:00') }()) } },
    { field: 'rechargeTotal', name: '充值金额汇总(元)' },
    { field: 'gasQtyTotal', name: '加气量汇总(公斤)' },
    { field: 'amountTotal', name: '加气金额汇总(元)' },
    { field: 'discountTotal', name: '优惠金额汇总(元)' },
    { field: 'comAmountTotal', name: '立减金额汇总(元)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'recharge_list', name: '充值对账' }, { type: 'settle_order_list', name: '结算订单' }, { type: 'truck_list', name: '卡车汇总' }] }
  ],
  carrierToFiller: [
    { field: 'gasstationName', name: '企业名称', fixed: 'left' },
    { field: 'nickName', name: '加气站名称', search: { type: 'text', placeholder: '请输入加气站名称' } },
    { field: 'gasQtyTotal', name: '加气量' },
    { field: 'amountTotal', note: '物流公司付款金额', name: '平台结算金额' },
    { field: 'discountTotal', name: '优惠金额' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'list', name: '结算明细' }] }
  ],
  carrierToFillerDetail: [
    { field: 'orderId', name: '订单编号', fixed: 'left' },
    { field: 'updateDate', name: '支付时间' },
    { field: 'carNumber', name: '车牌号' },
    { field: 'driverName', name: '司机' },
    { field: 'gasQty', name: '加气量' },
    { field: 'actualPrice', note: '物流公司付款单价', name: '平台结算价' },
    { field: 'amount', note: '物流公司付款金额', name: '平台结算金额' },
    { field: 'discountAmount', name: '优惠金额' }
  ],
  carrierRecharge: [
    { field: 'amount', name: '充值金额(元)', fixed: 'left' },
    { field: 'updateDate', name: '充值时间', formatFun: 'formateTData all', stype: 'format' }
  ],
  carrierToTruck: [
    { field: 'carNumber', name: '车牌号', fixed: 'left', search: { type: 'text', placeholder: '请输入车牌号' } },
    { field: 'gasQtyTotal', name: '加气量汇总(公斤)' },
    { field: 'amountTotal', name: '加气金额汇总(元)' },
    { field: 'discountTotal', name: '优惠金额汇总(元)' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'bill', name: '卡车订单明细' }] }
  ],
  carrierToTruckOrder: [
    { field: 'orderId', name: '订单编号', fixed: 'left', search: { type: 'text', placeholder: '请输入订单编号' } },
    { field: 'driverName', name: '司机', search: { type: 'text', placeholder: '请输入司机名称' } },
    { field: 'gasQty', name: '加气量(公斤)' },
    { field: 'platformPrice', name: '平台挂牌价(元/公斤)' },
    { field: 'actualPrice', name: '平台结算价(元/公斤)' },
    { field: 'amount', name: '金额(元)' },
    { field: 'gasstationName', name: '加气站', search: { type: 'text', placeholder: '请输入加气站' } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format' }
  ],
  bussinessOrder: [
    { field: 'orderId', name: '订单编号', fixed: 'left' },
    { field: 'period', name: '', hide: true, search: { type: 'date-picker', model: 'month', placeholder: '请选择账期', clearable: false, value: (function() { const dateObj = formatPeriodDate(); return (dateObj.periodYear + '-' + dateObj.periodMonth + '-' + '01 00:00:00') }()) } },
    { field: 'updateDate', name: '支付时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'gasstationName', name: '企业名称' },
    { field: 'nickName', name: '加气站' },
    { field: 'carrierOrgName', name: '物流公司' },
    { field: 'carNumber', name: '车牌号' },
    { field: 'gasQty', name: '加气量' },
    { field: 'gwayprice', name: '单位利润额(元/公斤)', formatFun: 'formatGwayPrice', stype: 'format' },
    { field: 'gwayamount', note: '平台服务费金额', name: '服务费金额' }
  ],
  downloadOrder: [
    { field: 'type', stype: 'mapping', mapping: 'typeName', name: '文件类型', width: 160, fixed: 'left', search: { type: 'select', serial: 2, obj: 'type', placeholder: '文件类型' } },
    { field: 'fileName', name: '导出文件编号' },
    { field: 'status', name: '文件状态', formatter: 'status', width: 90, search: { type: 'select', serial: 3, obj: 'status', placeholder: '文件状态' } },
    { field: 'createDate', name: '申请时间', formatFun: 'formateTData all', width: 140, stype: 'format', search: { type: 'date-picker', serial: 1, placeholder: '', style: 'width: 350px;', findField: 'createDate', value: (function() { const dateObj = monthTimeArea(new Date()); return [dateObj.start, dateObj.end] }()) } },
    { field: 'genDate', name: '文件生成时间', formatFun: 'formateTData all', width: 140, stype: 'format' },
    { field: 'note', name: '描述' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: params => { return params.row.status == 2 && [{ type: 'download', name: '下载' }] } }
  ],
  stockDetail: [
    { field: 'id', name: 'LNG计划编号', fixed: 'left', nameSpan: 6 },
    { field: 'completeTime', name: '入库时间', formatFun: 'formateTData all', stype: 'format' },
    { field: 'carNumber', name: '车牌号' },
    { field: 'lngFromName', name: '气源' },
    { field: 'storeWeight', name: '入库重量(公斤)' },
    { field: 'gasstationName', name: '企业名称' },
    { field: 'nickName', name: '加气站名称' }
  ]
}

export default columns
