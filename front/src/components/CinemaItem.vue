<template>
  <div class="cinema__item">
    <img src="" alt="">
  </div>
</template>

<script lang="ts">

import {defineComponent} from  'vue'

export default defineComponent({
name: "CinemaItem",
  props: {
    cinema: {
      type: Object,
      default() {
        return {

        }
      }
    }
  }
});

</script>

<style scoped>

</style>