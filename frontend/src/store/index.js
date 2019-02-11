import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueSession from 'vue-session'

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
    login_state: "",
    create_event_state: "" 
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
    },
    SET_CREATE_EVENT_STATE (state, data) {
      state.create_event_state = data
    }
  },
  actions: {
    async LOGIN (context, params) {
      context.commit('SET_LOGIN_STATE', "Loading...")
      let config
      if (params && params.token) {
        config = {
          headers: {
            "Authorization": params.token
          }
        }
        params = {}
      } else if (params && params.username && params.password) {
        config = {}
      } else {
        context.commit('SET_LOGIN_STATE', "Please enter your username and password")
        return
      }
      let response = await axios.post(URI.base + URI.login, params, config)
      try {
        if (response.data.error || !response.data.user || !response.data.token) {
          context.commit('SET_LOGIN_STATE', "An error has occured please try again")
        } else {
          context.commit('SET_USER', response.data.user)
          context.commit('SET_TOKEN', response.data.token)
          context.commit('SET_LOGIN_STATE', "Success!")
        }
      } catch (error) {
        context.commit('SET_LOGIN_STATE', "Please enter a correct username and password")
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
        if (response.data.error || !response.data.rows) {
          console.log(response.data.error)
        } else {
          events = response.data.rows.map(function (row) {
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
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async CREATE_EVENT (context, doc) {
      if (!doc || !doc.title || !doc.event_type || !doc.date || !doc.description) {
        context.commit('SET_CREATE_EVENT_STATE', "Please complete all the empty fields")
        return
      }

      let config = {
        headers: {
          "Authorization": context.state.token
        }
      }

      let response = await axios.put(URI.base + URI.create_event, {doc}, config)
      .catch(error => {
        context.commit('SET_CREATE_EVENT_STATE', "An error has occured please try again")
      })
      try {
        if (response.data.error) {
          context.commit('SET_CREATE_EVENT_STATE', "An error has occured please try again")
        } else {
          context.commit('SET_CREATE_EVENT_STATE', "Success")
        }
      } catch (error) {
        context.commit('SET_CREATE_EVENT_STATE', "An error has occured please try again")
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
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          console.log(response.data)
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
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async GET_ALL_EVENTS (context) {
      let events = []
      let by_type = []
      let key
      let config = {
        headers: {
          "Authorization": context.state.token
        }
      }
      let response = await axios.get(URI.base + URI.all_events, config)
      try {
        if (response.data.error || !response.data.rows) {
          console.log(response.data.error)
        } else {
          for (key in response.data.rows) {
            if (
              response.data.rows.hasOwnProperty(key)
              && by_type.length != 0
              && by_type[0].event_type != response.data.rows[key].doc.event_type
            ) {
              events.push({title: by_type[0].event_type, events: by_type.slice()})
              by_type = []
            }
            by_type.push(response.data.rows[key].doc)
          }
          events.push({title: by_type[0].event_type, events: by_type.slice()})
        }
      } catch (error) {
        console.log(error)
      }
      context.commit('SET_ALL_EVENTS', events)
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
        if (response.data.error || response.data.type != "event") {
          console.log(response.data.error)
        } else {
          event = response.data
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
    getToken (state) {
      return state.token
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
    },
    getCreateEventState (state) {
      return state.create_event_state
    }
  }
})

export default store
