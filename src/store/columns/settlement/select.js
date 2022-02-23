const select = {
  invoiceDs: {
    receiptStatus: [
      { value: 0, label: '待审核' },
      { value: 1, label: '开票中' },
      { value: 2, label: '已开票' },
      { value: 3, label: '已驳回' }
    ],
    dateType: [
      { value: 'createDate', label: '申请时间' },
      { value: 'updateDate', label: '更新时间' }
    ]
  }
}

export default select
