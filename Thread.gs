'use strict';
var Thread = function (thread) {
  this.thread = thread;
};

Thread.prototype.isNewThread = function () {
  return (this.thread.getMessageCount() === 1);
};
