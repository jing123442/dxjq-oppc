import { utilsControlType, utilsFundType, utilsFundTypeDs } from '@/utils/select'

const select = {
  detail: {},
  fund: {
    fundType: utilsFundType(),
    fundTypeDs: utilsFundTypeDs()
  },
  control: {
    controlType: utilsControlType()
  },
  profit: {},
}

export default select
