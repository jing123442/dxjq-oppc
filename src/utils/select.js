import { isTypeof, inArray } from '@/utils/tools'
import { regionData } from 'element-china-area-data'

export function utilsBaseRole(arrs) {
  const defaultRole = [
    { value: 0, label: '其他' },
    { value: 1, label: '平台管理员' },
    { value: 2, label: '平台运营人员' },
    { value: 3, label: '加气企业管理者' },
    { value: 4, label: '收银员' },
    { value: 5, label: '物流公司管理者' },
    { value: 6, label: '司机' }
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

export function utilsStatus() {
  return [
    { value: 0, label: '启用' },
    { value: 1, label: '停用' }
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
    { value: 3, label: '取消' }
  ]
}

export function utilsPlanStatus() {
  return [
    { value: 0, label: '已取消' },
    { value: 1, label: '已下单' },
    { value: 2, label: '已确认' },
    { value: 3, label: '已出港' },
    { value: 4, label: '已签收' },
    { value: 5, label: '已完成' }
  ]
}
export function utilsAutoAccount() {
  return [
    { value: 0, label: '否' },
    { value: 1, label: '是' }
  ]
}

export function utilsDyOrgList() {
  return {
    url: '/user/org/list',
    node: ['data', 'records'],
    keyVal: {
      value: 'orgId',
      label: 'orgName'
    },
    params: Function
  }
}
