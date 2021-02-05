// LNG计划管理状态函数
export function buttonLNGPlanList(scope) {
  const status = Number(scope.row.status)
  const list = [{ type: 'detail-info', name: '详情' }, { type: 'change-list', name: '变更记录' }]

  if (status === 2 || status === 6 || status === 7) {
    list.unshift({ type: 'cancel', name: '取消' })
  }
  if (status === 6) {
    list.unshift({ type: 'enter', name: '确认' })
  }
  if (status === 7) {
    list.unshift({ type: 'change', name: '变更申请处理' })
  }
  if (status === 2) {
    list.unshift({ type: 'leave', name: '录入磅单' })
  }
  if (status === 3) {
    list.unshift({ type: 'update', name: '修正磅单' })
  }
  if (status === 4) {
    list.unshift({ type: 'check', name: '核对' })
  }
  if (status === 8) {
    list.unshift({ type: 'anomalous', name: '异常处理' })
  }

  return list
}
