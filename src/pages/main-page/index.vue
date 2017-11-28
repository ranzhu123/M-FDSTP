<template>
  <article class="main">
    <mt-cell title="" class="info">
      <span class="info-name">你好，张三</span>
      <!-- <img class="info-img" slot="icon" src="../../assets/timg.jpeg"> -->
    </mt-cell>
    <mt-cell class="options" title="安全会议及教育培训" to="/material">
    </mt-cell>
    <mt-cell class="options" title="车辆检查" to="/bus-check">
    </mt-cell>
    <mt-cell class="options" title="责任状签订" to="/duty-sign">
    </mt-cell>
  </article>
</template>
<script>
export default {
  name: 'main-page',
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
  }
};
</script>
<style lang="scss">
  .info {
    height: 200px;
    .mint-cell-wrapper {
      padding: 0;
    }
    .mint-cell-value {
      flex: 1;
      justify-content: center;
      align-items: flex-end;
    }
    &-img {
      height: 200px;
      width: auto;
    }
  }
  .options {
    height: 100px;
    .mint-cell-wrapper {
      font-size: 28px;
      line-height: 100px;
    }
  }
</style>

