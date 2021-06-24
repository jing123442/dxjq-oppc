import { utilsBaseRole, utilsStatus, utilsDyOrgList, utilsOrgRoleList, utilsBaseRoleList } from '@/utils/select'

const select = {
  list: {
    orgId: utilsDyOrgList(null, 'bizUserId', ['orgName', 'orgShortName'], 2)
  },
  download: {
    orgId: utilsDyOrgList(null, 'orgName', ['orgName', 'orgShortName'], 2),
    voucherStatus: [
      { value: 0, label: '未盖章' },
      { value: 1, label: '已盖章' }
    ]
  }
}

export default select
