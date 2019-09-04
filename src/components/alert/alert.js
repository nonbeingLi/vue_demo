import Notification from './notification.js';

let messageInstance;
//getMessageInstance` 函数用来获取实例
function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice({ duration = 1.5, content = '' }) {
  let instance = getMessageInstance();

  instance.add({
    content: content,
    duration: duration
  });
}

export default {
  /**
   * 对外提供了一个方法 `info`，如果需要各种显示效果
   * ，比如成功的、失败的、警告的，可以在 info 下面提供更多的方法
   */
  info (options) {
    return notice(options);
  }
}