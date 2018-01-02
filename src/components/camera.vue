<template>
  <article>
    <img v-if="!callback && url" :src="url"/>
    <input class="fileinput-button" ref="upload" @change="getImg" type="file" name="cover" :capture="capture"/>
    <span class="btn-container" @click="uploadInfo">
      <slot></slot>
    </span>
    <div ref="uploadHackBlock" @click.stop="test"></div>
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
    uploadInfo () {
      return this.$refs.upload.click();
    },
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
          this.callback(this.url);
        }
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="scss">
  .fileinput-button {
    display: none;
  }
  .btn-container {
    position: relative;
  }
</style>

