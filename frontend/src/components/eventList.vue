<template>
  <div
    class="event-list">
    <div
      class="title">&#8594 {{ title }}</div>
    <div
      class="list">
      <EventCell
        class="cell"
        v-for="item in items"
        :eventId="item._id"
        :eventTitle="item.title"
        :eventImageId="item.image_id"/>
    </div>
  </div>
</template>

<script>
  import EventCell from '@/components/eventCell'

  export default {
    name: 'EventList',
    props: [
      'listTitle',
      'listItems'
    ],
    components: {
      EventCell
    },
    data () {
      return {
        title: 'Event list Title',
        items: []
      }
    },
    created () {
      this.title = this.listTitle ? this.listTitle : this.title
      this.items = this.listItems ? this.listItems : this.items
    }
  }
</script>

<style scoped>
  .event-list {
    --cell-padding-size: 0.9rem;
  }

  .title {
    font-size: 1.5rem;
    padding-left: var(--cell-padding-size);
  }

  .list {
    margin-top: var(--cell-padding-size);
  }

  .cell {
    padding: var(--cell-padding-size);
  }
</style>
