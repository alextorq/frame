<template>
  <div class="finish">
    <img src="/finish.jpg" alt="">
    <div>Вы выграли</div>
    <router-link :to="{name: 'Suggest'}">добавте свои любимые фильмы</router-link>
  </div>
</template>

<script>
export default {
name: "Finish"
}
</script>

<style lang="scss">
  .finish {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 600px;
      margin-bottom: 40px;
    }
  }
</style>