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
  }
}

export default select
