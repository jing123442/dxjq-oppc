import { tableTextColor, toolPickerOptions } from '@/utils/tools'
/* eslint-disable */
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
  historySales: [
    { field: 'name', name: '名称', fixed: 'left', stype: 'format',
      formatFun: function(value, row) {
        if (!value) return '"-"'
        if (row.districtId || row.gasstationNum > 0) {
          return '"' + value + '(' + row.gasstationNum + ' 站)"'
        } else {
          return '"' + value + '"'
        }
      } },
    { field: 'queryDateTime', name: '', hide: true, search: { type: 'date-picker', dtime: ['00:00:00', '23:59:59'], timeOptions: toolPickerOptions(), rangeNumber: 30, dataType: 'rangeType' } },
    { field: 'gasQtyTotal', name: '加气量(公斤)' }
  ]
}

export default columns
