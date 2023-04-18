import { tableTextColor, tableTextColorSaleRate, toolPickerOptions } from '@/utils/tools'
import file from '../../modules/file'

const columns = {
  daySales: [
    { field: 'name', name: '名称', fixed: 'left', stype: 'format',
      formatFun: function(value, row) {
        if (!value) return '"暂无数据"'
        if (row.districtId || row.gasstationNum > 0) {
          return '"' + value + '(' + row.gasstationNum + ' 站)"'
        } else {
          return '"' + value + '"'
        }
      } },
    { field: 'todayGasQtyTotal', name: '今日(公斤)' },
    { field: 'yesterdayGasQtyTotal', name: '昨日同时(公斤)' },
    { field: 'gasGap', name: '较 昨日同时差量(公斤)', stype: 'text-style', classValueName: (row, field) => tableTextColor(row, field) },
    { field: 'rate', name: '较 昨日同时环比', stype: 'text-style', classValueName: (row, field) => tableTextColor(row, field) },
    { field: 'weekAverageGasQty', name: '前7日均(公斤)' },
    { field: 'monthAverageGasQty', name: '前30日均(公斤)' }
  ],
  historyTimeSales: [
    { field: 'name', name: '名称', fixed: 'left', stype: 'format',
      formatFun: function(value, row) {
        if (!value) return '"-"'
        if (row.districtId || row.gasstationNum > 0) {
          return '"' + value + '(' + row.gasstationNum + ' 站)"'
        } else {
          return '"' + value + '"'
        }
      } },
    { field: 'queryDateTime', name: '', hide: true, search: { type: 'date-picker', dtime: ['00:00:00', '23:59:59'], timeOptions: toolPickerOptions(), rangeNumber: 7, dataType: 'rangeType' } },
    { field: 'gasQtyTotal', name: '加气量(公斤)' }
  ],
  historySales: [
    { field: 'nickName', name: '加气站(自营)', fixed: 'left' },
    { field: 'date', name: '', hide: true, search: {  type: 'date-picker', dtime: ['08:00:00', '08:00:00'], format: 'yyyy-MM-dd 08:00:00', valueFormat: 'yyyy-MM-dd 08:00:00', value: (function() { return [new Date((new Date(new Date().toDateString() + ' 08:00:00')).getTime()-86400000), new Date(new Date().toDateString() + ' 08:00:00')] })() } },
    { field: 'inQtyTotal', name: '入库量(吨)' },
    { field: 'gasQtyTotal', name: '销售量(吨)' },
    { field: 'dayAvgPrice', name: '日均零售价(元/吨)' },
    { field: 'amountTotal', name: '销售金额(元)' },
    { field: 'compareRate', name: '较前一日销量比', stype: 'text-style', classValueName: (row, field) => tableTextColorSaleRate(row, field) },
  ],
  modifyList: [
    { field: 'gasstationName', name: '数据时段', fixed: 'left' },
    { field: 'date', name: '', hide: true, search: {  type: 'date-picker', dtime: ['08:00:00', '08:00:00'], format: 'yyyy-MM-dd 08:00:00', valueFormat: 'yyyy-MM-dd 08:00:00', value: (function() { return [new Date((new Date(new Date().toDateString() + ' 08:00:00')).getTime()-86400000), new Date(new Date().toDateString() + ' 08:00:00')] })() } },
    { field: 'inQtyTotal', name: '审核状态' },
    { field: 'inQtyTotal', name: '发起人' },
    { field: 'inQtyTotal', name: '发起时间' },
    { field: 'inQtyTotal', name: '审核人' },
    { field: 'inQtyTotal', name: '审核时间' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 210, list: [{ type: 'details', name: '详情' },{ type: 'check', name: '审核' }] }
  ],
  battle: [
    { field: 'gasType', name: '站点类型',
      show: { type: 'select', ou: 1, obj: 'gasstationType', style: 'width: 85%', placeholder: '请选择站点类型' },
      update: { type: 'select', ou: 1, obj: 'gasstationType', style: 'width: 85%', placeholder: '请选择站点类型' },
      info: { type: 'span', model: 'select', ou: 1, obj: 'gasstationType', style: 'width: 85%', placeholder: '请选择站点类型' },
      dxinfo: { type: 'span', model: 'select', nameSpan: 6, ou: 1, obj: 'gasstationType', style: 'width: 85%', placeholder: '请选择站点类型' },
      rules: [{ required: true, message: '请选择站点类型', trigger: 'change' }] },
    { field: 'nickName', name: '站点名称',
      show: { type: 'text', ou: 1, style: 'width: 85%', placeholder: '请输入站点名称' },
      update: { type: 'text', ou: 1, style: 'width: 85%', placeholder: '请输入站点名称' },
      info: { type: 'span', ou: 1, style: 'width: 85%', placeholder: '请输入站点名称' },
      dxinfo: { type: 'span', nameSpan: 6, ou: 1, style: 'width: 85%', placeholder: '请输入站点名称' },
      rules: [{ required: true, message: '请输入站点名称', trigger: 'blur' }] },
    { field: 'isImportant', name: '重点竞对',
      show: { type: 'radio', ou: 1, obj: 'isImportant', placeholder: '', value: '2' },
      update: { type: 'radio', ou: 1, obj: 'isImportant', placeholder: '' },
      // info: { type: 'span', ou: 1, model: 'select', obj: 'isImportant', placeholder: '', style: 'width: 85%' },
      // dxinfo: { type: 'span', model: 'select', obj: 'isImportant', nameSpan: 6, ou: 1, placeholder: '', style: 'width: 85%' },
      rules: [{ required: true, message: '请选择重点竞对', trigger: 'blur' }] },
    { field: 'city', name: '行政区域',
      show: { type: 'select', ou: 1, obj: 'districtList', style: 'width: 85%', placeholder: '请选择行政区域' },
      update: { type: 'select', ou: 1, obj: 'districtList', style: 'width: 85%', placeholder: '请选择行政区域' },
      info: { type: 'span', style: 'width: 85%', placeholder: '请选择行政区域' },
      dxinfo: { type: 'span', nameSpan: 6, style: 'width: 85%', placeholder: '请选择行政区域' },
      rules: [{ required: true, message: '请选择行政区域', trigger: 'change' }] },
    { field: 'pointAddress', name: '经纬度', colspan: 12, mapKey: 'address',
      show: { type: 'map', ou: 2, positionUrl: require('../../../assets/images/battle/position.png'), mapStyle: { width: '900px' }, mapHeight: '400px', mulField: { longitude: 0, latitude: 1 }, iType: 'string', sign: ',', style: 'width: 85.2%', placeholder: '经纬度' },
      update: { type: 'map', ou: 2, positionUrl: require('../../../assets/images/battle/position.png'), mapStyle: { width: '900px' }, mapHeight: '400px', mulField: { longitude: 0, latitude: 1 }, iType: 'string', sign: ',', style: 'width: 85.2%', placeholder: '经纬度' },
      info: { type: 'span', ou: 2, style: 'width: 85.2%', placeholder: '经纬度' },
      dxinfo: { type: 'span', nameSpan: 6, ou: 2, style: 'width: 85.2%', placeholder: '经纬度' },
      rules: [{ required: true, message: '请选择经纬度', trigger: 'change' }] },
    { field: 'address', name: '详细地址',
      show: { type: 'text', ou: 1, style: 'width: 85%', placeholder: '请输入详细地址' },
      update: { type: 'text', ou: 1, style: 'width: 85%', placeholder: '请输入详细地址' },
      info: { type: 'span', ou: 1, style: 'width: 85%', placeholder: '请输入详细地址' },
      dxinfo: { type: 'span', nameSpan: 6, ou: 1, style: 'width: 85%', placeholder: '请输入详细地址' },
    },
    { field: 'gasQtyTotal', name: '日加气总量', hide: true, ispush: false, colspan: 12, nameSpan: 6,
      dxinfo: { type: 'span', nameSpan: 6, ou: 1, style: 'width: 85.2%', placeholder: '请输入日加气总量', util: '吨' } },
    { field: 'gasQty', name: '平台日加气量', hide: true, ispush: false,
      dxinfo: { type: 'span', nameSpan: 6, ou: 1, style: 'width: 85%', placeholder: '请输入平台日加气量', util: '吨' } },
    { field: 'offlineGasQty', name: '日加气量',
      show: { type: 'text', ou: 1, style: 'width: 85%', rule: false, placeholder: '请输入日加气量', util: '吨', rules: [{ validator: 'validateInputValueNumber', message: '日加气量大于零，或者小数点后保留2位的数', option: { min: 0, space: 2 }, trigger: 'blur' }, { validator: 'validateMoneyNumber', message: '请输入大于零，或者小数点后保留2位的数', trigger: 'blur' }] },
      info: { type: 'text', ou: 1, style: 'width: 85%', placeholder: '请输入日加气量', util: '吨' },
      dxinfo: { type: 'text', name: '线下日加气量', nameSpan: 6, ou: 1, style: 'width: 85%', placeholder: '请输入线下日加气量', util: '吨' },
      rules: [{ required: true, message: '请输入日加气量', trigger: 'blur' }, { validator: 'validateInputValueNumber', message: '日加气量大于零，或者小数点后保留2位的数', option: { min: 0, space: 2 }, trigger: 'blur' }] },
    { field: 'price', name: '平台结算价', hide: true, ispush: false,
      dxinfo: { type: 'span', nameSpan: 6, ou: 1, style: 'width: 85%', placeholder: '请输入平台结算价', util: '元/公斤' } },
    { field: 'offlinePrice', name: '结算价',
      show: { type: 'text', ou: 1, style: 'width: 85%', rule: false, placeholder: '请输入结算价', util: '元/公斤', rules: [{ validator: 'validateInputValueNumber', message: '结算价大于零，或者小数点后保留2位的数', option: { min: 0, space: 2 }, trigger: 'blur' }, { validator: 'validateMoneyNumber', message: '请输入大于零，或者小数点后保留2位的数', trigger: 'blur' }] },
      info: { type: 'text', ou: 1, style: 'width: 85%', placeholder: '请输入结算价', util: '元/公斤' },
      dxinfo: { type: 'text', name: '线下结算价', nameSpan: 6, ou: 1, style: 'width: 85%', placeholder: '请输入线下结算价', util: '元/公斤' },
      rules: [{ required: true, message: '请选择结算价', trigger: 'blur' }, { validator: 'validateInputValueNumber', message: '结算价大于零，或者小数点后保留2位的数', option: { min: 0, space: 2 }, trigger: 'blur' }] },
    { field: 'credentials', name: '情报凭证', filefield: 'file',
      show: { type: 'file', ou: 4, iType: 'string', limit: 9, btnType: true, paramField: 'url', action: file.state.fileUrl,
        props: { url: 'data', name: 'data' },
        params: { url: 'data', name: 'data' },
        headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders),
        success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;',
        fileHost: file.state.fileHost, placeholder: '请上传情报凭证', node: [] },
      info: { type: 'file', ou: 4, iType: 'string', limit: 9, btnType: true, paramField: 'url', action: file.state.fileUrl,
        props: { url: 'data', name: 'data' },
        params: { url: 'data', name: 'data' },
        headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders),
        success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;',
        fileHost: file.state.fileHost, placeholder: '请上传情报凭证', node: [] },
      dxinfo: { type: 'file', nameSpan: 6, ou: 4, iType: 'string', limit: 9, btnType: true, paramField: 'url', action: file.state.fileUrl,
        props: { url: 'data', name: 'data' },
        params: { url: 'data', name: 'data' },
        headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders),
        success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;',
        fileHost: file.state.fileHost, placeholder: '请上传情报凭证', node: [] } }
  ],
  battleList: [
    { field: 'createTime', name: '时间', fixed: 'left' },
    { field: 'nickName', name: '站点名称', search: { type: 'text', placeholder: '请输入站点名称' } },
    { field: 'gasType', name: '站点类型', formatter: 'gasstationType' },
    { field: 'offlineGasQty', name: '线下日加气量(吨)' },
    { field: 'offlinePrice', name: '线下结算价(元/公斤)' },
    { field: 'createName', name: '操作人' },
    { field: 'mobile', name: '电话号码' },
    { field: 'credentials', name: '凭证信息' }
  ],
  battleGasList: [
    { field: 'createTime', name: '时间', fixed: 'left' },
    { field: 'nickName', name: '站点名称', search: { type: 'text', placeholder: '请输入站点名称' } },
    { field: 'gasType', name: '站点类型', formatter: 'gasstationType' },
    { field: 'isImportant', name: '重点竞对', formatter: 'isImportant' },
    { field: 'operateType', name: '操作类型', formatter: 'operateType' },
    { field: 'city', name: '行政区域' },
    { field: 'address', name: '详细地址' },
    { field: 'longitude', name: '经纬度', stype: 'fields', fieldList: ['longitude', 'latitude'], sign: ',' },
    { field: 'createName', name: '操作人' },
    { field: 'mobile', name: '电话号码' }
  ],
  battleItem: [
    { field: 'createTime', name: '时间', fixed: 'left' },
    { field: 'nickName', name: '站点名称' },
    { field: 'gasType', name: '站点类型', formatter: 'gasstationType' },
    { field: 'offlineGasQty', name: '线下日加气量(吨)' },
    { field: 'offlinePrice', name: '线下结算价(元/公斤)' },
    { field: 'createName', name: '操作人' },
    { field: 'mobile', name: '电话号码' },
    { field: 'credentials', name: '凭证信息' }
  ],
  battleGasItem: [
    { field: 'createTime', name: '时间', fixed: 'left' },
    { field: 'nickName', name: '站点名称' },
    { field: 'gasType', name: '站点类型', formatter: 'gasstationType' },
    { field: 'isImportant', name: '重点竞对', formatter: 'isImportant' },
    { field: 'operateType', name: '操作类型', formatter: 'operateType' },
    { field: 'city', name: '行政区域' },
    { field: 'address', name: '详细地址' },
    { field: 'longitude', name: '经纬度', stype: 'fields', fieldList: ['longitude', 'latitude'], sign: ',' },
    { field: 'createName', name: '操作人' },
    { field: 'mobile', name: '电话号码' }
  ],
  batchEdit: [
    { field: 'districtId', hide: true, search: { type: 'select', obj: 'districtAreaList', placeholder: '业务区域' } },
    { field: 'districtName', name: '业务区域', fixed: 'left' },
    { field: 'nickName', name: '站点名称' },
    { field: 'gasType', name: '站点类型', formatter: 'gasstationType', search: { type: 'select', obj: 'gasstationType', placeholder: '站点类型' } },
    { field: 'isImportant', name: '重点竞对', formatter: 'isImportantAll' },
    { field: 'infoType', name: '情报类型', formatter: 'infoType' },
    { field: 'isImportant', hide: true, search: { type: 'select', obj: 'isImportant', placeholder: '是否重点竞对' } },
    { field: 'offlineGasQty', name: '日加气量(吨)', stype: 'input', inputShow: true, actionBak: { url: 'gasdata/gasstation/update/info', isConfirm: false, message: '是否保存？', params: { gasstationId: 'gasstationId', offlineGasQty: 'offlineGasQty', offlinePrice: 'offlinePrice' } },
      table: { type: 'text', nameSpan: 0, inputSpan: 24, style: 'width: 100%;', clearable: false }, iShowStatus: item => iShowStatus(item) },
    { field: 'offlinePrice', name: '结算价(元/公斤)', stype: 'input', inputShow: true, actionBak: { url: 'gasdata/gasstation/update/info', isConfirm: false, message: '是否保存？', params: { gasstationId: 'gasstationId', offlineGasQty: 'offlineGasQty', offlinePrice: 'offlinePrice' } },
      table: { type: 'text', nameSpan: 0, inputSpan: 24, style: 'width: 100%;', clearable: false }, iShowStatus: item => iShowStatus(item) }
  ]
}

const iShowStatus = (item) => {
  // infoType 情报类型 0大象平台情报 1大象线下情报 2非大象情报
  // editInfo 是否允许编辑站点情报 0允许 1不允许
  if (item.infoType !== 0 && item.editInfo === 0) {
    return true
  } else {
    return false
  }
}

export default columns
