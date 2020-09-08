const app = {
  mode: {
    orderManagerDetail: [
      { ou: 0, name: '物流公司信息' },
      { ou: 1, name: '加气站信息' },
      { ou: 2, name: '订单详情' }
    ],
    vehicle_detail: [
      { ou: 0, name: '车辆信息' },
      { ou: 1, name: '司机信息' },
      { ou: 2, name: '账户状态' }
    ]
  },
  list: {
    logistics: 13,
    firmAccount: 13,
    vehicle: 13,
    truckAccount: 13,
    rechargeRecord: 13,
    inventoryManager: 13,
    orderManager: 13
  }
}

export default app
