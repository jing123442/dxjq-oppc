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
    ]
  }
}

export default select
