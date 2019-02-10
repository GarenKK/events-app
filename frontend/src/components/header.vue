<template>
  <div
    class="header">
    <router-link
      class="logo"
      to="/">
      <div>EVENTS</div>
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
    height: 4rem;
  }

  .logo {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: white;
  }
</style>
