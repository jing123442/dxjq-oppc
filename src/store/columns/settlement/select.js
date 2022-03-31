const select = {
  invoiceDs: {
    receiptStatus: [
      { value: 0, label: '审核中' },
      { value: 2, label: '已开票' },
      { value: 3, label: '已驳回' }
    ],
    dateType: [
      { value: 'createDate', label: '申请时间' },
      { value: 'updateDate', label: '更新时间' }
    ],
  },
  directWithdApply: {
    applyStatus: [
      { value: 0, label: '无交易' },
      { value: 1, label: '待申请' },
      { value: 2, label: '初审中', style: 'color: rgb(2, 125, 180);' },
      { value: 3, label: '复审中', style: 'color: rgb(0, 0, 191);' },
      { value: 4, label: '申请通过', style: 'color: rgb(75, 121, 2);' },
      { value: 5, label: '已驳回', style: 'color: rgb(184, 116, 26);' },
    ]
  }
}

export default select
