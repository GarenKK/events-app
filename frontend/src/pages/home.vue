<template>
  <div
    id="home">
    <div
      class="text">{{ text }}</div>
    <EventList
      v-for="list in allEvents"
      :listTitle="list.title"
      :listItems="list.events"/>
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
    },
    computed: {
      user () {
        return this.$store.getters.getUser
      },
      allEvents () {
        console.log(this.$store.getters.getAllEvents)
        return this.$store.getters.getAllEvents
      }
    },
    watch: {
      user (newValue) {
        if (Object.keys(newValue).length > 0) {
          this.$store.dispatch("GET_ALL_EVENTS")
        }
      }
    },
    mounted () {
      this.$store.dispatch("GET_ALL_EVENTS")
    }
  }
</script>

<style scoped>
  .text {
    padding-bottom: 3rem;
    font-size: 1.8rem;
  }
</style>
