<template>
  <div
    id="my-events">
    <EventList
      listTitle="My Events"/>
  </div>
</template>

<script>
  import EventList from '@/components/eventList'

  export default {
    components: {
      EventList
    }
  }
</script>

<style scoped>
</style>
