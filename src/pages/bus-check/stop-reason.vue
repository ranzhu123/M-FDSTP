<template>
  <article class="bus-check-stop-reason">
    <mt-radio
      title="停检原因选择"
      v-model="value"
      :options="options">
    </mt-radio>
    <div class="bus-submit beautiful-btn" @click="submit">提交</div>
  </article>
</template>
<script>
import { truckPhotoReasonUrl } from '@/module/api/api';
import { fetch } from '@/module/common/fetch';
export default {
  name: 'bus-check',
  data () {
    return {
      value: '运输途中',
      options: [{
        label: '运输途中',
        value: '运输途中'
      },
      {
        label: '正常停运',
        value: '正常停运'
      },
      {
        label: '扣车停运',
        value: '扣车停运'
      },
      {
        label: '扣证停运',
        value: '扣证停运'
      },
      {
        label: '维修停运',
        value: '维修停运'
      },
      {
        label: '事故停运',
        value: '事故停运'
      },
      {
        label: '恶劣天气避让停运',
        value: '恶劣天气避让停运'
      }]
    };
  },
  created () {

  },
  methods: {
    submit () {
      fetch(truckPhotoReasonUrl, {
        method: 'POST',
        query: {
          reason: this.value
        }
      }).then((rst = {}) => {
        if (rst.data && rst.data.code === 0) {
          alert('操作成功');
          this.$router.back(-1);
        } else {
          alert('操作失败');
        }
      });
    }
  }
};
</script>
<style lang="scss">
  .mint-radiolist-title{
    font-size: 30px;
    color: #333;
  }
  .mint-radiolist-label {
    display: flex;
  }
</style>

