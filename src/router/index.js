import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/login';
import UserOption from '@/pages/user-option';
import MainPage from '@/pages/main-page';
import Material from '@/pages/material';
import MaterialDetail from '@/pages/material/detail';
import Meeting from '@/pages/meeting';
import MeetingDetail from '@/pages/meeting/detail';
import BusCheck from '@/pages/bus-check';
import BusCheckUpload from '@/pages/bus-check/upload';
import BusCheckStopReason from '@/pages/bus-check/stop-reason';
import DutySign from '@/pages/duty-sign';
import DutySignDetail from '@/pages/duty-sign/detail';
import Answer from '@/pages/answer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: MainPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user-option',
      name: 'user-option',
      component: UserOption
    },
    {
      path: '/',
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
      path: '/meeting',
      name: 'meeting',
      component: Meeting
    },
    {
      path: '/meeting/detail',
      name: 'meeting-detail',
      component: MeetingDetail
    },
    {
      path: '/bus-check',
      name: 'bus-check',
      component: BusCheck
    },
    {
      path: '/bus-check/upload',
      name: 'bus-check-upload',
      component: BusCheckUpload
    },
    {
      path: '/bus-check/stop-reason',
      name: 'bus-check-stop-reason',
      component: BusCheckStopReason
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
    },
    {
      path: '/answer/:id',
      name: 'answer',
      component: Answer
    },
    {
      path: '/answer/:id/:index',
      name: 'answer',
      component: Answer
    }
  ]
});
