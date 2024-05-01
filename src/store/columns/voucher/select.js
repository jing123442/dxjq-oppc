import { utilsDyOrgList } from '@/utils/select'

const select = {
  list: {
    orgId: utilsDyOrgList(null, 'orgId', ['orgName', 'orgShortName'], 2)
  },
  download: {
    voucherStatus: [
      { value: 0, label: '未盖章' },
      { value: 1, label: '已盖章' }
    ]
  }
}

export default select
