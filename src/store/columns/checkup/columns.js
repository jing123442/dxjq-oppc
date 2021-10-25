/* eslint-disable */
const columns = {
  order: [
    { field: 'orderId', name: '订单编号', fixed: 'left' },
    { field: 'gasstationName', name: '加气站' },
    { field: 'status', name: '订单状态', formatter: 'orderStatus', search: { type: 'select', obj: 'orderStatus', placeholder: '订单状态' } },
    { field: 'appointCreateDateStart', name: '预约下单时间' },
    { field: 'appointDateStart', name: '预约检测时间' },
    { field: 'payDate', name: '支付时间' },
    { field: 'cancelDate', name: '取消时间' },
    { field: 'payAmount', name: '支付金额' },
    { field: 'carrierName', name: '物流公司', search: { type: 'text', placeholder: '请输入物流公司' } },
    { field: 'carNumber', name: '车牌号', search: { type: 'text', placeholder: '请输入车牌号' } },
    { field: 'gasCylinderNumber', name: '气瓶编号', search: { type: 'text', placeholder: '请输入气瓶编号' } },
    { field: 'driverName', name: '司机名称', search: { type: 'text', placeholder: '请输入司机名称' } },
    { field: 'driverMobile', name: '联系方式', search: { type: 'text', placeholder: '请输入联系方式' } },
    { field: 'note', name: '备注', colspan: 24, cancel: { type: 'textarea', placeholder: '请输入取消原因!' }, rules: [{ required: true, message: '请输入取消原因！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: params => {
        const row = params.row || {}
        const buttons = [{ type: 'material', name: '资料详情' }]

        if (row.status !== 3) {
          buttons.push({ type: 'cancel', name: '取消订单' })
        }

        return buttons
      } }
  ],
  material: [
    { field: 'name', name: '资料名称', fixed: 'left' },
    { field: 'status', name: '资料状态', formatter: 'materialStatus' },
    { field: 'signDate', name: '资料签收时间' },
    { field: 'returnDate', name: '资料返还时间' },
    { field: 'signerName', name: '签收人' },
    { field: 'returnerName', name: '返还人' }
  ]
}

export default columns
