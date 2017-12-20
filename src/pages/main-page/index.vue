<template>
  <article class="main">
    <mt-cell title="" class="info">
      <span class="info-name">你好，{{userName}}</span>
      <img class="info-img" slot="icon" src="../../assets/timg.jpeg">
    </mt-cell>
    <mt-cell class="options" title="安全会议" to="/material">
      <i slot="icon" class="iconfont icon-huiyi"></i>
    </mt-cell>
    <mt-cell class="options" title="教育培训" to="/meeting">
      <i slot="icon" class="iconfont icon-xunlianpeiyang"></i>
    </mt-cell>
    <mt-cell class="options" title="车辆检查" to="/bus-check">
      <i slot="icon" class="iconfont icon-huoche"></i>
    </mt-cell>
    <mt-cell class="options" title="责任状签订" to="/duty-sign">
      <i slot="icon" class="iconfont icon-zerenzhuang"></i>
    </mt-cell>
    <mt-cell class="options" title="答题" to="/answer">
      <i slot="icon" class="iconfont icon-639"></i>
    </mt-cell>
  </article>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'main-page',
  data () {
    return {
      username: '',
      password: ''
    };
  },
  computed: mapState({
    userName: 'userName'
  }),
  methods: {
    login () {
      this.$router.push('/main-page');
    }
  }
};
</script>
<style lang="scss">
  .main {
    .iconfont {
      font-size: 26px;
    }
  }
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

