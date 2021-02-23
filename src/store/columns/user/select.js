import { utilsBaseRole, utilsStatus, utilsDyOrgList, utilsOrgRoleList, utilsBaseRoleList } from '@/utils/select'

const select = {
  op: {
    roleList: utilsOrgRoleList(),
    status: utilsStatus(),
    orgId: utilsDyOrgList(0),
    baseRole: utilsBaseRoleList()
  },
  carrier: {
    baseRole: utilsBaseRole(['carrier', 'driver']),
    status: utilsStatus(),
    orgId: utilsDyOrgList(2)
  },
  cashier: {
    baseRole: utilsBaseRole(['filler', 'cashier']),
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
