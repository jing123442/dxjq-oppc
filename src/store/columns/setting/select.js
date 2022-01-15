import { utilsDistrictUserList } from '@/utils/select'
const select = {
  district: {
    userList: utilsDistrictUserList(),
  },
  withdrawLimitConfig: {
    limitStatus: [
      { value: 0, label: '不限制' },
      { value: 1, label: '限制' }
    ]
  },
  withdrawCheck: {
    payStatus: [
      { value: 1, label: '待提现' },
      { value: 2, label: '提现中' },
      { value: 3, label: '提现成果' },
      { value: 4, label: '提现失败' },
    ]
  },
  checkLogList: {
    checkResult: [
      { value: 1, label: '通过' },
      { value: 5, label: '不通过' }
    ]
  },
  checkHistoryList: {
    checkResult: [
      { value: 1, label: '通过' },
      { value: 5, label: '不通过' }
    ]
  }
}

export default select
