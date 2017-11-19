const preHandler = function (e) {
  e.preventDefault();
};
const defaultHeight = 480;
const defaultWidth = 600;
const defaultStrokeColor = '#000';
export default class Draw {
  constructor (el, options = {}) {
    const { strokeColor = defaultStrokeColor, width = defaultWidth, height = defaultHeight, imgSrc } = options;
    this.el = el;
    this.canvas = this.el;
    this.cxt = this.canvas.getContext('2d');
    this.stage_info = this.canvas.getBoundingClientRect();
    this.strokeColor = strokeColor;
    this.width = width;
    this.height = height;
    this.imgSrc = imgSrc;
    this.path = {
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0
    };
  }
  init (btn) {
    this.canvas.addEventListener('touchstart', (event) => {
      document.addEventListener('touchstart', preHandler, false);
      this.drawBegin(event);
    });
    this.canvas.addEventListener('touchend', (event) => {
      document.addEventListener('touchend', preHandler, false);
      this.drawEnd();
    });
    this.clear(btn);
    this.drawImg();
  }
  drawImg () {
    if (this.imgSrc) {
      const img = new Image();
      img.src = this.imgSrc;
      img.onload = () => { // 确保图片已经加载完毕
        this.cxt.drawImage(img, 0, 0, this.width, this.height);
      };
    }
  }
  drawBegin (e) {
    window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty();
    this.cxt.strokeStyle = this.strokeColor;
    this.cxt.beginPath();
    this.cxt.moveTo(
      e.changedTouches[0].clientX - this.stage_info.left,
      e.changedTouches[0].clientY - this.stage_info.top
    );
    this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left;
    this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top;
    this.canvas.addEventListener('touchmove', () => {
      this.drawing(event);
    });
  }
  drawing (e) {
    this.cxt.lineTo(
      e.changedTouches[0].clientX - this.stage_info.left,
      e.changedTouches[0].clientY - this.stage_info.top
    );
    this.path.endX = e.changedTouches[0].clientX - this.stage_info.left;
    this.path.endY = e.changedTouches[0].clientY - this.stage_info.top;
    this.cxt.stroke();
  }
  drawEnd () {
    document.removeEventListener('touchstart', preHandler, false);
    document.removeEventListener('touchend', preHandler, false);
    document.removeEventListener('touchmove', preHandler, false);
    // canvas.ontouchmove = canvas.ontouchend = null
  }
  clear (btn) {
    this.cxt.clearRect(0, 0, this.width, this.height);
    this.drawImg();
  }
  save () {
    return this.canvas.toDataURL('image/png');
  }
}
