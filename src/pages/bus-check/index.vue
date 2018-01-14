<template>
  <article class="bus-check html-container">
    <h1>车辆检查</h1>
    <div v-show="checkMsg" class="flex-text text-bold">
      <span class="flex-title">审核意见</span>
      <span class="flex-content">{{checkMsg}}</span>
    </div>
    <div class="beautiful-btn" @click="() => {this.$router.push('/bus-check/upload')}">今日车辆检查上传</div>
    <div class="beautiful-btn" @click="() => {this.$router.push('/bus-check/stop-reason')}">停检原因选择</div>
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
  .bus-check {
    padding: 0 20px;
    h1 {
      margin-bottom: 40px;
    }
  }
  .flex {
    &-text {
      display: flex;
      text-align: left;
      margin: 40px 0;
    }
    &-title {
      width: 100px;
    }
    &-content {
      flex: 1;
    }
  }
  .text-bold {
    font-weight: bold;
  }
</style>

