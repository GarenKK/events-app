<template>
  <div id="app">
    <Header/>
    <router-view
      v-if="loginState"
      class="router-view"/>
    <LoginModal
      v-if="!loginState"/>
  </div>
</template>

<script>
import Header from '@/components/header'
import LoginModal from '@/components/loginModal'

export default {
  name: 'app',
  components: {
    Header,
    LoginModal
  },
  computed: {
    userToken () {
      return this.$store.getters.getToken
    },
    loginState () {
      return Object.keys(this.$store.getters.getUser).length > 0
    }
  },
  watch: {
    userToken (newValue) {
      if (newValue.length > 0) {
        this.$session.set('token', newValue)
      }
    }
  },
  beforeCreate: function () {
    if (this.$session.exists() && this.$session.has("token")) {
      this.$store.dispatch("LOGIN", {token: this.$session.get("token")})
    } else {
      this.$session.start()
    }
  },
}
</script>

<style scoped>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    max-width: 100rem;
    margin: auto;
    padding: 0rem 2rem;
  }

  .router-view {
    flex: 1;
    padding: 3rem 0rem;
  }
</style>
