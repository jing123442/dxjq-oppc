import Vue from 'vue'
import { getLocalStorage } from '@/utils/storage'
import VueRouter from 'vue-router'
import driver from './driver.js'
import Cashier from './cashier.js'
import Carrier from './carrier.js'
import Filler from './filler.js'
import Component from './component.js'
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'main' },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('@/views/main/login')
  },
  {
    path: '/agreement',
    name: 'agreement',
    meta: { title: '服务协议' },
    component: () => import('@/views/main/agreement')
  },
  {
    path: '/wxpay',
    name: 'wxpay',
    meta: { title: '微信支付' },
    component: () => import('@/views/main/wxpay')
  }
]

const router = new VueRouter({
  routes: [...routes, ...driver, ...Cashier, ...Carrier, ...Filler, ...Component]
})
router.beforeEach((to, from, next) => {
  const mwxtoken = getLocalStorage('mwxtoken')

  if (to.meta.title) { // 每页增加title
    document.title = to.meta.title
  }
  if (mwxtoken) {
    if (to.name === 'main') return next('/' + getLocalStorage('mwxrole'))
    return next()
  }
  if (to.name === 'login' || to.name === 'agreement') return next()
  return next('/login')
})

export default router
