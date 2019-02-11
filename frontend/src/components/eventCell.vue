<template>
  <div
    class="event-cell"
    @click="eventCellClicked()">
    <div
      class="image-container">
      <img
        class="image"
        :src="imageSrc">
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
        title: 'Event cell Title',
        imageSrc: ''
      }
    },
    created () {
      this.title = this.eventTitle ? this.eventTitle : this.title
      this.imageSrc = this.eventImageSrc ? this.eventImageSrc : this.imageSrc
    },
    methods: {
      eventCellClicked: function () {
        this.$router.push({
          // replace this.title with the event ID
          path: `/event-info/${this.title}`
        })
      }
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
