'use strict';
String.prototype.replaceAllItems = function (hash) {
  var ret = this;
  for (key in hash) {
    ret = ret.replace(new RegExp(key, 'g'), hash[key]);
  }
  if (this == ret) return this;
  return ret.replaceAllItems(hash);
};
