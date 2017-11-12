<template>
  <div id="app">
    <video ref="video" width="640" height="480" autoplay></video>
    <button id="snap">Snap Photo</button>
    <canvas id="canvas" width="640" height="480"></canvas>
  </div>
</template>

<script>
import { Camera } from '@/common/canvas/Camera';
export default {
  name: 'app',
  data () {
    return {
    };
  },
  mounted () {
    const camera = new Camera(this.$refs.video);
    var aCanvas = document.getElementById('canvas');
    var ctx = aCanvas.getContext('2d');

    document.getElementById('snap').addEventListener('click', () => {
      const aVideo = camera.getImg();
      ctx.drawImage(aVideo, 0, 0, 640, 480); // 将获取视频绘制在画布上
    });
  }
};
</script>

<style>
</style>

