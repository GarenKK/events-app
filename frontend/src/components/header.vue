<template>
  <div
    class="header">
    <router-link
      class="logo"
      to="/">
      <div class="logo-inner">
        <img
          src="@/assets/logo.png"
          class="logo-img">
        EVENTS
      </div>
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
        showProfileOptions: false
      }
    },
    computed: {
      profileName () {
        let name = this.$store.getters.getUser.username
        if (name) {
          return name
        }
        return 'My Profile'
      }
    },
    methods: {
      profileBtnMouseover () {
        this.showProfileOptions = true
      },
      profileBtnMouseleave () {
        this.showProfileOptions = false
      },
      profileBtnClick () {
        this.showProfileOptions = !this.showProfileOptions
      },
      myEventsClicked () {
        this.$router.push({
          path: '/my-events'
        })
      },
      createEventClicked () {
        this.$router.push({
          path: '/event-creator'
        })
      },
      logoutClicked () {
        this.$store.dispatch("LOGOUT")
        this.$session.remove("token")
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
    font-size: 1.5rem;
    color: white;
  }

  .logo-inner {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo-img {
    height: 2.3rem;
    width: 2.3rem;
    margin: 10px;
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
