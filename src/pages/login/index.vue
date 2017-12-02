<template>
  <article class="login">
    <v-login :login="login"></v-login>
  </article>
</template>
<script>
import Login from '@/components/login';
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login () {
      this.$router.push('/main-page');
    }
  },
  components: {
    'v-login': Login
  }
};
</script>
<style lang="scss">

</style>

