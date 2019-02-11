import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
