const app = {
  mode: {
    orgInfo: [
      { ou: 1, name: '机构代码信息', status: 3 },
      { ou: 2, name: '企业基本信息', status: 3 },
      { ou: 3, name: '管理员信息', status: 3 },
      { ou: 4, name: '企业认证', status: 3 }
    ],
    intention: [
      { ou: 0, name: '用户信息', status: 3 },
      { ou: 1, name: '实名认证', status: 3, btn: { type: 's', name: '查看清晰图片' } }
    ]
  },
  list: {}
}

export default app
