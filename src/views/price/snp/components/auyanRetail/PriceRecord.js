export const getColumns = () => [{
  prop: 'gasstationId',
  fixed: 'left',
  label: '加气站',
  width: '150'
}, {
  prop: 'platformPrice',
  label: '平台价（元/公斤）',
  width: '150'
}, {
  prop: 'shopPrice',
  label: '挂牌价（元/公斤）',
  width: '150'
},
{
  prop: 'expectExecuteTime',
  label: '预计执行时间',
  width: '150'
},
{
  prop: 'realExecuteTime',
  label: '实际执行时间',
  width: '150'
}, {
  prop: 'execStatus',
  label: '执行状态',
  width: '150'
}, {
  prop: 'auditStatus',
  label: '审核状态',
  width: '150'
}, {
  prop: 'voucher',
  label: '定价凭证',
  width: '150',
  slot: 'voucher'
}, {
  prop: 'operationTime',
  label: '调价时间',
  width: '150'
}, {
  prop: 'operator',
  label: '调价人',
  width: '150'
}, {
  prop: 'snpPrice',
  label: '中石化零售价（元/公斤）',
  width: '150'
}]
export const getTableData = () => {
  return [{
    gasstationId: '1',
    platformPrice: '100',
    shopPrice: '100',
    expectExecuteTime: '2020-01-01',
    realExecuteTime: '2020-01-01',
    execStatus: '1',
    auditStatus: '1',
    voucher: '1',
    operationTime: '2020-01-01',
    operator: '1',
    snpPrice: '100'
  }]
}
