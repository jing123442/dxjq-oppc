const select = {
  state: {
    op: {
      baseRole: [
        { value: 0, label: '其他' },
        { value: 1, label: '平台管理员' },
        { value: 2, label: '平台运营人员' },
        { value: 3, label: '加气企业管理者' },
        { value: 4, label: '收银员' },
        { value: 5, label: '物流公司管理者' },
        { value: 6, label: '司机' }
      ],
      status: [
        { value: 0, label: '启用' },
        { value: 1, label: '停用' }
      ],
      orgId: {
        url: '/user/org/list',
        node: ['data', 'records'],
        keyVal: {
          value: 'orgId',
          label: 'orgName'
        },
        params: Function
      }
    }
  }
}

export default select
