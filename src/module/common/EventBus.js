class EventBus {
  constructor () {
    this.list = {};
  }
  add (event, fn) {
    this.list[event] = fn;
  }
  remove (event) {
    this.list[event] = null;
  }
  subscribe (event, fn) {
    this.add(event, fn);
  }
  // 模拟socket.io client的事件接口
  on (event, fn) {
    this.subscribe(event, fn);
  }
  broadcast (event) {
    const funcHolder = this.list[event];
    if (!funcHolder) {
      return;
    }
    funcHolder.apply(this, [].slice.call(arguments, 1));
  }
  unsubscribe (event) {
    this.remove(event);
  }
};

export default new EventBus();
