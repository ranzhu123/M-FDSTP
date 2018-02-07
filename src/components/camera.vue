<template>
  <article>
    <img v-if="!callback && url" :src="url"/>
    <input class="fileinput-button" ref="upload" @change="getImg" type="file" name="cover" :capture="capture"/>
    <span class="btn-container" @click="uploadInfo">
      <slot></slot>
    </span>
    <video v-if="videoUrl" :src="videoUrl" class="video"></video>
    <div ref="uploadHackBlock" @click.stop="test"></div>
  </article>
</template>

<script>
import { os } from '../module/common/envs';
function dataURItoBlob (base64Data) {
  let byteString;
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1]);
  } else {
    byteString = unescape(base64Data.split(',')[1]);
  }
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type: mimeString});
}

export default {
  props: {
    callback: {
      type: Function
    },
    needCompress: {
      default: true
    }
  },
  data () {
    return {
      url: '',
      videoUrl: '',
      newUrl: '',
      uploadFile: {}
    };
  },
  created () {
    // var video = document.querySelector('.video');
    // // 启动摄像头
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({
    //     video: true,
    //     audio: false
    //   }).then(function (stream) {
    //     console.log((window.URL || window.webkitURL).createObjectURL(stream));
    //     this.videoUrl = (window.URL || window.webkitURL).createObjectURL(stream);
    //     video.play();
    //     console.log(stream);
    //   }).catch(function (err) {
    //     console.log(err);
    //   });
    // }
  },
  watch: {
    newUrl (val) {
      if (this.callback) {
        this.callback({
          url: val,
          photo: val,
          // fileName: file.name,
          file: this.uploadFile
        });
      }
    }
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
    compressImage (url) {
      const cvs = document.createElement('canvas');
      const ctx = cvs.getContext('2d');
      const img = new window.Image();
      img.src = url;
      return new Promise((resolve, reject) => {
        img.onload = () => {
          cvs.width = img.width;
          cvs.height = img.height;
          ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
          const imageBase64 = cvs.toDataURL('image/jpeg', 0.1);
          const blob = dataURItoBlob(imageBase64); // 上一步中的函数
          resolve(blob);
        };
      });
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
          if (this.needCompress) {
            this.compressImage(this.url).then(newUrl => {
              this.callback({
                url: newUrl,
                photo: this.url,
                fileName: file.name
              });
            });
          }
          // this.callback({
          //   url: this.url,
          //   photo: this.url,
          //   fileName: file.name,
          //   file
          // });
          // this.compressImage(this.url);
          // this.uploadFile = file;
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

