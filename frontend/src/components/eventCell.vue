<template>
  <div
    class="event-cell">
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
        title: 'Event Title',
        imageSrc: 'wow.jpg'
      }
    },
    methods: {
      imagePath: function (src) {
        // only useful when obtaining images from assets folder and dynamically binding to img src
        return require('@/assets/' + src)
      }
    },
    created () {
      this.title = this.eventTitle ? this.eventTitle : this.title
      this.imageSrc = this.eventImageSrc ? this.eventImageSrc : this.imagePath(this.imageSrc)
    }
  }
</script>

<style scoped>
  .event-cell {
    display: inline-block;
    width: 20rem;
    cursor: pointer;
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
    font-size: 1.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
