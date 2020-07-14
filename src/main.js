import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import emElementUI from 'em-element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/index.scss' // global css
import moment from 'moment'
import 'moment/locale/zh-cn'
import * as filters from '@/utils/filters' // 过滤器
Vue.prototype.$moment = moment
Vue.use(ElementUI)
Vue.use(emElementUI)
Vue.config.productionTip = false

// 加载全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
