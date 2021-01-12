const columns = {
  customer: [
    { field: 'cashierName', name: '支付方式', lg: 24, xl: 24, nameSpan: 2, show: { type: 'ueditor', style: 'width: 95%', placeholder: '请输入内容' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 80, list: [{ type: 'edit', name: '编辑' }] }
  ]
}

export default columns
