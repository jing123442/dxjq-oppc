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

  // row.authStatus != 2 && optList.push({ type: 'self_edit', name: '编辑' })
  optList.push({ type: 'self_detail', name: '详情' })
  // row.authStatus != 2 && optList.push({ type: 'cert', name: '认证' })
  row.authStatus == 2 && optList.push({ type: 'add_truck', name: '添加车辆' })
  row.authStatus == 2 && optList.push({ type: 'import', name: '导入车辆' })
  // optList.push({ type: 'record', name: '信息补录' })

  return optList
}

// 加气站公司企业
export function buttonOrgFillerList(scope) {
  // const row = scope.row
  const optList = []

  // row.authStatus != 2 && optList.push({ type: 'self_edit', name: '编辑' })
  optList.push({ type: 'self_detail', name: '详情' })
  // row.authStatus != 2 && optList.push({ type: 'cert', name: '认证' })
  optList.push({ type: 'cashier_list', name: '查看收银员' })
  // optList.push({ type: 'record', name: '信息补录' })

  return optList
}

// LNG计划管理状态函数
export function buttonLNGPlanList(scope) {
  const status = Number(scope.row.status)
  const list = [{ type: 'self_detail', name: '详情' }, { type: 'change_list', name: '变更记录' }]

  if (status === 1 || status === 2 || status === 3 || status === 6 || status === 7) {
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

// 区域管理按钮
export function buttonDistrictManagerList(scope) {
  const btnList = []

  if (scope.row.districtId === 0) {
    btnList.push({ type: 'config_auth', name: '授权账号' })
  } else {
    scope.row.isAllowChild == 0 && btnList.push({ type: 'add_children', name: '新增子区域' })
    btnList.push(
      { type: 'config_area', name: '配置行政区域' },
      { type: 'config_auth', name: '授权账号' },
      { type: 'config_filler', name: '配置加气站' },
      { type: 'config_carrier', name: '配置物流客户' },
      { type: 'edit', name: '修改' },
      { type: 'del', name: '删除' }
    )
  }

  return btnList
}

// 物流公司专享优惠
export function discountCarrierOpt(scope) {
  const btnList = [{ type: 'rebateConfig', name: '优惠配置' }]
  if (scope.row.status == 1) {
    btnList.push({ type: 'rebateClose', name: '优惠关闭' })
  } else if (scope.row.status == 2) {
    btnList.push({ type: 'rebateOpen', name: '优惠开启' })
  }
  return btnList
}

// 加气站限制提现
export function buttonWithdrawLimitConfig(scope) {
  const btnList = [{ type: 'checkLog', name: '审核记录' }]
  if (scope.row.limitStatus == 0) {
    btnList.unshift({ type: 'limitOpen', name: '限制开启' })
  } else if (scope.row.limitStatus == 1) {
    btnList.unshift({ type: 'limitClose', name: '限制关闭', style: 'color: #ff4949' })
  }
  return btnList
}
