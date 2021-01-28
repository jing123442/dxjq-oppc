const app = {
  mode: {
    firmList: [
      { ou: 1, name: '企业名称', status: 3 },
      { ou: 2, name: '账务基本信息', status: 3 }
    ],
    info: [
      { ou: 2, name: '加气站基本信息', status: 3 }
    ],
    gasstation: [
      { ou: 1, name: '机构代码信息', status: 3 },
      { ou: 2, name: '企业基本信息', status: 3 }
    ],
    printList: []
  },
  list: {
    firmList: 13,
    info: 13,
    account: 13,
    price: 13,
    updatePrice: 13,
    gasStockList: 13,
    printList: 4,
    lngPlan: 13
  }
}

export default app
