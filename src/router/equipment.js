import Layout from '@/views/layout/Layout'
const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

export default [
  {
    path: '/equipment',
    name: 'equipment',
    component: Layout,
    redirect: '/equipment/gasTankEquipment',
    meta: { title: '智能装备管理' },
    children: [
      { path: 'gasTankEquipment', component: inImport('equipment/gasTankEquipment'), name: 'gasTankEquipment', meta: { title: '车载LNG气瓶管理', icon: 'icon-gongnengguanli', noCache: false } },
      { path: 'gasLevelEquipment', component: inImport('equipment/gasLevelEquipment'), name: 'gasLevelEquipment', meta: { title: '智能液位计管理', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]
