<template>
  <section class="login">
    <div class="login-form">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    </div>
    <mt-button type="primary" size="large" @click="login">登录</mt-button>
  </section>
</template>
<script>
export default {
  name: 'app',
  props: {
    login: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      username: '',
      password: ''
    };
  },
  mounted () {
  }
};
</script>
<style lang="scss" scoped>
  .login-form {
    margin-bottom: 30px;
  }
</style>

