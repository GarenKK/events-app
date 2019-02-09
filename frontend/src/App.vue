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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .router-view {
    flex: 1;
  }
</style>
