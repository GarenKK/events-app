import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const URI = {
  base: "http://localhost:8080",
  login: "/login",
  user_events: "/user/events",
  join_event: "/user/join",
  create_event: "/user/create",
  edit_event: "/user/",
  delete_event: "/user/",
  all_events: "/events/all",
  event: "/events/"
}

const store = new Vuex.Store({
  state: {
    token: "",
    user: {},
    user_events: [],
    all_events: [],
    event: {},
    login_state: ""// loading, success, fail, 
  },
  mutations: {
    SET_USER (state, data) {
      state.user = data
    },
    SET_TOKEN (state, data) {
      state.token = data
    },
    SET_USER_EVENTS (state, data) {
      state.user_events = data
    },
    SET_ALL_EVENTS (state, data) {
      state.all_events = data
    },
    SET_EVENT (state, data) {
      state.event = data
    },
    SET_LOGIN_STATE (state, data) {
      state.login_state = data
    }
  },
  actions: {
    async LOGIN (context, params) {
      if (!params || !params.username || !params.password) {
        context.commit('SET_LOGIN_STATE', "empty")
        return
      }
      context.commit('SET_LOGIN_STATE', "loading")
      let response = await axios.post(URI.base + URI.login, params)
      try {
        if (response.data.error || !response.data.user || !response.data.token) {
          console.log(response)
          context.commit('SET_LOGIN_STATE', "fail")
        } else {
          context.commit('SET_USER', response.data.user)
          context.commit('SET_TOKEN', response.data.token)
          context.commit('SET_LOGIN_STATE', "success")
        }
      } catch (error) {
        context.commit('SET_LOGIN_STATE', "fail")
      }
    },
    LOGOUT (context) {
      context.commit('SET_USER', {})
      context.commit('SET_TOKEN', "")
    },
    async GET_USER_EVENTS (context) {
      let events = []
      let config = {
        headers: {
          "Authorization": context.state.token
        }
      }
      let response = await axios.get(URI.base + URI.user_events, config)
      try {
        if (response.error || !response.rows) {
          console.log(response.error)
        } else {
          events = response.rows.map(function (row) {
            return row.doc
          })
        }
      } catch (error) {
        console.log(error)
      }
      context.commit('SET_USER_EVENTS', events)
    },
    async JOIN_EVENT (context, id) {
      let config = {
        headers: {
          "Authorization": context.state.token
        }
      }
      let response = await axios.post(URI.base + URI.join_event, {event_id: id}, config)
      try {
        if (response.error) {
          console.log(response.error)
        } else {
          console.log(response)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async CREATE_EVENT (context, doc) {
      let config = {
        headers: {
          "Authorization": context.state.token
        }
      }
      let response = await axios.put(URI.base + URI.create_event, {doc}, config)
      try {
        if (response.error) {
          console.log(response.error)
        } else {
          console.log(response)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async EDIT_EVENT (context, doc) {
      let config = {
        headers: {
          "Authorization": context.state.token
        }
      }
      let response = await axios.put(URI.base + URI.edit_event + doc._id, {doc}, config)
      try {
        if (response.error) {
          console.log(response.error)
        } else {
          console.log(response)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async DELETE_EVENT (context, id) {
      let config = {
        headers: {
          "Authorization": context.state.token
        }
      }
      let response = await axios.delete(URI.base + URI.delete_event + id, config)
      try {
        if (response.error) {
          console.log(response.error)
        } else {
          console.log(response)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async GET_ALL_EVENTS (context) {
      let events = []
      let config = {
        headers: {
          "Authorization": context.state.token
        }
      }
      let response = await axios.get(URI.base + URI.all_events, config)
      try {
        if (response.error || !response.rows) {
          console.log(response.error)
        } else {
          events = response.rows.map(function (row) {
            return row.doc
          })
        }
      } catch (error) {
        console.log(error)
      }
      context.commit('SET_USER_EVENTS', events)
    },
    async GET_EVENT (context, id) {
      let event = {}
      let config = {
        headers: {
          "Authorization": context.state.token
        }
      }
      let response = await axios.get(URI.base + URI.event + id, config)
      try {
        if (response.error || response.type != "event") {
          console.log(response.error)
        } else {
          event = response
        }
      } catch (error) {
        console.log(error)
      }
      context.commit('SET_EVENT', event)
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getUserEvents (state) {
      return state.user_events
    },
    getAllEvents (state) {
      return state.all_events
    },
    getEvent (state) {
      return state.event
    },
    getLoginState (state) {
      return state.login_state
    }
  }
})

export default store
