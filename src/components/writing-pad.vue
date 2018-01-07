<template>
  <article class="writing-pad">
    <div class="hello">
      <!--touchstart,touchmove,touchend,touchcancel 这-->
      <canvas ref="draw" :width="width" :height="height" style="border:1px solid black">Canvas画板</canvas>
      <!-- <div class="option">
        <mt-button v-on:click="clear">清除</mt-button>
        <mt-button v-on:click="save">保存</mt-button>
      </div> -->
      <slot></slot>
      <img v-bind:src="url" alt="">
    </div>
  </article>
</template>

<script>
import Draw from '@/module/common/canvas/Draw';
// const imgs = require('../assets/timg.jpeg');
export default {
  name: 'app',
  data () {
    return {
      url: '',
      draw: '',
      width: 700,
      height: 350
    };
  },
  methods: {
    clear () {
      this.draw.clear();
    },
    save () {
      const data = this.draw.save();
      this.url = data;
    },
    mutate (word) {
      this.$emit('input', word);
    }
  },
  mounted () {
    const canvas = this.$refs.draw;
    this.draw = new Draw(canvas, {
      width: this.width,
      height: this.height // ,
      // imgSrc: imgs
    });
    this.draw.init();
  }
};
</script>

<style lang="scss">

</style>

