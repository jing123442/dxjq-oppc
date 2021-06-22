import { utilsBaseRole, utilsStatus, utilsDyOrgList, utilsOrgRoleList, utilsBaseRoleList } from '@/utils/select'

const select = {
  list: {
    orgId: utilsDyOrgList(null, 'bizUserId')
  },
  download: {
    orgId: utilsDyOrgList(null, 'orgName'),
    voucherStatus: [
      { value: 0, label: '未盖章' },
      { value: 1, label: '已盖章' }
    ]
  }
}

export default select
