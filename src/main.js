import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/dayjs'
// 引入vant组件库
import Vant from 'vant'
// 引入vant样式
import 'vant/lib/index.css'
// 全局注册vant中的组件

import '@/styles/index.less'
// 自动设置rem基准值，HTML默认标签大小
import 'amfe-flexible'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
