<template>
  <div
    class="header">
    <router-link
      class="logo"
      to="/">
      <div>EVENTS</div>
    </router-link>
    <div
      class="profile-btn"
      @mouseover="profileBtnMouseover()"
      @mouseleave="profileBtnMouseleave()"
      @click="profileBtnClick()">
      <img
        class="profile-icon"
        src="@/assets/profile.svg">
      <span
        class="profile-name">{{ profileName }}</span>
      <div
        class="profile-options"
        v-show="showProfileOptions">
        <div
          class="arrow"/>
        <div
          class="option"
          @click="myEventsClicked()">My Events</div>
        <div
          class="option"
          @click="createEventClicked()">Create Event</div>
        <div
          class="option"
          @click="logoutClicked()">Logout</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        profileName: 'My Profile',
        showProfileOptions: false
      }
    },
    methods: {
      profileBtnMouseover: function () {
        this.showProfileOptions = true
      },
      profileBtnMouseleave: function () {
        this.showProfileOptions = false
      },
      profileBtnClick: function () {
        this.showProfileOptions = !this.showProfileOptions
      },
      myEventsClicked: function () {
        this.$router.push({
          path: '/my-events'
        })
      },
      createEventClicked: function () {
        this.$router.push({
          path: '/event-creator'
        })
      },
      logoutClicked: function () {
        this.$store.dispatch("LOGOUT")
      }
    }
  }
</script>

<style scoped>
  .header {
    position: relative;
    display: flex;
    height: 4rem;
  }

  .logo {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: white;
  }

  .profile-btn {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    font-size: 0;
    cursor: pointer;
  }

  .profile-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .profile-name {
    margin-left: 0.5rem;
    margin-top: 0.1rem;
    font-size: 1rem;
  }

  .profile-options {
    position: absolute;
    top: 100%;
    right: 0;
    width: 8rem;
    padding: 0.5rem 0rem;
    background-color: white;
  }

  .option {
    font-size: 1rem;
    color: black;
    padding: 0.5rem 1rem;
    transition: all 0.3s;
  }

  .option:hover {
    color: white;
    background-color: black;
  }

  .arrow {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-color: white transparent;
    border-style: solid;
    border-width: 0rem 0.5rem 0.5rem 0.5rem;
  }

  @media screen and (min-width: 580px) {
    .header {
      justify-content: center;
    }
  }
</style>
