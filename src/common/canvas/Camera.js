navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia; // 获取媒体对象（这里指摄像头）

const defaultWidth = 640;
const defaultHeight = 480;
export class Camera {
  constructor (el, options = {}) {
    const {
      width = defaultWidth,
      height = defaultHeight
    } = options;
    this.aVideo = el;
    this.width = width;
    this.height = height;
    this.init();
  }
  init () {
    // var aCanvas=document.getElementById('canvas');
    // var ctx=aCanvas.getContext('2d');
    navigator.getUserMedia({video: true}, this.getStream.bind(this), this.noStream); // 参数1获取用户打开权限；参数二成功打开后调用，并传一个视频流对象，参数三打开失败后调用，传错误信息
    // document.getElementById('snap').addEventListener('click', function() {
    //   ctx.drawImage(aVideo, 0, 0, 640, 480);//将获取视频绘制在画布上
    // });
  }
  getImg () {
    return this.aVideo;
  }
  getStream (stream) {
    console.log(this);
    const { aVideo } = this;
    aVideo.src = URL.createObjectURL(stream);
    aVideo.onerror = function () {
      stream.stop();
    };
    stream.onended = this.noStream;
    aVideo.onloadedmetadata = function () {
      alert('摄像头成功打开！');
    };
  }
  noStream (err) {
    alert(err);
  }
}
