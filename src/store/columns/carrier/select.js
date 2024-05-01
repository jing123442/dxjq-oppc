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
  utilsContractStatus,
  utilsTruckAccType, utilsRechargeType,
  utilsTradeModeType
} from '@/utils/select'
import { regionData } from 'element-china-area-data'

const select = {
  logistics: {
    orgId: utilsDyOrgList(2),
    status: utilsStatus(),
    authStatus: utilsAuthStatus(),
    contractStatus: utilsContractStatus(),
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
    comPayType: utilsComPayType(),
    tradeType: utilsTradeModeType()
  },
  truckAccount: {
    type: utilsTruckAccType()
  },
  rechargeRecord: {
    utilsCheck: utilsOrderStatus(),
    rechargeType: utilsRechargeType(),
    tradeType: utilsTradeModeType()
  },
  inventoryManager: {
    utilsAccountType: utilsAccountType()
  },
  orderManager: {
    orderStatus: utilsOrderStatus()
  },
  orgAccountWarn: {
  }
}

export default select
