import { utilsBaseRole, utilsStatus, utilsDyOrgList } from '@/utils/select'

const select = {
  op: {
    baseRole: utilsBaseRole([1, 2, 7]),
    status: utilsStatus(),
    orgId: utilsDyOrgList()
  },
  carrier: {
    baseRole: utilsBaseRole([5, 6]),
    status: utilsStatus(),
    orgId: utilsDyOrgList()
  },
  cashier: {
    baseRole: utilsBaseRole([3, 4]),
    status: utilsStatus(),
    orgId: utilsDyOrgList()
  }
}

export default select
