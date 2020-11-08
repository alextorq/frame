<template>
  <div class="form__suggest">
    <img
      v-show="src"
      :src="src">
    <div>
        <input
          type="text"
          v-model="name"
          placeholder="Введите название фильма">
    </div>
    <div>
      <input
        type="file"
        ref="file"
        accept="image/jpeg,image/png"
        @change="saveFile">
    </div>

    <button @click="suggest">Предложить</button>

  </div>
</template>

<script>
import Cinema from "../Repository/Cinema";
import Notification from "../utils/Notification";

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
        Notification.sendDefaultNotification('Спасибо за предложение')
      } catch (error) {
        console.error(error)
        Notification.sendErrorNotification(error.response?.data?.message ?? 'Что то пошло не так')
        // const
      } finally {
        this.$refs.file.value = ''
        this.file = '';
        this.name = '';
        this.src = '';
      }
    }
  }
}
</script>

<style scoped>
  img {
    max-width: 600px;
  }

</style>