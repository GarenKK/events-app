<template>
  <div id="app">
    <Header/>
    <router-view
      class="router-view"/>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>
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
