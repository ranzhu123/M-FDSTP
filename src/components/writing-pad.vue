<template>
  <article class="writing-pad" id="app">
    <div class="hello">
      <!--touchstart,touchmove,touchend,touchcancel 这-->
      <canvas ref="draw" :width="width" :height="height" style="border:1px solid black">Canvas画板</canvas>
      <div class="option">
        <button type="" v-on:click="clear">清除</button>
        <button v-on:click="save">保存</button>
      </div>
      <img v-bind:src="url" alt="">
    </div>
  </article>
</template>

<script>
import Draw from '@/common/canvas/Draw';
// const imgs = require('../assets/timg.jpeg');
export default {
  name: 'app',
  data () {
    return {
      url: '',
      draw: '',
      width: 600,
      height: 852
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

