<template>
  <div
    id="my-events">
    <EventList
      v-if="userEvents.length"
      listTitle="My Events"
      :listItems="userEvents"/>
  </div>
</template>

<script>
  import EventList from '@/components/eventList'

  export default {
    components: {
      EventList
    },
    mounted () {
      this.$store.dispatch('GET_USER_EVENTS')
    },
    computed: {
      userEvents () {
        return this.$store.getters.getUserEvents
      }
    },
    destroyed () {
      this.$store.commit('SET_USER_EVENTS', [])
    }
  }
</script>

<style scoped>
</style>
