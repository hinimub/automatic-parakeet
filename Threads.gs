'use strict';
var Threads = function (query) {
  this.threads = GmailApp.search(query);
};

Threads.prototype.filterNewThreads = function () {
  return this.threads.filter(function (e) {
    var thread = new Thread(e);
    return thread.isNewThread();
  });
};
