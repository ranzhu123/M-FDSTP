import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/login';
import MainPage from '@/pages/main-page';
import Material from '@/pages/material';
import MaterialDetail from '@/pages/material/detail';
import BusCheck from '@/pages/bus-check';
import DutySign from '@/pages/duty-sign';
import DutySignDetail from '@/pages/duty-sign/detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: Login
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
    },
    {
      path: '/material/detail',
      name: 'material-detail',
      component: MaterialDetail
    },
    {
      path: '/bus-check',
      name: 'bus-check',
      component: BusCheck
    },
    {
      path: '/duty-sign',
      name: 'duty-sign',
      component: DutySign
    },
    {
      path: '/duty-sign/detail',
      name: 'duty-sign-detail',
      component: DutySignDetail
    }
  ]
});
