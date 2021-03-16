import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import emElementUI from 'em-element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/font/font.css'
import '@/assets/styles/index.scss' // global css
import * as filters from '@/utils/filters' // 过滤器
import { setSessionStorage, removeSessionStorage, getSessionStorage, clearSessionStorage } from '@/utils/storage'

Vue.use(ElementUI)
Vue.use(emElementUI)
Vue.config.productionTip = false

// 注册全局函数
Vue.prototype.$setSessionStorage = setSessionStorage
Vue.prototype.$getSessionStorage = getSessionStorage
Vue.prototype.$clearSessionStorage = clearSessionStorage
Vue.prototype.$removeSessionStorage = removeSessionStorage

// 加载全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
