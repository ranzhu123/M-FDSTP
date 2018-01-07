<template>
  <article class="bus-check-stop-reason">
    <mt-radio
      title="停检原因选择"
      v-model="value"
      :options="options">
    </mt-radio>
    <div class="bus-submit" @click="submit">提交</div>
  </article>
</template>
<script>

export default {
  name: 'bus-check',
  data () {
    return {
      value: '',
      options: [{
        label: '运输途中',
        value: '1',
        disabled: true
      },
      {
        label: '正常停运',
        value: '2'
      },
      {
        label: '扣车停运',
        value: '3'
      },
      {
        label: '扣运停运',
        value: '4'
      },
      {
        label: '维修停运',
        value: '5'
      },
      {
        label: '事故停运',
        value: '6'
      },
      {
        label: '恶劣天气避让停运',
        value: '7'
      }]
    };
  },
  created () {

  },
  methods: {
    submit () {
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

