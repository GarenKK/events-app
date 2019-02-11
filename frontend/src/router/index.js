import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/home'
import EventInfo from '@/pages/eventInfo'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/event-info/:id',
      component: EventInfo
    }
  ]
})