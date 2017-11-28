<template>
  <article>
    <img v-if="!callback" :src="url"/>
    <input class="js_upFile cover1" @change="getImg" type="file" name="cover" :capture="capture"/>
  </article>
</template>

<script>
import { os } from '../module/common/envs';
export default {
  props: {
    callback: {
      type: Function
    }
  },
  data () {
    return {
      url: ''
    };
  },
  computed: {
    capture () {
      const isIos = os === 'ios';
      if (!isIos) {
        return 'camera';
      };
    }
  },
  methods: {
    getImg (obj) {
      // const that = this;
      const file = obj.target.files[0];
      const reader = new FileReader();
      // 读取文件过程方法
      reader.onloadstart = (e) => {
        console.log('开始读取....');
      };
      reader.onprogress = (e) => {
        console.log('正在读取中....');
      };
      reader.onabort = (e) => {
        console.log('中断读取....');
      };
      reader.onerror = (e) => {
        console.log('读取异常....');
      };
      reader.onload = (e) => {
        console.log('成功读取....');
        this.url = e.target.result;
        if (this.callback) {
          console.log(1);
          this.callback(this.url);
        }
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style>

</style>

