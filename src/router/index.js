import Vue from 'vue'
import Layout from '@/views/layout/Layout'
import { getSessionStorage } from '@/utils/storage'
import VueRouter from 'vue-router'
import Carrier from './carrier.js'
import Filler from './filler.js'
import Price from './price.js'
import Settlement from './settlement.js'
import User from './user.js'
import Mine from './mine.js'
import Business from './business.js'
import Setting from './setting.js'
import Message from './message.js'
import Order from './order.js'
import Authority from './authority.js'
import Stock from './stock.js'
import Cockpit from './cockpit'
import PointsMall from './pointsMall'
import Voucher from './voucher'
import Contract from './contract'
import Equipment from './equipment'
import Checkup from './checkup'
import LngTradeMode from './lngTradeMode'
Vue.use(VueRouter)

const inImport = process.env.NODE_ENV == 'production' ? require('./_product') : require('./_development')

const routes = [
  {
    path: '/',
    meta: { title: '登录' },
    component: () => import('@/views/main/login')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('@/views/main/login')
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: '/home/index',
    meta: { noCache: false, title: '首页', icon: 'icon-gongnengguanli' },
    children: [
      { path: 'index', component: inImport('home/index'), meta: { title: '首页', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  },
  {
    path: '/download',
    name: 'downloadName',
    component: Layout,
    meta: { title: '下载中心', noCache: false },
    children: [
      { path: 'downloadIndex', component: inImport('download/index'), meta: { title: '下载中心', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]

const router = new VueRouter({
  routes: [...routes, ...Mine, ...User, ...Business, ...Carrier, ...Filler, ...Price, ...Settlement, ...Setting, ...Order, ...Message, ...Authority, ...Stock, ...Cockpit, ...PointsMall, ...Voucher, ...Contract, ...Equipment, ...Checkup, ...LngTradeMode]
})
router.beforeEach((to, from, next) => {
  const woptoken = getSessionStorage('woptoken')

  if (to.meta.title) { // 每页增加title
    document.title = to.meta.title
  }
  if (woptoken) {
    if (to.name === 'main') return next('/' + getSessionStorage('woprole'))
    return next()
  }
  if (to.name === 'login' || to.name === 'agreement') return next()
  return next('/login')
})

export default router
