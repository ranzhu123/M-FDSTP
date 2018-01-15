<template>
  <article class="login-container">
    <v-login :login="login"></v-login>
  </article>
</template>
<script>
import Login from '@/components/login';
import { loginUrl, queryCurrentUser, queryWechat } from '@/module/api/api';
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
        },
        extractData: true
      }).then((loginData = {}) => {
        if (loginData && loginData.loginName) {
          return fetch(queryCurrentUser).then(rst => {
            const { data = {} } = rst;
            this.$store.commit('setUserInfo', data);
            if (!data.wechat) {
              return fetch(queryWechat).then(urlRst => {
                if (urlRst) {
                  location.href = urlRst.data;
                } else {
                  alert('授权失败');
                }
              });
            } else {
              this.$router.push({path: '/'});
            }
          });
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
.mint-button--large {
  width: 90%;
  margin: 0 auto;
}
.login-container {
  background: url('../../assets/login-bg.jpg');
  padding-top: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  .signup {
    margin: 10px 30px;
    font-size: 15px;
    text-decoration: underline;
  }
}
</style>

