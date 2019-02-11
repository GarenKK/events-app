import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ready: false
  },
  mutations: {
    SET_READY (state, data) {
      state.ready = data
    }
  },
  actions: {
    MODIFY_READY (context) {
      context.commit('SET_READY', !context.getters.getReady)
    }
  },
  getters: {
    getReady (state) {
      return state.ready
    }
  }
})

export default store
