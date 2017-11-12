import Vue from 'vue';
import Router from 'vue-router';
import WritingPad from '@/components/writing-pad';
import Camera from '@/components/camera';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'writing-pad',
      component: WritingPad
    },
    {
      path: '/camera',
      name: 'camera',
      component: Camera
    }
  ]
});
