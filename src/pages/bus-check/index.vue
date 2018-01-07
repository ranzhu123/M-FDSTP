<template>
  <article class="bus-check">
    <mt-button type="default" @click="() => {this.$router.push('/bus-check/upload')}">今日车辆检查上传</mt-button>
    <mt-button type="default" @click="() => {this.$router.push('/bus-check/stop-reason')}">停检原因选择</mt-button>
  </article>
</template>
<script>

export default {
  name: 'bus-check',
  data () {
    return {
    };
  },
  created () {

  },
  methods: {
  }
};
</script>
<style lang="scss">
  .bus{
    
  }
</style>

