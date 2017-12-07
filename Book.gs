'use strict';
var Book = function (thread) {
  this.thread = thread;
};

Book.prototype.parse = function () {
  var message = this.thread.getMessages()[0].getBody();
  var mailformPro = new MailformPro(message);
  
  return this.parse = mailformPro.parse();
};

Book.prototype.isValid = function () {
  if (!('[ チェックイン予定日 ]' in this.parse)) return false;
  return true;
};

Book.prototype.makeReplacementStrings = function (json) {
  return this.replacementStrings = JSON.parse(json, function(k, v){
    if (!k) return v;
    return (new Function('hash', v)(this.parse));
  }.bind(this));
};

Book.prototype.createDraftBody = function (template) {
  return this.body = template.replaceAllItems(this.replacementStrings);
};

Book.prototype.createDraftReply = function () {
  return this.thread.createDraftReply('', {htmlBody: this.body});
};
