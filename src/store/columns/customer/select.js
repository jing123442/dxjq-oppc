import { utilsQAClientList } from '@/utils/select'

const select = {
  customer: {
    clientList: utilsQAClientList()
  },
  type: {
    status: [
      { value: 1, label: '启用', style: 'color: #00c48c;' },
      { value: 2, label: '停用', style: 'color: #ff647c;' }
    ]
  }
}

export default select
