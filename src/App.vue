<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
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
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },
  data () {
    return {
      transitionName: 'slide-left'
    };
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
  height: 100%;
}
.child-view {
  position: absolute;
  width:100%;
  transition: all .8s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>
