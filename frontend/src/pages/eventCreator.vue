<template>
  <div
    id="event-creator">
    <div
      class="title">&#8594 Title</div>
    <input>
    <div
      class="title">&#8594 Type</div>
    <input>
    <div
      class="title">&#8594 Date</div>
    <input>
    <div
      class="title">&#8594 Description</div>
    <textarea
      placeholder="Description.."/>
    <div
      class="title">&#8594 Image</div>
    <img
      v-for="i in 15"
      class="image"
      :class="{ 'selected': i === selectedImage }"
      @click="imageClicked(i)">
    <div
      class="action-btn">{{ mode === 'create' ? 'Create' : 'Save' }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedImage: null,
        mode: 'create' // values: create, edit
      }
    },
    methods: {
      imageClicked: function(i) {
        this.selectedImage = i
      }
    },
    mounted() {
      if (this.$route.params.id) {
        this.mode = 'edit'
      }
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
