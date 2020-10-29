const app = {
  mode: {
    firmList: [
      { ou: 1, name: '企业名称' },
      { ou: 2, name: '账务基本信息' }
    ],
    info: [
      { ou: 2, name: '加气站基本信息' }
    ],
    gasstation: [
      { ou: 1, name: '机构代码信息' },
      { ou: 2, name: '企业基本信息' },
      { ou: 3, name: '上传有效证件信息（* 请保证证件边框完整，字体清晰，文件大小不超过1M）' }
    ]
  },
  list: {
    firmList: 13,
    info: 13,
    account: 13,
    price: 13,
    updatePrice: 13,
    gasStockList: 13,
    printerList: 4,
    lngPlan: 13
  }
}

export default app
