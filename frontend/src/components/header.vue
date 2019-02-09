<template>
  <div
    class="header">
    <router-link
      to="/">
      <div
        class="logo">
        EVENTS
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: center;
    height: 3rem;
  }

  .logo {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: black;
  }
</style>
