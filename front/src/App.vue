<template>
  <div class="menu">
    <router-link :to="{name: 'Suggest'}">Suggest</router-link>
    <router-link :to="{name: 'Home'}">Cinema</router-link>
    <router-link :to="{name: 'Weekly'}">Weekly</router-link>
  </div>

  <router-view></router-view>
</template>

<script>




export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
  },
  computed: {

  },
  methods: {

  },

}
</script>

<style lang="scss">
.menu {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  color: white;
  a {
    color: white;
  }
}
body {
  margin: 0;
  padding: 0;

  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .cinema, .form__suggest {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .form__suggest {
    background-color: grey;
  }
}
</style>
