import { utilsRoleList } from '@/utils/select'
const select = {
  message: {
    roleList: utilsRoleList(),
    publishType: [
      { value: '', label: '选择发布方式' },
      { value: 1, label: '实时发布' },
      { value: 2, label: '定时发布' }
    ],
    searchPublishType: [
      { value: 1, label: '实时发布' },
      { value: 2, label: '定时发布' }
    ],
    publishStatus: [
      { value: 1, label: '编辑中' },
      { value: 2, label: '发布中' },
      { value: 3, label: '已发布' }
    ],
    currDateSearch: [{ value: 'createTime', label: '创建时间' }, { value: 'publishTime', label: '发布时间' }]
  }
}

export default select
