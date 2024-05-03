export const getColumns = () => [{
  prop: 'gasstationId',
  fixed: 'left',
  label: '加气站',
  width: '150'
},
{
  prop: 'type',
  label: '是/否 一票制',
  width: '150'
}, {
  prop: 'price',
  label: '中石化零售价（元/公斤）',
  width: '150'
}, {
  prop: 'purchase',
  label: '采购价（元/公斤）',
  width: '150'
}, {
  prop: 'outbound',
  label: '出港/厂价（元/公斤）',
  width: '150'
}, {
  prop: 'transport',
  label: '运费（元/公斤）',
  width: '150'
}, {
  prop: 'service',
  label: '总服务费（元/公斤）',
  width: '150'
}, {
  prop: 'estimatedTime',
  label: '预计执行时间',
  width: '150'
}, {
  prop: 'realTime',
  label: '实际执行时间',
  width: '150'
}, {
  prop: 'status',
  label: '执行状态',
  width: '150',
  slot: 'status'
}, {
  prop: 'voucher',
  label: '凭证',
  width: '150'
}, {
  prop: 'operationTime',
  label: '创建时间',
  width: '150'
}, {
  prop: 'operator',
  label: '操作人',
  width: '150'
}]
export const getTableData = () => {
  return [{
    gasstationId: '1',
    type: '是',
    price: '100',
    purchase: '100',
    outbound: '100',
    transport: '100',
    service: '100',
    estimatedTime: '2020-01-01',
    realTime: '2020-01-01',
    status: '已执行',
    voucher: '1',
    operationTime: '2020-01-01',
    operator: '1'
  }]
}
