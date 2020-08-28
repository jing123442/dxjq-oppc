const app = {
  state: {
    mode: {
      firmList: [
        { ou: 1, name: '企业名称' },
        { ou: 2, name: '账务基本信息' }
      ],
      gapList: [
        { ou: 1, name: '企业基本信息' },
        { ou: 2, name: '加气站基本信息' }
      ],
      addGasStation: [
        { ou: 1, name: '企业基本信息' },
        { ou: 2, name: '加气站基本信息' }
      ]
    },
    list: {
      firmList: 13,
      gapList: 13,
      account: 13,
      sevicePrice: 13,
      updatePrice: 13,
      printerList: 4
    }
  }
}

export default app
