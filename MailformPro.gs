'use strict';
var MailformPro = function (message) {
  this.message = message;
};

MailformPro.prototype.parse = function () {
  var arr = this.message.split(/\r\n|\n/);
  var hash = {};
  for (var i in arr) {
    var str = arr[i];
    var key = str.slice(str.indexOf('['), str.indexOf(']') + 1);
    if (key) hash[key] = str.slice(str.indexOf(']') + 1).trim();
  }
  this.hash = hash;
  return this.hash;
};
