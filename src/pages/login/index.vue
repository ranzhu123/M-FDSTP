<template>
  <article class="login">
    <v-login :login="login"></v-login>
  </article>
</template>
<script>
import Login from '@/components/login';
export default {
  name: 'app',
  data () {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login () {
      console.log(1);
    }
  },
  components: {
    'v-login': Login
  }
};
</script>
<style lang="scss">

</style>

