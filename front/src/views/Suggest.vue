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
        size="5000000"
        accept="image/jpeg,image/png"
        @change="saveFile">
    </div>

    <button @click="suggest">Предложить</button>

  </div>
</template>

<script>
import Cinema from "../Repository/Cinema";
import Notification from "../utils/Notification";
import sizeValidate from '../utils/sizeValidate'


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
      this.src = '';
      const file = e.target.files[0]
      this.file = file;
      if (this.file) {
        const fr = new FileReader();
        fr.onload =  () => {
          this.src = fr.result;
        }
        fr.readAsDataURL(this.file);
      }
    },
    validate() {
      let status = true;
      const size = sizeValidate(this.file);
      if (!size) {
        status = false;
        Notification.sendErrorNotification('Файл слишком большой')
      }
      if (!this.name || !this.file) {
        status = false;
        Notification.sendErrorNotification('Заполните все поля')
      }
      return status;
    },
    resetFile() {
      this.$refs.file.value = ''
      this.file = '';
    },
    async suggest() {
      if (!this.validate()) {
        return
      }
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
        this.resetFile();
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