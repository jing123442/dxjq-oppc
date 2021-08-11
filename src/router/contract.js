import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/contract',
    name: 'contract',
    component: Layout,
    redirect: '/contract/contractValid',
    meta: { title: '合同中心' },
    children: [
      { path: 'contractValid', component: inImport('contract/contractValid'), name: 'contractValid', meta: { title: '签约确认', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'contractSign', component: inImport('contract/contractSign'), name: 'contractSign', meta: { title: '合同签约', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'contractTemplate', component: inImport('contract/contractTemplate'), name: 'contractTemplateSetting', meta: { title: '模板管理', icon: 'icon-gongnengguanli', noCache: false } },
      {
        path: 'contractTemplate',
        name: 'contractTemplate',
        redirect: '/contract/contractTemplate',
        component: {
          render (c) { return c('router-view') }
        },
        hidden: true,
        meta: { title: '模板管理', icon: 'icon-gongnengguanli', noCache: false },
        children: [
          { path: 'templateSetting', component: inImport('contract/sub/templateSetting'), name: 'templateSetting', meta: { title: '模板设置', noCache: false } }
        ]
      },
      { path: 'contractSeal', component: inImport('contract/contractSeal'), name: 'contractSeal', meta: { title: '印章管理', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
