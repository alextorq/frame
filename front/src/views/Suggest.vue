<template>
  <div class="form__suggest">
    <img v-show="src" :src="src" alt="">
    <div>
      <label>
        Name of cinema
        <input type="text" v-model="name">
      </label>
    </div>
    <div>
      <input type="file" accept="image/jpeg,image/png" @change="saveFile">
    </div>

    <button @click="suggest">Suggest</button>

  </div>
</template>

<script>
import Cinema from "../Repository/Cinema";

export default {
  name: "Suggest",
  data() {
    return {
        file: '',
        name: '',
        src: ''
    }
  },
  computed: {
    // image() {
    //
    // }
  },
  methods: {
    saveFile(e) {
      this.file = e.target.files[0]
      if (this.file) {
        const fr = new FileReader();
        fr.onload =  () => {
          this.src = fr.result;
        }
        fr.readAsDataURL(this.file);
      }
    },
    async suggest() {
      try {
        const formData = Cinema.convertToFormData({
          name: this.name,
          frame: this.file
        });
        await Cinema.suggestCinema(formData);
      } catch (e) {
        console.error(e)
      } finally {
        this.file = '';
        this.name = '';
        this.src = '';
      }
    }
  }
}
</script>

<style scoped>

</style>