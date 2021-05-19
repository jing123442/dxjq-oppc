import { utilsDyOrgList, utilsStatus, utilsOrgRoleList, utilsBaseRoleList } from '@/utils/select'

const select = {
  menu: {
    noCache: [
      { value: '1', label: '缓存' },
      { value: '0', label: '不缓存' }
    ]
  },
  role: {
    orgId: utilsDyOrgList(0)
  },
  user: {
    roleList: utilsOrgRoleList(),
    status: utilsStatus(),
    orgId: utilsDyOrgList(0),
    baseRole: utilsBaseRoleList()
  }
}

export default select
