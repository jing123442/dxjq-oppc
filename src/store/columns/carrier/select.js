import {
  utilsStatus,
  utilsTruckType,
  utilsAutoAccountType,
  utilsAuthStatus,
  utilsDyOrgList,
  utilsAutoAccount,
  utilsAccountType,
  utilsOrderStatus,
  utilsDriverList,
  utilsIdentityType,
  utilsTradeType,
  utilsBankList,
  utilsOrgSubType,
  utilsComPayType,
  utilsTruckAccType, utilsRechargeType
} from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  logistics: {
    orgId: utilsDyOrgList(2),
    status: utilsStatus(),
    authStatus: utilsAuthStatus(),
    cascaderAddress: regionData,
    truckType: utilsTruckType(),
    autoAccount: utilsAutoAccountType(),
    identityType: utilsIdentityType(),
    bankList: utilsBankList(),
    orgSubType: utilsOrgSubType(),
    comPayType: utilsComPayType()
  },
  firmAccount: {
    orgId: utilsDyOrgList(2),
    autoAccount: utilsAutoAccount(),
    type: utilsTradeType()
  },
  vehicle: {
    orgId: utilsDyOrgList(2),
    status: utilsStatus(),
    truckType: utilsTruckType(),
    autoAccount: utilsAutoAccountType(),
    driverList: utilsDriverList(),
    comPayType: utilsComPayType()
  },
  truckAccount: {
    type: utilsTruckAccType()
  },
  rechargeRecord: {
    utilsCheck: utilsOrderStatus(),
    rechargeType: utilsRechargeType()
  },
  inventoryManager: {
    utilsAccountType: utilsAccountType()
  },
  orderManager: {
    orderStatus: utilsOrderStatus()
  }
}

export default select
