<template>
  <div :style="style"
       class="cinema">
    <img :src="frame">
    <div>

        <label
          class="answer__item"
          v-for="(item, index) of answers"
          :key="index">
          <input
              type="radio"
              name="answer"
              :value="item"
              @change="check"
              v-model="title">
          {{item}}
        </label>

      <button @click="check">Check</button>
    </div>

    <button @click="random">Next</button>
  </div>
</template>

<script>

import CinemaRepository from '../Repository/Cinema'
import middleColor from "../utils/middleColor";

export default {
  name: "Cinema",
  data() {
    return {
      currentCinema: {
        title: '',
        randomTitles: [],
      },
      title: '',
      color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      }
    }
  },
  computed: {
    answers() {
      const answers = [].concat(this.getRandomTitle, this.currentCinema.randomTitles);
      return answers.sort(() => {
        return Math.random() - 0.5;
      })
    },
    style() {
      const gr = `linear-gradient(0deg, rgba(${this.color.r},${this.color.g},${this.color.b}, 0.9),
                  rgba(${this.color.r},${this.color.g},${this.color.b}, 1) 80%)`;
      return {
        background: gr
      }
    },
    getRandomTitle() {
      const amount = this.currentCinema.title.length;
      const rand = Math.floor(Math.random() * amount);
      return this.currentCinema.title[rand];
    },
    frame() {
      return 'http://localhost:3000/' + this.currentCinema.frame
    },

  },
  methods: {
    async getColor() {
      const color = await middleColor(this.currentCinema.frame[0]);
      if (color) {
        this.color.r = color.r
        this.color.g= color.g
        this.color.b = color.b
      }
    },
    clear() {
      this.title = '';
    },
    async check() {
      const status = this.currentCinema.title.some(item => item.toLowerCase() === this.title.toLowerCase());

      await CinemaRepository.answer(this.currentCinema)
      await this.random();
      this.clear()
    },
    async random() {
      this.clear();
      const res = await CinemaRepository.getFirstOrLastMemory();
      this.currentCinema = res.data;
      this.getColor();
    }
  },
  props: {
    cinema: {
      type: Object,
      default() {
        return {
          title: '',
          frame: ''
        }
      }
    }
  },
  mounted() {
    this.random();
  }
}
</script>

<style lang="scss">
  .cinema {
    .answer__item {
      background-color: white;
      padding: 5px 10px;
      margin-right: 10px;
      margin-top: 20px;
      margin-bottom: 10px;
      display: inline-flex;
    }
    width: 100%;
    //min-height: 700px;
    img {
      width: 600px;
      max-width: 80%;
    }
  }
</style>