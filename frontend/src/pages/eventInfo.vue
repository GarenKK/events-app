<template>
  <div
    id="event-info">
    <div
      class="metadata">
      <div
        class="image-container">
        <img
          class="image"
          :src="eventImageSrc">
      </div>
      <div
        class="text-container">
        <div>Title: {{ title }}</div>
        <div>Type: {{ type }}</div>
        <div>Date: {{ date }}</div>
        <div>Description: {{ description }}</div>
      </div>
    </div>
    <div
      class="separator"/>
    <div
      class="participants">
      <div
        class="participants-title">&#8594; Participating Users</div>
      <div
        class="list">
        <div
          class="participant"
          v-for="(p, i) in participants"
          :key="i">{{ p.username }}</div>
      </div>
    </div>
    <div
      class="action-btn"
      @click="actionBtnClicked()">{{ owner ? 'Edit' : 'Register' }}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        owner: true,
        title: '---',
        type: '---',
        date: '---',
        description: '---',
        imageSrc: '',
        participants: []
      }
    },
    methods: {
      actionBtnClicked: function() {
        const id = this.$route.params.id
        if (this.owner) {
          this.$router.push({
            path: `/event-creator/${id}`
          })
        } else {
          // write register code here
        }
      }
    },
    created () {
      this.$store.dispatch('GET_EVENT', this.$route.params.id)
    },
    computed: {
      eventInfo () {
        return this.$store.getters.getEvent
      },
      user () {
        return this.$store.getters.getUser
      }
    },
    watch: {
      eventInfo: function () {
        const info = this.eventInfo
        
        this.owner = info.owner === this.user._id

        this.title = info.title ? info.title : this.title
        this.type = info.event_type ? info.event_type : this.type
        this.date = info.date ? this.dateFormatter(info.date) : this.date
        this.description = info.description ? info.description : this.description
        this.participants = info.participants ? info.participants : this.participants
      }
    }
  }
</script>

<style scoped>
  .image-container {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 16rem;
    background-color: gray;
  }

  .image {
    width: 100%;
  }

  .text-container {
    font-size: 1.25rem;
  }

  .text-container > div {
    line-height: 2rem;
    word-spacing: 0.3rem;
    margin-top: 1rem;
  }

  .separator {
    margin: 2rem 0rem;
    height: 2px;
    background-color: gray;
  }

  .participants-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .participant {
    padding: 0.5rem;
    font-size: 1.25rem;
  }

  .list {
    display: inline-block;
  }

  .participant {
    cursor: pointer;
    transition: all 0.3s;
  }

  .participant:hover {
    background-color: gray;
    color: black;
  }

  .action-btn {
    padding: 0.75rem;
    margin: auto;
    margin-top: 3rem;
    border-radius: 3px;
    text-align: center;
    font-size: 1.25rem;
    color: black;
    background-color: cyan;
    cursor: pointer;
    transition: all 0.3s;
  }

  .action-btn:hover {
    background-color: lightblue;
  }

  @media screen and (min-width: 580px) {
    .image-container {
      height: 24rem;
    }
  }

  @media screen and (min-width: 960px) {
    .metadata {
      display: flex;
      flex-direction: row;  
    }

    .image-container {
      width: 32rem;
    }

    .text-container {
      max-width: 40%;
      padding-left: 1.25rem;
    }

    .separator {
      margin: 3rem 0rem;
    }

    .action-btn {
      width: 40%;
    }
  }
</style>
