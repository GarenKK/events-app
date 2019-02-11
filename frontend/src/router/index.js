import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/home'
import EventInfo from '@/pages/eventInfo'
import EventCreator from '@/pages/eventCreator'
import MyEvents from '@/pages/myEvents'

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
    },
    {
      path: '/event-creator/:id?',
      component: EventCreator
    },
    {
      path: '/my-events',
      component: MyEvents
    }
  ]
})