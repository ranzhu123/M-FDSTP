<template>
  <article class="bus-check html-container">
    <h1>车辆检查</h1>
    <div>
      <span>审核意见</span>
      <span>{{checkMsg}}</span>
    </div>
    <div @click="() => {this.$router.push('/bus-check/upload')}">今日车辆检查上传</div>
    <div @click="() => {this.$router.push('/bus-check/stop-reason')}">停检原因选择</div>
  </article>
</template>
<script>
import { truckCheckMsgUrl } from '@/module/api/api';
import { fetch } from '@/module/common/fetch';
export default {
  name: 'bus-check',
  data () {
    return {
      checkMsg: ''
    };
  },
  created () {
    fetch(truckCheckMsgUrl).then(rst => {
      if (rst.data && rst.data.checkMsg) {
        this.checkMsg = rst.data.checkMsg;
      }
    });
  },
  methods: {
  }
};
</script>
<style lang="scss">
  .bus{
    
  }
</style>

