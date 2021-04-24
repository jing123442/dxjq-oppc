/* eslint-disable */
const columns = {
  daySales: [
    { field: 'name', name: '名称', fixed: 'left', stype: 'format',
      formatFun: function(value, row) {
        if (row.districtId || row.gasstationNum > 0) {
          return '"' + value + '(' + row.gasstationNum + ' 站)"'
        } else {
          return '"' + value + '"'
        }
      } },
    { field: 'todayGasQtyTotal', name: '今日' },
    { field: 'yesterdayGasQtyTotal', name: '昨日同时' },
    { field: 'gasGap', name: '较 昨日同时差量' },
    { field: 'rate', name: '较 昨日同时环比' },
    { field: 'weekAverageGasQty', name: '前7日均' },
    { field: 'monthAverageGasQty', name: '前30日均' }
  ],
  historySales: [
    { field: 'name', name: '名称', fixed: 'left', stype: 'format',
      formatFun: function(value, row) {
        if (row.districtId || row.gasstationNum > 0) {
          return '"' + value + '(' + row.gasstationNum + ' 站)"'
        } else {
          return '"' + value + '"'
        }
      } },
    { field: 'queryDateTime', name: '', hide: true, search: { type: 'date-picker', dtime: ['00:00:00', '23:59:59'] } },
    { field: 'gasQtyTotal', name: '加气量' }
  ]
}

export default columns
