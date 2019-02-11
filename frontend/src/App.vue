<template>
  <div id="app">
    <Header/>
    <router-view
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
    loginState () {
      return Object.keys(this.$store.getters.getUser).length > 0
    }
  }
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
