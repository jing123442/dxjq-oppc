import { utilsTruckList } from '@/utils/select'
const select = {
  gasTankEquipment: {
    isUsed: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
    truckList: utilsTruckList()
  },
  gasLevelEquipment: {
    isUsed: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
    cooperationType: [{ value: '0', label: '云端转发' }, { value: '1', label: '硬件直传' }],
    truckList: utilsTruckList()
  }
}

export default select
