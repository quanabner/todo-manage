const eventBus = {
  events: {},

  // 订阅事件
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    if (typeof callback === 'function') {
      this.events[event].push(callback);
    } else {
      console.error('Invalid callback for event:', event);
    }
  },

  // 发布事件
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => {
        if (typeof callback === 'function') {
          callback(data);
          // 移除一次性事件
          if (callback.once) {
            this.off(event, callback);
          }
        } else {
          console.error('Invalid callback for event:', event);
        }
      });
    }
  },

  // 取消订阅事件
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  },

  once(event, callback) {
    // 添加一次性事件标记
    callback.once = true;
    this.on(event, callback);
  },
};
export default eventBus;
