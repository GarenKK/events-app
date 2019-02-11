import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.config.productionTip = false

Vue.mixin({
  methods: {
    dateFormatter: function (epoch) {
      const date = new Date(epoch)
      const intToMonth = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      }

      return date.getDate() + ' ' + intToMonth[date.getMonth()] + ' ' + date.getFullYear()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
