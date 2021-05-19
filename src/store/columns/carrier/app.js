const app = {
  mode: {
    orderManagerDetail: [
      { ou: 0, name: '物流公司信息', status: 3 },
      { ou: 1, name: '加气站信息', status: 3 },
      { ou: 2, name: '订单详情', status: 3 }
    ],
    orgAddManageInfo: [
      { ou: 1, name: '机构代码信息', status: 3 },
      { ou: 2, name: '企业基本信息', status: 3 }
    ],
    selfManageInfo: [
      { ou: 2, name: '个人车主基本信息', status: 3 },
      { ou: 3, name: '管理员信息', status: 3 },
      { ou: 4, name: '企业认证', status: 3 },
      { ou: 5, name: '平台合同', status: 3 },
      { ou: 6, name: '账号授权', status: 3 }
    ],
    orgManageInfo: [
      { ou: 1, name: '机构代码信息', status: 3 },
      { ou: 2, name: '企业基本信息', status: 3 },
      { ou: 3, name: '管理员信息', status: 3 },
      { ou: 4, name: '企业认证', status: 3 },
      { ou: 5, name: '平台合同', status: 3 },
      { ou: 6, name: '账号授权', status: 3 }
    ],
    vehicle_detail: [
      { ou: 0, name: '车辆信息', status: 3 },
      { ou: 1, name: '司机信息', status: 2 },
      { ou: 2, name: '账户状态', status: 2 },
      { ou: 3, name: '行驶证信息', status: 2 }
    ]
  },
  list: {
    logistics: 13,
    firmAccount: 13,
    vehicle: 13,
    truckAccount: 13,
    truckIntegral: 13,
    rechargeRecord: 13,
    inventoryManager: 13,
    orderManager: 13
  }
}

export default app
