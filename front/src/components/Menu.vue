<template>
  <div class="menu">
    <router-link :to="{name: 'Suggest'}">Suggest</router-link>
    <router-link :to="{name: 'Home'}">Cinema</router-link>
    <router-link :to="{name: 'Weekly'}">Weekly</router-link>
  </div>
</template>

<script>
export default {
name: "Menu"
}
</script>

<style scoped>

</style>