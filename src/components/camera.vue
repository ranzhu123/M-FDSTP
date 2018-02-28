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
import 'core-js/fn/promise';
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob (urlData) {
  var bytes = window.atob(urlData.split(',')[1]);      // 去掉url的头，并转换为byte
  // 处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {type: 'image/png'});
}
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
    yasuo (baseData) {
      const image = new Image();
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        const quality = 0.7;  // 默认图片质量为0.7
        // 生成canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // 创建属性节点
        const anw = document.createAttribute('width');
        anw.nodeValue = width;
        const anh = document.createAttribute('height');
        anh.nodeValue = height;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(image, 0, 0, width, height);
        // quality值越小，所绘制出的图像越模糊
        return canvas.toDataURL('image/jpeg', quality);
      };
      image.src = baseData;
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
        console.log(e);
        console.log(convertBase64UrlToBlob(this.url));
        if (this.callback) {
          // this.callback(this.url);
          let image = new Image();
          image.onload = () => {
            const width = image.width;
            const height = image.height;
            console.log(width, height);
            const quality = 0.3;  // 默认图片质量为0.7
            // 生成canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // 创建属性节点
            const anw = document.createAttribute('width');
            anw.nodeValue = width;
            const anh = document.createAttribute('height');
            anh.nodeValue = height;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(image, 0, 0, width, height);
            // quality值越小，所绘制出的图像越模糊
            const yasuofile = canvas.toDataURL('image/jpeg', quality);
            console.log(yasuofile);
            this.callback({
              url: this.url,
              photo: yasuofile,
              fileName: file.name,
              file: convertBase64UrlToBlob(yasuofile)
            });
          };
          image.src = this.url;
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

