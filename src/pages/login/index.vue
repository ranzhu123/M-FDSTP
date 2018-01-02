<template>
  <article class="login">
    <v-login :login="login"></v-login>
  </article>
</template>
<script>
import Login from '@/components/login';
import { loginUrl } from '@/module/api/api';
import { fetch } from '@/module/common/fetch';

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login (username, password) {
      if (!username || !password) {
        alert('请输入用户名和密码!');
        return;
      }
      return fetch(loginUrl, {
        method: 'post',
        query: {
          username,
          password,
          mobileLogin: true
        }
      }).then((rst = {}) => {
        const {data = {}} = rst;
        if (data.name) {
          this.$store.commit('setName', data.name || '李四');
          this.$router.push('/main-page');
        } else {
          alert('登录失败');
        }
      });
    }
  },
  components: {
    'v-login': Login
  }
};
</script>
<style lang="scss">

</style>

