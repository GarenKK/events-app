<template>
  <div
    class="modal">
    <div
      class="box">
      <div
        class="text">{{ text }}</div>
      <div
        class="input-title">Username</div>
      <input
        v-model="username"
        @keyup="inputKeyUp">
      <div
        class="input-title">Password</div>
      <input
        type="password"
        v-model="password"
        @keyup="inputKeyUp">
      <div
        :style="{ opacity: loginState ? 1 : 0 }"
        class="status">{{ loginState ? loginState : '---' }}</div>
      <div
        class="login-btn"
        @click="login()">Login</div>
    </div>
  </div>
</template>

<script>
  import texts from '@/texts'

  export default {
    name: 'LoginModal',
    data () {
      return {
        text: texts.login,
        username: "",
        password: ""
      }
    },
    computed: {
      loginState () {
        return this.$store.getters.getLoginState
      }
    },
    methods: {
      login () {
        this.$store.dispatch("LOGIN", {
          username: this.username,
          password: this.password
        })
      },
      inputKeyUp (e) {
        if (e.keyCode === 13) {
          this.login()
        }
      }
    },
    destroyed () {
      this.$store.commit('SET_LOGIN_STATE', "")
    }
  }
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 1rem;
    color: black;
    width: 75%;
    height: 75%;
  }

  .text {
    display: none;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.5rem;
  }

  .input-title {
    margin: 0.5rem 0rem;
  }

  input {
    padding: 0.2rem 0.5rem;
    font-size: 1rem;
    outline: none;
  }

  .login-btn {
    display: inline-block;
    text-align: center;
    width: 35%;
    margin-top: 0.5rem;
    padding: 0.5rem 0rem;
    background-color: gray;
    cursor: pointer;
    transition: all 0.3s;
  }

  .login-btn:hover {
    background-color: darkgray;
  }

  .status {
    margin-top: 0.5rem;
    font-weight: bold;
  }

  @media screen and (min-width: 960px) {
    .box {
      width: 45%;
      height: 45%;
    }
  }

  @media screen and (min-height: 440px) {
    .text {
      display: block;
    }
  }
</style>
