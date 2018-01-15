<template>
  <section class="countdown">
    <div>
      <span>还剩:</span>
      <span v-show="false">{{patchNumber(hour)}}时</span>
      <span>{{patchNumber(minute)}}分</span>
      <span>{{patchNumber(secend)}}秒</span>
      <span>{{content}}</span>
    </div>
  </section>
</template>
<script>
export default {
  name: 'app',
  props: {
    during: {
      type: Number,
      required: true
    },
    overCallback: {
      type: Function
    },
    content: {}
  },
  created () {
    const interval = setInterval(this.cutTime, 1000);
    if (this.timeover) {
      clearInterval(interval);
    }
  },
  methods: {
    patchNumber (num) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    },
    cutTime () {
      if (!this.hour && !this.minute && !this.secend) {
        this.timeover = true;
        if (this.overCallback) {
          this.overCallback();
        }
        return;
      }
      if (this.secend !== 0) {
        this.secend -= 1;
      } else if (this.minute !== 0) {
        this.minute -= 1;
        this.secend = 59;
      } else if (this.hour !== 0) {
        this.hour -= 1;
        this.minute = 59;
        this.secend = 59;
      }
    }
  },
  data () {
    return {
      hour: 0,
      minute: this.during || 10,
      secend: 0,
      timeover: false
    };
  }
};
</script>
<style lang="scss" scoped>
  .countdown {
    font-size: 12px;
  }
</style>

