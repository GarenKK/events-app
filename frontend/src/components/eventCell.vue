<template>
  <div
    class="event-cell"
    @click="eventCellClicked()">
    <div
      class="image-container">
      <img
        class="image"
        :src="imageUrl(imageId)">
    </div>
    <div
      class="title">{{ title }}</div>
  </div>
</template>

<script>
  export default {
    name: 'EventCell',
    props: [
      'eventId',
      'eventTitle',
      'eventImageId'
    ],
    data () {
      return {
        id: '',
        title: 'Event cell Title',
        imageId: ''
      }
    },
    created () {
      this.id = this.eventId ? this.eventId : this.id
      this.title = this.eventTitle ? this.eventTitle : this.title
      this.imageId = this.eventImageId ? this.eventImageId : this.imageId
    },
    methods: {
      imageUrl: function (name) {
        return this.$store.getters.getImageUrl(name)
      },
      eventCellClicked: function () {
        this.$router.push({
          // replace this.title with the event ID
          path: `/event-info/${this.id}`
        })
      }
    }
  }
</script>

<style scoped>
  .event-cell {
    display: inline-block;
    width: 15rem;
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
    height: 15rem;
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
