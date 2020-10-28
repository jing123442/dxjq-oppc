import { isTypeof, inArray } from '@/utils/tools'
import { regionData } from 'element-china-area-data'
// import { $userUserList } from '@/service/user'

export function utilsBaseRole(arrs) {
  const defaultRole = [
    { value: 0, label: '其他' },
    { value: 1, label: '平台管理员' },
    { value: 2, label: '平台运营人员' },
    { value: 3, label: '加气企业管理者' },
    { value: 4, label: '收银员' },
    { value: 5, label: '物流公司管理者' },
    { value: 6, label: '司机' },
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

export function utilsStatus() {
  return [
    { value: 0, label: '启用' },
    { value: 1, label: '停用' }
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
// 圈存方式
export function utilsAutoAccountType() {
  return [
    { value: 0, label: '手动圈存' },
    { value: 1, label: '自动圈存' }
  ]
}
// 开车类型
export function utilsTruckType() {
  return [
    { value: 0, label: '自营' },
    { value: 1, label: '其他' }
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
    { value: 0, label: '关' },
    { value: 1, label: '低' },
    { value: 2, label: '中' },
    { value: 3, label: '高' }
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
    { value: 7, label: '平台费' }
  ]
}

export function untilsMarketingManList() {
  // const params = {
  //   page: 1, param: { baseRole: 7, status: 0, userType: 0 }, size: 100
  // }
  // $userUserList(params).then((res) => {
  //   console.log(res)
  // })
}

export function utilsDyOrgList(type = null) {
  return {
    url: '/user/org/list',
    node: ['data', 'records'],
    params: {
      page: 1,
      size: 10,
      param: {
        orgType: type
      }
    },
    props: {
      value: 'orgId',
      label: 'orgName'
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
    url: 'carrier/driver/list_all',
    node: ['data', 'records'],
    params: Function,
    props: {
      value: 'userId',
      label: ['userName', 'mobile']
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
