<template>
  <div
    id="event-creator">
    <div
      class="title">&#8594; Title</div>
    <input
      v-model="title">
    <div
      class="title">&#8594; Type</div>
    <input
      v-model="type">
    <div
      class="title">&#8594; Date</div>
    <datepicker
      calendar-class="calendar"
      input-class="datepicker-input"
      v-model="date"
      :disabledDates="disabledDates"/>
    <div
      class="title">&#8594; Description</div>
    <textarea
      placeholder="Description.."
      v-model="description"/>
    <div
      class="title">&#8594; Image</div>
    <img
      v-for="i in staticNames"
      :key="i"
      class="image"
      :class="{ 'selected': i === selectedImage }"
      :src="imageUrl(i)"
      @click="imageClicked(i)">
    <div
      :style="{ opacity: eventState ? 1 : 0 }"
      class="status">{{ eventState ? eventState : '---' }}</div>
    <div
      class="action-btn"
      @click="actionBtnClicked()">{{ mode === 'create' ? 'Create' : 'Save' }}</div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'

  export default {
    components: {
      Datepicker
    },
    data() {
      return {
        docId: null,
        docRev: null,
        title: '',
        type: '',
        date: '',
        description: '',
        mode: 'create', // values: create, edit
        selectedImage: null,
        disabledDates: null
      }
    },
    methods: {
      imageClicked: function(i) {
        this.selectedImage = i
      },
      imageUrl: function (name) {
        return this.$store.getters.getImageUrl(name)
      },
      actionBtnClicked: function() {
        if (this.mode === 'create') {
          this.$store.dispatch('CREATE_EVENT', {
            title: this.title,
            event_type: this.type,
            date: this.date && typeof this.date === "object" ? this.date.getTime() : this.date,
            description: this.description,
            image_id: this.selectedImage
          })
        } else {
          this.$store.dispatch('EDIT_EVENT', {
            _id: this.docId,
            _rev: this.docRev,
            title: this.title,
            event_type: this.type,
            date: this.date && typeof this.date === "object" ? this.date.getTime() : this.date,
            description: this.description,
            image_id: this.selectedImage
          })
        }
      }
    },
    created () {
      if (this.$route.params.id) {
        this.mode = 'edit'
        this.$store.dispatch('GET_EVENT', this.$route.params.id)
      }

      this.disabledDates = {
        to: new Date()
      }

      this.$store.dispatch('GET_STATIC')
    },
    computed: {
      eventInfo () {
        return this.$store.getters.getEvent
      },
      eventState () {
        return this.$store.getters.getEventState
      },
      staticNames () {
        return this.$store.getters.getStatic
      }
    },
    watch: {
      eventInfo: function () {
        const info = this.eventInfo

        this.docId = info._id
        this.docRev = info._rev

        this.title = info.title ? info.title : this.title
        this.type = info.event_type ? info.event_type : this.type
        this.date = info.date ? info.date : this.date
        this.description = info.description ? info.description : this.description
        this.participants = info.participants ? info.participants : this.participants
        this.imageId = info.image_id ? info.image_id : this.imageId
        this.selectedImage = this.imageId
      },
      eventState () {
        if (this.eventState === 'Success') {
          this.$router.push({
            path: '/'
          })
        }
      }
    },
    destroyed () {
      this.$store.commit('SET_EVENT_STATE', '')
    }
  }
</script>

<style scoped>
  .title {
    font-size: 1.25rem;
    padding: 1rem 0rem;
  }

  input,
  textarea {
    padding: 0.5rem;
    width: 100%;
    border: 0;
    font-size: 1rem;
    box-sizing: border-box;
    background: rgb(222, 222, 222);
    outline: none;
  }

  textarea {
    height: 15rem;
    resize: none;
  }

  .image {
    width: 10rem;
    height: 8rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    background-color: gray;
    cursor: pointer;
    border: 3px solid white;
  }

  .image:hover {
    border: 3px solid transparent;
  }

  .image.selected {
    border: 3px solid green;
  }

  .status {
    margin-top: 1rem;
    font-weight: bold;
    text-align: center;
  }

  .action-btn {
    padding: 0.75rem;
    margin: auto;
    margin-top: 1rem;
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
    input {
      width: 50%;
    }
  }

  @media screen and (min-width: 960px) {
    input {
      width: 25%;
    }

    textarea {
      width: 60%;
    }

    .action-btn {
      width: 40%;
    }
  }
</style>

<style>
  .calendar {
    color: black;
  }

  .datepicker-input {
    padding: 0.5rem;
    width: 100%;
    border: 0;
    font-size: 1rem;
    box-sizing: border-box;
    background: rgb(222, 222, 222);
    outline: none;
  }

  @media screen and (min-width: 580px) {
    .datepicker-input {
      width: 50%;
    }
  }

  @media screen and (min-width: 960px) {
    .datepicker-input {
      width: 25%;
    }
  }
</style>
