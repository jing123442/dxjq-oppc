import { isTypeof, inArray } from '@/utils/tools'
import { regionData } from 'element-china-area-data'
import { $childQACatalogsList } from '@/service/message'
// import { $userUserList } from '@/service/user'

export function utilsQATreeList(node, resolve) {
  const params = { parentId: 0, status: 1 }

  if (node.level > 0) {
    params.status = 1
    params.parentId = node.data.id
  }

  $childQACatalogsList(params).then(response => {
    const treeList = isTypeof(response.data) === 'array' ? response.data : []

    treeList && treeList.forEach(item => {
      if (node.level > 0) {
        item.leaf = true
      }
    })

    resolve(treeList)
  })
}

export function utilsBaseRole(arrs) {
  const defaultRole = [
    { value: 0, label: '其他' },
    { value: 1, label: '平台管理员' },
    { value: 2, label: '平台运营人员' },
    { value: 'register', label: '平台用户' },
    { value: 'filler', label: '加气企业管理者' },
    { value: 'cashier', label: '收银员' },
    { value: 'carrier', label: '物流公司管理者' },
    { value: 'driver', label: '司机' },
    { value: 7, label: '平台业务经理' }
  ]

  if (isTypeof(arrs) === 'array' && arrs.length > 0) {
    const res = []
    defaultRole.forEach(item => {
      if (inArray(item.value, arrs) != -1) {
        res.push(item)
      }
    })
    return res
  } else {
    return defaultRole
  }
}

export function untilsAddress() {
  const region = []
  regionData.forEach(provice => {
    provice.children.forEach(city => {
      if (city.children) {
        city.children.forEach(district => {
          region.push({ value: [provice.label, city.label, district.label], label: [provice.label, city.label, district.label] })
        })
      } else {
        region.push({ value: [provice.label, city.label], label: [provice.label, city.label] })
      }
    })
  })
  return region
}

export function utilsExecuteStatus() {
  return [
    { value: '0', label: '初始' },
    { value: '1', label: '已预约未执行' },
    { value: '2', label: '执行中' },
    { value: '3', label: '已作废' }
  ]
}
export function utilsStatus() {
  return [
    { value: '0', label: '启用' },
    { value: '1', label: '停用' }
  ]
}
// 物流公司子类
export function utilsOrgSubType() {
  return [
    { value: 21, label: '物流公司' },
    { value: 22, label: '个人车主' }
  ]
}
export function utilsAuthStatus() {
  return [
    { value: 0, label: '未认证' },
    { value: 1, label: '认证中' },
    { value: 2, label: '已认证' },
    { value: 3, label: '认证失败' }
  ]
}
// 客户端list
export function utilsQAClientList() {
  return {
    url: 'message/qa_client/list',
    node: ['data'],
    params: {},
    props: {
      value: 'clientId',
      label: 'clientName'
    }
  }
}
export function utilsDownloadStatus() {
  return [
    { value: 1, label: '待生成' },
    { value: 2, label: '已生成' },
    { value: 3, label: '生成失败' }
  ]
}
export function utilsDownloadType() {
  return [
    { value: 1, label: '物流公司加气站结算明细' },
    { value: 2, label: '物流公司加气站对账函' },
    { value: 3, label: '物流公司账期汇总列表' },
    { value: 4, label: '物流公司卡车结算明细' },
    { value: 5, label: '物流公司卡车汇总' },
    { value: 6, label: '加气站物流公司对账函' },
    { value: 7, label: '加气站结算明细' },
    { value: 8, label: '加气站汇总列表' },
    { value: 9, label: '加气站与长城奥扬对账单' },
    { value: 10, label: '加气站提现明细' },
    { value: 11, label: '象群科技结算明细' },
    { value: 12, label: '象群科技与长城奥扬对账函' },
    { value: 14, label: '日结算订单' },
    { value: 15, label: '长城奥扬对账zip文件' },
    { value: 16, label: '加气站对账zip文件' }
  ]
}
export function utilsCheck() {
  return [
    { value: 0, label: '待审核' },
    { value: 1, label: '已审核' }
  ]
}
export function utilsAccountType() {
  return [
    { value: 0, label: '手动圈存' },
    { value: 1, label: '自动圈存' },
    { value: 2, label: '资金归集' }
  ]
}

export function utilsOrderStatus() {
  return [
    { value: 1, label: '待支付' },
    { value: 2, label: '已支付' },
    { value: 3, label: '取消' },
    { value: 4, label: '支付中' },
    { value: 5, label: '退款中' },
    { value: 6, label: '退款完成' }
  ]
}

export function utilsIdentityType() {
  return [
    { value: 1, label: '身份证' },
    { value: 2, label: '护照' },
    { value: 3, label: '军官证' },
    { value: 4, label: '回乡证' },
    { value: 5, label: '台胞证' },
    { value: 6, label: '警官证' },
    { value: 7, label: '士兵证' },
    { value: 8, label: '户口簿' },
    { value: 9, label: '港澳居民来往/内地通行证' },
    { value: 10, label: '临时身份证' },
    { value: 11, label: '外国人居留证' },
    { value: 99, label: '其它证件' }
  ]
}

export function utilsPlanStatus() {
  return [
    { value: 0, label: '已取消' },
    { value: 1, label: '已提报' },
    { value: 6, label: '已锁定' },
    { value: 2, label: '已确认' },
    { value: 3, label: '已出港' },
    { value: 4, label: '已签收' },
    { value: 5, label: '已完成' },
    { value: 7, label: '变更待处理' },
    { value: 8, label: '异常待处理' }
  ]
}
export function utilsAutoAccount() {
  return [
    { value: 0, label: '否' },
    { value: 1, label: '是' }
  ]
}
// 圈存方式
export function utilsAutoAccountType() {
  return [
    { value: '0', label: '手动圈存' },
    { value: '1', label: '自动圈存' }
  ]
}
// 开车类型
export function utilsTruckType() {
  return [
    { value: 0, label: '自营' },
    { value: 1, label: '其他' }
  ]
}
export function utilsTruckTypeAll() {
  return [
    { value: 0, label: '自营车辆' },
    { value: 1, label: '其他车辆' },
    { value: 2, label: '全部' }
  ]
}
export function utilsPrintStatus() {
  return [
    { value: 0, label: '离线' },
    { value: 1, label: '在线' },
    { value: 2, label: '缺纸' }
  ]
}
export function utilsVoiceStatus() {
  return [
    { value: '0', label: '关' },
    { value: '1', label: '低' },
    { value: '2', label: '中' },
    { value: '3', label: '高' }
  ]
}
export function utilsGoodsType() {
  return [{ value: 0, label: '实体商品' }, { value: 1, label: '充值虚拟商品' }, { value: 2, label: '抵扣券虚拟商品' }]
}

// 充值类型
export function utilsRechargeType() {
  return [
    { value: 0, label: '线下支付' },
    { value: 1, label: '微信支付' },
    { value: 2, label: '支付宝支付' },
    { value: 3, label: '网关支付' }
  ]
}

// 车辆账户类型
export function utilsTruckAccType() {
  return [
    { value: 1, label: '加气' },
    { value: 2, label: '圈入/充值' },
    { value: 3, label: '圈出' },
    { value: 4, label: '加气退款' },
    { value: 5, label: '加气积分' },
    { value: 6, label: '加气积分退回' },
    { value: 7, label: '组合圈入' },
    { value: 8, label: '返现圈入' },
    { value: 9, label: '返现退回' },
    { value: 21, label: '直销退款' },
    { value: 22, label: '直销收款' }
  ]
}

export function utilsTradeType() {
  return [
    { value: 1, label: '充值' },
    { value: 2, label: '圈出' },
    { value: 3, label: '圈入' },
    { value: 4, label: '提现' },
    { value: 5, label: '收入' },
    { value: 6, label: '服务费' },
    { value: 7, label: '平台费' },
    { value: 8, label: '调增' },
    { value: 9, label: '调减' },
    { value: 10, label: '提现退回' },
    { value: 11, label: '平台费退回' },
    { value: 12, label: '收入退回' },
    { value: 13, label: '服务费退回' },
    { value: 14, label: '组合圈出' },
    { value: 15, label: '返现划入' },
    { value: 16, label: '返现划出' },
    { value: 17, label: '返现圈出退回' },
    { value: 18, label: '返现圈出' },
    { value: 21, label: '直销退款' },
    { value: 22, label: '直销收款' }
  ]
}
export function utilsPriceType() {
  return [
    { value: 0, label: '默认策略' },
    { value: 1, label: '长城奥扬调价' }
  ]
}
export function utilsPrintPaper() {
  return [
    { value: '0', label: '不打印' },
    { value: '1', label: '打印' }
  ]
}

// 组合支付类型
export function utilsComPayType() {
  return [
    { value: 0, label: '开启' },
    { value: 1, label: '关闭' }
  ]
}

export function utilsPayType() {
  return [
    { value: 0, label: '余额' },
    { value: 1, label: '微信' },
    { value: 2, label: '微信+余额' },
    { value: 11, label: '组合支付' }
  ]
}
export function utilsTradeModeType() {
  return [
    { value: 1, label: '经销加气' },
    { value: 2, label: '直销加气' }
  ]
}

export function utilsHandleType() {
  return [
    { value: '1', label: '同意' },
    { value: '2', label: '驳回' }
  ]
}

export function utilsCheckType() {
  return [
    { value: '1', label: '磅单确认' },
    { value: '2', label: '磅单退回' }
  ]
}

export function utilsModifyApplyType() {
  return [
    { value: 1, label: '计划变更' },
    { value: 2, label: '计划取消' },
    { value: 3, label: '异常申请' }
  ]
}

// 签约状态
export function utilsContractStatus() {
  return [
    { value: 1, label: '未签约' },
    { value: 2, label: '已签约' },
    { value: 3, label: '已取消' }
  ]
}

// 认证状态公用对象
export function utilsCommonAuthStatus() {
  return [
    { value: 1, label: '待认证' },
    { value: 2, label: '已认证' },
    { value: 3, label: '认证失败' }
  ]
}
// 电子签约印章状态
export function utilsSealStatus() {
  return [
    { value: 0, label: '已启用' },
    { value: 1, label: '已停用' },
    { value: 2, label: '未申请' }
  ]
}
// 电子签约合同状态
export function utilsContractSignStatus() {
  return [
    { value: 1, label: '甲方待签约' },
    { value: 2, label: '待确认' },
    { value: 3, label: '乙方待签约' },
    { value: 4, label: '乙方个人待签约' },
    { value: 5, label: '已签约' },
    { value: 6, label: '已撤回' },
    { value: 7, label: '已拒绝' }
  ]
}
// 电子签约合同类型
export function utilsContractType() {
  return [
    { value: 1, label: '加气站平台入驻合同' },
    { value: 2, label: '加气站能源合作合同' },
    { value: 3, label: '物流公司平台入驻合同' }
  ]
}
export function utilsBearType() {
  return [
    { value: 1, label: '加气站承担' },
    { value: 2, label: '平台承担' },
    { value: 3, label: '修正出港数据' }
  ]
}
export function utilsOperateType() {
  return [
    { value: 0, label: '新增' },
    { value: 1, label: '编辑' },
    { value: 2, label: '删除' }
  ]
}

export function utilsLNGDataSearch() {
  return [
    /* { value: 'planTime', label: '期望到站日期' }, */
    { value: 'createTime', label: '提报时间' },
    { value: 'lockTime', label: '锁定时间' },
    { value: 'modifyApplyTime', label: '变更提报时间' },
    { value: 'confirmTime', label: '确认时间' },
    { value: 'uploadTime', label: '出港磅单录入时间' },
    { value: 'reachTime', label: '签收时间' },
    { value: 'completeTime', label: '完成时间' },
    { value: 'cancelTime', label: '取消时间' },
    { value: 'exceptionApplyTime', label: '异常提报时间' }
  ]
}

export function utilSelectGasstationType(type = '') {
  let result = [
    { value: 2001, label: '中海油' },
    { value: 2002, label: '中石油' },
    { value: 2003, label: '中石化' },
    { value: 2004, label: '社会' }
  ]
  if (type === 'inner') {
    result = [
      { value: 1001, label: '大象自营' },
      { value: 1002, label: '大象合作' },
      { value: 1003, label: '大象加盟' }
    ]
  }

  if (type === 'all') {
    result.unshift({ value: 1003, label: '大象加盟' })
    result.unshift({ value: 1002, label: '大象合作' })
    result.unshift({ value: 1001, label: '大象自营' })
    result.unshift({ value: 100, label: '大象站' })
    result.unshift({ value: null, label: '全部站点' })
  }

  return result
}

export function untilsMarketingManList() {
  // const params = {
  //   page: 1, param: { baseRole: 7, status: 0, userType: 0 }, size: 100
  // }
  // $userUserList(params).then((res) => {
  //   console.log(res)
  // })
}

export function utilsDyOrgList(type = null, value = 'orgId', label = 'orgName', authStatus = null, tradeType = null) {
  const result = {
    url: 'user/org/list',
    node: ['data', 'records'],
    params: {
      page: 1,
      size: 10,
      param: {
        org: { orgType: type },
        dateParam: { createDateFrom: '', createDateTo: '' }
      }
    },
    props: {
      value: value,
      label: label
    }
  }
  if (authStatus !== null) {
    result.params.param.org.authStatus = authStatus
  }

  if (tradeType !== null) {
    result.params.param.org.tradeType = tradeType
  }

  return result
}
export function utilSelectAuthDistrictList() {
  return {
    url: 'user/district/districtSet',
    node: ['data', 'areas'],
    params: {},
    props: {
      value: 'areaName',
      label: 'areaName'
    }
  }
}
export function utilDistrictAreaList() {
  return {
    url: 'user/district/list',
    node: ['data'],
    params: {},
    props: {
      value: 'districtId',
      label: 'districtName'
    }
  }
}
export function utilsSupplierList() {
  return {
    url: 'shop/supplier/list',
    node: ['data', 'records'],
    params: {
      page: 1,
      size: 100,
      param: {
        supplierStatus: 0
      }
    },
    props: {
      value: 'id',
      label: 'supplierName'
    }
  }
}
export function utilsCategoryList() {
  return {
    url: 'shop/category/list',
    node: ['data', 'records'],
    params: {
      page: 1,
      size: 10
    },
    props: {
      value: 'id',
      label: 'categoryName'
    }
  }
}

export function utilsFillerParentList(type = null) {
  return {
    url: 'user/org/list_parent_filler',
    node: ['data'],
    params: {},
    props: {
      value: 'orgId',
      label: 'orgName'
    }
  }
}

export function utilsOrgRoleList() {
  return {
    url: 'user/role/role_list',
    isNotInit: true,
    node: ['data'],
    params: Function,
    props: {
      value: 'roleId',
      label: 'roleName'
    }
  }
}

export function utilsBaseRoleList() {
  return {
    url: 'user/role/role_list',
    node: ['data'],
    params: {
      clientId: 'woperation'
    },
    props: {
      value: 'roleId',
      label: 'roleName'
    }
  }
}

export function utilsUserList() {
  return {
    url: 'user/user/list',
    node: ['data', 'records'],
    params: {
      page: 1,
      size: 10,
      param: {
        status: 0,
        userType: 0,
        baseRole: 7
      }
    },
    props: {
      value: 'userId',
      label: ['userId', 'userName', 'mobile']
    }
  }
}

export function utilsDriverList() {
  return {
    url: 'strategy/driver/list_all',
    node: ['data', 'records'],
    params: Function,
    props: {
      value: 'userId',
      label: ['userName', 'mobile']
    }
  }
}
export function utilsRoleList() {
  return {
    url: 'user/role/list',
    node: ['data', 'records'],
    params: {
      page: 1,
      size: 100,
      param: {}
    },
    filter: ['长城奥扬 / 长城奥扬管理员', '运营管理 / 大象加气管理员', '运营管理 / 大象加气运营人员'],
    props: {
      value: ['roleId', 'clientId'],
      label: ['clientName', 'roleName']
    }
  }
}

export function utilsSource() {
  return {
    url: 'strategy/lng_from/list',
    node: ['data', 'records'],
    props: {
      value: 'code',
      label: 'name'
    },
    params: {
      page: 1,
      size: 10
    }
  }
}

export function utilsBankList() {
  return {
    url: 'user/bank/list_by_keywords',
    node: ['data'],
    props: {
      value: 'bankName',
      label: 'bankName'
    },
    params: {
      page: 1,
      size: 10
    }
  }
}

// select转table的filters
export function utilsTableOptionsToFilters(func, props = { text: 'label' }) {
  // eslint-disable-next-line no-eval
  const optionList = eval('(' + func + ')')()

  optionList.forEach(item => {
    for (const [k, v] of Object.entries(props)) {
      item[k] = item[v]
    }
  })

  return optionList
}
// 印章管理查找平台用户
export function utilsUserListBySeal(name) {
  return {
    url: 'user/user/list_platform_user',
    node: ['data'],
    param: {
      keyword: name
    },
    props: {
      value: 'idCardNo',
      label: ['userName', 'userId']
    }
  }
}
// 查找平台方企业
export function utilsPlateformOrgList() {
  return {
    url: 'user/org/plateform_org_list',
    node: ['data'],
    param: {
    },
    props: {
      value: 'orgId',
      label: 'orgName'
    }
  }
}
// 车辆列表
export function utilsDistrictUserList(name) {
  return {
    url: 'user/user/list',
    node: ['data', 'records'],
    params: {
      page: 1,
      size: 10,
      param: {
        status: 0,
        userType: 0,
        keyword: name
      }
    },
    props: {
      value: ['userId', 'userName', 'mobile'],
      label: 'userName'
    }
  }
}
// 卡车列表
export function utilsTruckList(carNumber) {
  return {
    url: 'strategy/truck/list',
    node: ['data', 'records'],
    params: {
      page: 1,
      size: 10,
      param: {
        status: 0,
        carNumber
      }
    },
    props: {
      value: 'truckId',
      label: 'carNumber'
    }
  }
}
// 查看合同申请
export function utilsCooperationApplyDetail(name) {
  return [
    { value: 0, label: '查看' },
    { value: 1, label: '-' }
  ]
}
// 情报类型
export function utilInfoType() {
  return [
    { value: 0, label: '大象平台情报' },
    { value: 1, label: '大象线下情报' },
    { value: 2, label: '非大象情报' }
  ]
}
export function utilsLngContainerCar(carNumber) {
  return {
    url: 'gasdata/lng_container/car',
    node: ['data'],
    params: {
      carNumber
    },
    props: {
      value: 'containerNumber',
      label: 'containerNumber'
    }
  }
}
