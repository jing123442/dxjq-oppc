import file from '@/store/modules/file'
import { formateTData } from '@/utils/tools'

const columns = {
  analysis: [
    { field: 'id', name: 'ID', hide: true, show: { type: 'hide'} },
    { field: 'title', name: '标题', fixed: 'left', show: { type: 'text', placeholder: '请输入标题'} },
    { field: 'fileUrl', name: 'URL', filefield: 'file',
      show: {
        type: 'file', serial: 3, iType: 'string', btnType: true, paramField: 'url',
        props: { url: 'data', name: 'data' },
        params: { url: 'data', name: 'data' },
        action: file.state.fileUrl,
        headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders),
        success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;',
        fileHost: file.state.fileHost, placeholder: '请上传情报分析图', node: [],
      },
      rules: [{ required: true, message: '请上传情报分析图！', trigger: 'change' }]
    },
    { field: 'createrName', name: '操作人' },
    { field: 'createDate', name: '创建时间' },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 100, list: [{ type: 'edit', name: '编辑' }] }
  ],
  information: [
    { field: 'id', name: 'ID', hide: true, show: { type: 'hide'} },
    { field: 'title', name: '标题', fixed: 'left',
      show: { type: 'text', placeholder: '请输入标题' },
      search: { type: 'text', placeholder: '请输入标题' }
    },
    { field: 'comment', name: '内容', xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 2, hide: true,
      show: { type: 'ueditor', serial: 2, style: 'width: 98%', placeholder: '请输入内容', config: file.state.fileUEditorConfig },
      detail: { type: 'span', serial: 2, model: 'html', style: 'width: 97%;overflow: hidden;display: block;' },
      rules: [{ required: true, message: '请输入内容！', trigger: 'blur' }]
    },
    { field: 'viewCounts', name: '预览次数' },
    { field: 'createrName', name: '操作人' },
    { field: 'createDate', name: '创建时间', stype: 'format', formatFun: 'formateTData all', },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 100, list: [{ type: 'edit', name: '编辑' }] }
  ],
  factory: [
    { field: 'province', name: '省份', fixed: 'left', search: { type: 'text', placeholder: '请输入省份' } },
    { field: 'factoryName', name: '液厂简称' },
    { field: 'gasifyRate', name: '气化率' },
    { field: 'gasType', name: '气质类型' },
    { field: 'price', name: '日报价(元/吨)' },
    { field: 'priceIncrease', name: '涨跌(元/吨)' },
    { field: 'productCapacity', name: '年接收量(万吨)' },
    { field: 'infoDate', name: '日期', stype: 'format', formatFun: 'formateTData date', ispush: false,
      search: { type: 'date-picker', model: 'date', placeholder: '请选择', clearable: false, value: (new Date()) }
    },
  ],
  listing: [
    { field: 'province', name: '省份', fixed: 'left', search: { type: 'text', placeholder: '请输入省份' } },
    { field: 'stationName', name: '接收站' },
    { field: 'slotBatch', name: '槽批量（车）' },
    { field: 'loadingPrice', name: '装车价' },
    { field: 'listPrice', name: '挂牌价(元/吨)' },
    { field: 'listPriceIncrease', name: '涨跌(元/吨)' },
    { field: 'yearQuantity', name: '年接收量(万吨)' },
    { field: 'infoDate', name: '日期', stype: 'format', formatFun: 'formateTData date', ispush: false,
      search: { type: 'date-picker', model: 'date', placeholder: '请选择', clearable: false, value: (function() { return formateTData(new Date(), 'date') }()) }
    },
  ],
  receiv: [
    { field: 'areas', name: '地区', fixed: 'left', search: { type: 'text', placeholder: '请输入地区' } },
    { field: 'stationName', name: '接收站' },
    { field: 'listPrice', name: '日报价(元/吨)' },
    { field: 'listPriceIncrease', name: '涨跌(元/吨)' },
    { field: 'infoDate', name: '日期', stype: 'format', formatFun: 'formateTData date', ispush: false,
      search: { type: 'date-picker', model: 'date', placeholder: '请选择', clearable: false, value: (function() { return formateTData(new Date(), 'date') }()) }
    },
  ],
  haiqi: [
    { field: 'country', name: '国家', fixed: 'left' },
    { field: 'listPrice', name: '日报价（美元/百万英热）' },
    { field: 'listPriceIncrease', name: '涨跌(美元/百万英热)' },
    { field: 'infoDate', name: '日期', stype: 'format', formatFun: 'formateTData date', ispush: false,
      search: { type: 'date-picker', model: 'date', placeholder: '请选择', clearable: false, value: (function() { return formateTData(new Date(), 'date') }()) }
    },
  ],
  gasstion: [
    { field: 'nickName', name: '加气站名称', fixed: 'left' },
    { field: 'address', name: '加气站地址' },
    { field: 'listPrice', name: '平台挂牌价(元/KG)' },
    { field: 'listPriceIncrease', name: '涨跌(元/KG)' },
    { field: 'infoDate', name: '日期', stype: 'format', formatFun: 'formateTData date', ispush: false,
      search: { type: 'date-picker', model: 'date', placeholder: '请选择', clearable: false, value: (function() { return formateTData(new Date(), 'date') }()) }
    },
  ],
  diesel: [
    { field: 'area', name: '地区', fixed: 'left' },
    { field: 'zeroPrice', name: '价格(元/KG)' },
    { field: 'infoDate', name: '日期', stype: 'format', formatFun: 'formateTData date', ispush: false,
      search: { type: 'date-picker', model: 'date', placeholder: '请选择', clearable: false, value: (function() { return formateTData(new Date(), 'date') }()) }
    },
  ]
}

export default columns
