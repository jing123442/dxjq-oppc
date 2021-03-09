import { formateTData } from '@/utils/tools'
// 运营平台企业
export function buttonOrgBusinessList(scope) {
  const row = scope.row
  const optList = []

  row.authStatus != 2 && optList.push({ type: 'self_edit', name: '编辑' })
  optList.push({ type: 'self_detail', name: '详情' })
  optList.push({ type: 'cert', name: '认证' })
  if (row.bindPhone) optList.push({ type: 'unbind', name: '解绑手机号' })
  else optList.push({ type: 'bind', name: '绑定手机号' })

  return optList
}

// 物流公司企业
export function buttonOrgCarrierList(scope) {
  const row = scope.row
  const optList = []

  row.authStatus != 2 && optList.push({ type: 'self_edit', name: '编辑' })
  optList.push({ type: 'self_detail', name: '详情' })
  row.authStatus != 2 && optList.push({ type: 'cert', name: '认证' })
  row.authStatus == 2 && optList.push({ type: 'add_truck', name: '添加车辆' })
  row.authStatus == 2 && optList.push({ type: 'import', name: '导入车辆' })

  return optList
}

// 加气站公司企业
export function buttonOrgFillerList(scope) {
  const row = scope.row
  const optList = []

  row.authStatus != 2 && optList.push({ type: 'self_edit', name: '编辑' })
  optList.push({ type: 'self_detail', name: '详情' })
  row.authStatus != 2 && optList.push({ type: 'cert', name: '认证' })
  optList.push({ type: 'cashier_list', name: '查看收银员' })

  return optList
}

// LNG计划管理状态函数
export function buttonLNGPlanList(scope) {
  const status = Number(scope.row.status)
  const list = [{ type: 'self_detail', name: '详情' }, { type: 'change_list', name: '变更记录' }]

  if (status === 1 || status === 2 || status === 3 || status === 4 || status === 6 || status === 7) {
    list.unshift({ type: 'cancel', name: '取消' })
  }
  if (status === 6) {
    list.unshift({ type: 'enter', name: '确认' })
  }
  if (status === 7) {
    list.unshift({ type: 'change', name: '变更申请处理' })
  }
  if (status === 2) {
    list.unshift({ type: 'in_weight', name: '录入磅单' })
  }
  if (status === 3) {
    list.unshift({ type: 'update_weight', name: '修正磅单' })
  }
  if (status === 4) {
    list.unshift({ type: 'check', name: '核对' })
  }
  if (status === 8) {
    list.unshift({ type: 'exception', name: '异常处理' })
  }

  return list
}

// 菜单按钮
export function buttonMenuList(scope) {
  const list = []
  // const row = scope.row

  list.push({ type: 'add_child', name: '增加子菜单' })

  list.push({ type: 'edit', name: '编辑' })
  list.push({ type: 'del', name: '删除' })

  return list
}

// 消息按钮
export function buttonMessageManageList(scope) {
  // 发布状态：1 编辑中，2 发布中，3 已发布
  const status = scope.row.publishStatus
  const list = []
  switch (status) {
    case 1:
      list.push({ type: 'edit', name: '编辑' })
      list.push({ type: 'del', name: '删除' })
      break
    case 2:
      list.push({ type: 'edit', name: '编辑' })
      break
    case 3:
      list.push({ type: 'detail', name: '查看' })
      break
  }

  return list
}

// 消息按钮
export function buttonPublishReleaseList(scope) {
  const btnList = [{ type: 'list', name: '查看' }]

  if (scope.row.status == 1) {
    btnList.push({ type: 'pass', name: '通过' })
    btnList.push({ type: 'reject', name: '驳回' })
  }

  if (scope.row.status == 2 && formateTData(scope.row.releaseTime, 'date') === formateTData(new Date(), 'date')) {
    btnList.push({ type: 'publish', name: '实时发布' })
  }

  return btnList
}
