<template>
  <div
    class="event-cell">
    <div
      class="image-container">
      <img
        class="image"
        :src="eventImageSrc">
    </div>
    <div
      class="title">{{ title }}</div>
  </div>
</template>

<script>
  export default {
    name: 'EventCell',
    props: [
      'eventTitle',
      'eventImageSrc'
    ],
    data () {
      return {
        title: 'Event cell Title'
      }
    },
    created () {
      this.title = this.eventTitle ? this.eventTitle : this.title
    }
  }
</script>

<style scoped>
  .event-cell {
    display: inline-block;
    width: 20rem;
    cursor: pointer;
    transition: all 0.3s;
  }

  .event-cell:hover {
    transform: translateY(-3%);
    background-color: rgba(255, 255, 255, 0.1);
  }

  .image-container {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 17rem;
    background-color: gray;
  }

  .image {
    width: 100%;
  }

  .title {
    padding: 0.5rem 0.5rem 0rem 0.5rem;
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
