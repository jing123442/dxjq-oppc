import { utilsBaseRole, utilsStatus, utilsDyOrgList } from '@/utils/select'

const select = {
  op: {
    baseRole: utilsBaseRole([1, 2, 7]),
    status: utilsStatus(),
    orgId: utilsDyOrgList(0)
  },
  carrier: {
    baseRole: utilsBaseRole([5, 6]),
    status: utilsStatus(),
    orgId: utilsDyOrgList(2)
  },
  cashier: {
    baseRole: utilsBaseRole([3, 4]),
    status: utilsStatus(),
    orgId: utilsDyOrgList(1)
  },
  intention: {
    status: [
      { value: 0, label: '未处理' },
      { value: 1, label: '已分配' },
      { value: 2, label: '已处理' }
    ],
    channel: [
      { value: 0, label: '自主登记' },
      { value: 1, label: '运营登记' }
    ]
  }
}

export default select
