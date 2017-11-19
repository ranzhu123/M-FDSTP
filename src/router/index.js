import Vue from 'vue';
import Router from 'vue-router';
import WritingPad from '@/components/writing-pad';
import Camera from '@/components/camera';
import Login from '@/pages/login';
import MainPage from '@/pages/main-page';
import Material from '@/pages/material';

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
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main-page',
      name: 'main-page',
      component: MainPage
    },
    {
      path: '/material',
      name: 'material',
      component: Material
    }
  ]
});
