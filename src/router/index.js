import Vue from 'vue'
import Layout from '@/views/layout/Layout'
import { getLocalStorage } from '@/utils/storage'
import VueRouter from 'vue-router'
import driver from './driver.js'
import Cashier from './cashier.js'
import Carrier from './carrier.js'
import Filler from './filler.js'
import Policy from './policy.js'
import User from './user.js'
import Mine from './mine.js'
import Business from './business.js'
import Component from './component.js'
Vue.use(VueRouter)

const _import = require('./_import_' + process.env.NODE_ENV)

const routes = [
  {
    path: '/',
    name: 'login',
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
      { path: 'index', component: _import('home/index'), name: 'home', meta: { title: '首页', icon: 'icon-gongnengguanli', noCache: false } }
    ]
  }
]

const router = new VueRouter({
  routes: [...routes, ...Mine, ...User, ...Business, ...driver, ...Cashier, ...Carrier, ...Filler, ...Policy, ...Component]
})
router.beforeEach((to, from, next) => {
  const woptoken = getLocalStorage('woptoken')

  if (to.meta.title) { // 每页增加title
    document.title = to.meta.title
  }
  if (woptoken) {
    if (to.name === 'main') return next('/' + getLocalStorage('woprole'))
    return next()
  }
  if (to.name === 'login' || to.name === 'agreement') return next()
  return next('/login')
})

export default router
