<template>
  <div :style="style"
       :class="classes"
       class="cinema">
    <img
        v-if="frame"
        :src="frame">
    <div>
        <label
          class="answer__item"
          v-for="(item, index) of currentCinema.title"
          :key="index">
          <input
              type="radio"
              name="answer"
              :value="item"
              @change="check"
              v-model="title">
          {{item}}
        </label>
    </div>
  </div>
</template>

<script>

const PREFIX = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '';

import CinemaRepository from '../Repository/Cinema'
import middleColor from "../utils/middleColor";

export default {
  name: "Cinema",
  data() {
    return {
      classes: [],
      currentCinema: {
        title: [],
      },
      title: '',
      loading: false,
      color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      }
    }
  },
  computed: {
    style() {
      const gr = `linear-gradient(0deg, rgba(${this.color.r},${this.color.g},${this.color.b}, 0.9),
                  rgba(${this.color.r},${this.color.g},${this.color.b}, 1) 80%)`;
      return {
        background: gr
      }
    },
    frame() {
      return PREFIX + this.currentCinema?.frame?.[0]
    },

  },
  methods: {
    async getColor() {
      const color = await middleColor(this.frame);
      if (color) {
        this.color.r = color.r
        this.color.g= color.g
        this.color.b = color.b
      }
    },
    delay(ms = 2500) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
    clear() {
      this.title = '';
      this.classes = [];
    },
    setCinema(res) {
      this.currentCinema = res.data;
      this.getColor();
    },
    errorHandler(err) {
      this.$router.push({name: 'Finish'})
      console.error(err);
    },
    async check() {
      try {
        if (!this.title || this.loading) return;
        this.loading = true;

        const {data} = await CinemaRepository.answer({
          id: this.currentCinema._id,
          answer: this.title
        });

        const answerClass = data.answer ? 'correct' : 'wrong';
        this.classes.push(answerClass);

        const [, res] = await Promise.all([this.delay(), this.random()])

        this.clear()
        this.setCinema(res);
        this.loading = false;
      }catch (e) {
        this.errorHandler(e)
      }
    },
    async random() {
      return await CinemaRepository.getFirstOrLastMemory();
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
  async mounted() {
    try {
      this.clear();
      const res = await this.random();
      this.setCinema(res);
    }catch (e) {
      this.errorHandler(e)
    }
  }
}
</script>

<style lang="scss">
  .cinema {
    &.correct img {
      border: 2px solid green;
    }
    &.wrong img {
      border: 2px solid red;
    }
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
      padding: 20px;
      border: 2px solid transparent;
      width: 600px;
      max-width: 80%;
      user-select: none;
      -webkit-user-drag: none;
    }
  }
</style>