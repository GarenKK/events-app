<template>
  <div
    id="home">
    <div
      class="text">{{ text }}</div>
  </div>
</template>

<script>
  import EventList from '@/components/eventList'
  import texts from '@/texts'

  export default {
    components: {
      EventList
    },
    data () {
      return {
        text: texts.home
      }
    }
  }
</script>

<style scoped>
  .text {
    padding: 3rem 1rem;
    font-size: 1.8rem;
  }
</style>
