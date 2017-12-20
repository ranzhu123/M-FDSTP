<template>
  <div id="app">
    <router-view/>
    <v-loading></v-loading>
  </div>
</template>

<script>
import loadingComponent from '@/components/loading';

export default {
  name: 'app',
  mounted () {
    // this.initDev();
  },
  components: {
    'v-loading': loadingComponent
  },
  methods: {
    initDev () {
        // if (config.DEV_MODE === 'mobile') {
      const el = document.createElement('div');
      document.body.appendChild(el);
      const eruda = require('eruda');
      eruda.init({ container: el });
        // }
    }
  }
};
</script>

<style lang="scss">
@import './module/style/base.scss';
@import './module/style/global.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
