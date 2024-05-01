import { utilsDistrictUserList } from '@/utils/select'
const select = {
  order: {
    orderStatus: [
      { value: 1, label: '已预约' },
      { value: 2, label: '已支付' },
      { value: 3, label: '已取消' }
    ],
    materialStatus: [
      { value: 0, label: '未签收' },
      { value: 1, label: '已签收' },
      { value: 2, label: '已返还' }
    ],
  }
}

export default select
