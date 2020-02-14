import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import * as directives from '@/directives/directives';
// import { DirectiveOptions } from 'vue/types/umd';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// // 注册全局指令
// Object.keys(directives).forEach(key => {
//   // Vue.directive(key, (directives as {[key: String]: DirectiveOptions})[key])
//   Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
// })