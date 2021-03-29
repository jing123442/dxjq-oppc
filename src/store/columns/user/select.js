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
    status: utilsStatus(),
    baseRole: utilsBaseRole(['carrier', 'driver', 'filler', 'register']),
    sex: [
      { value: 1, label: '男' },
      { value: 2, label: '女' }
    ]
  }
}

export default select
