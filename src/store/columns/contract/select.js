import { utilsUserListBySeal, utilsSource, utilsContractSignStatus, utilsContractType, utilsPlateformOrgList } from '@/utils/select'

const select = {
  contractValid: {
    contractStatus: utilsContractSignStatus(),
    contractType: utilsContractType()
  },
  contractTemplate: {
    contractType: utilsContractType(),
    plateformOrgList: utilsPlateformOrgList(),
    partyaType: [
      { value: 1, label: '加气站' },
      { value: 2, label: '物流客户（物流公司或个人车主）' }
    ],
    status: [
      { value: 0, label: '已启用' },
      { value: 1, label: '已停用' }
    ]
  },
  orgSealList: {
    fromList: utilsSource(),
    userList: utilsUserListBySeal(),
  }
}

export default select
