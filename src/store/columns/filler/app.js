const app = {
  mode: {
    firmList: [
      { ou: 1, name: '企业名称', status: 3 },
      { ou: 2, name: '账务基本信息', status: 3 }
    ],
    orgManageInfo: [
      { ou: 1, name: '机构代码信息', status: 3 },
      { ou: 2, name: '企业基本信息', status: 3 },
      { ou: 3, name: '管理员信息', status: 3 },
      { ou: 4, name: '企业认证', status: 3 },
      { ou: 5, name: '平台合同', status: 3 },
      { ou: 6, name: '账号授权', status: 3 }
    ],
    info: [
      { ou: 2, name: '加气站基本信息', status: 3 }
    ],
    gasstation: [
      { ou: 1, name: '机构代码信息', status: 3 },
      { ou: 2, name: '企业基本信息', status: 3 }
    ],
    printList: [],
    lngPlan: [
      { ou: 1, name: '计划详情', status: 3 }
    ],
    lngPlanChange: [
      { ou: 1, name: '计划详情', status: 3 },
      { ou: 2, name: '变更详情', status: 3 }
    ],
    lngPlanInfo: [
      { ou: 1, name: '计划确认', status: 3 }
    ],
    lngPlanCancelInfo: [
      { ou: 1, name: '计划确认', status: 3 },
      { ou: 2, name: '计划取消', status: 3 }
    ],
    lngPlanLeaveInfo: [
      { ou: 1, name: '计划详情', status: 3 },
      { ou: 2, name: '录入出港磅单', status: 3 }
    ],
    lngPlanCheckInfo: [
      { ou: 1, name: '计划详情', status: 3 },
      { ou: 2, name: '核对到站榜单', status: 3 }
    ],
    lngPlanAnomalousInfo: [
      { ou: 1, name: '计划详情', status: 3 },
      { ou: 2, name: '异常申报处理', status: 3 }
    ]
  },
  list: {
    firmList: 13,
    info: 13,
    account: 13,
    price: 13,
    gasStockList: 13,
    printList: 4,
    lngPlan: 13,
    plsLog: 13,
    gasLimitDriverDetail: 13
  }
}

export default app
