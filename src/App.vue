<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    // this.initDev();
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
