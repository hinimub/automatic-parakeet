'use strict';
var NewBook = function (thread) {
  this.message = thread.getMessages()[0].getBody();
};

NewBook.prototype.parse = function () {
  var mailformPro = new MailformPro(this.message);
  this.hash = mailformPro.parse();
  
  return this.hash;
};

NewBook.prototype.isValidBook = function () {
  if (typeof this.hash['[ チェックイン予定日 ]'] === "undefined") return false;
  return true;
};

NewBook.prototype.composeDraft = function () {
  var template = GmailApp.search("in:draft subject:+template")[0].getMessages()[0].getBody();
  var json = GmailApp.search("in:draft subject:+json")[0].getMessages()[0].getBody();
  
  var hash = this.hash;
  var variables = JSON.parse(json, function(key, value){return eval(value)});
  var body = template;
  for (key in variables) {
    var body = body.replace(new RegExp(key, 'g'), variables[key]);
  }
  return body;
};
