const app = {
  mode: {
    supplier: [
      { ou: 1, name: '基本信息', status: 3 },
      { ou: 2, name: '联系人信息', status: 3 },
      { ou: 3, name: '财务信息', status: 3 },
      { ou: 4, name: '价格信息', status: 3 },
      { ou: 5, name: '其他信息', status: 3 }
    ],
    orderDetail: [
      { ou: 1, name: '基本信息', status: 3 },
      { ou: 2, name: '商品信息', status: 3 },
      { ou: 3, name: '收货信息', status: 3 },
      { ou: 4, name: '物流信息', status: 3 },
      { ou: 5, name: '充值信息', status: 3 },
      { ou: 6, name: '优惠券信息', status: 3 }
    ],
    goods: [
      { ou: 0, name: '商品明细', status: 3 },
      { ou: 1, name: '供应商信息', status: 3 },
      { ou: 2, name: '商品信息', status: 3 },
      { ou: 3, name: '价格信息', status: 3 },
      { ou: 4, name: '商品图片', status: 3 },
      { ou: 5, name: '库存信息', status: 3 },
      { ou: 6, name: '商品描述', status: 3 }
    ]
  },
  list: {
    ruleList: 13,
    supplier: 29,
    order: 13,
    category: 29,
    goods: 29,
    pointsAccount: 13,
    pointsAccountLog: 13,
    inviteRecords: 13
  }
}

export default app
