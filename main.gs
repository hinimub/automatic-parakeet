'use strict';
function main() {
  var template = GmailApp.search("in:draft subject:(template)")[0].getMessages()[0].getBody();
  var json = GmailApp.search("in:draft subject:(json)")[0].getMessages()[0].getBody();
  var threads = GmailApp.search("is:unread in:inbox subject:(ご予約フォームから)");
  
  var newThreads = threads.filter(function (thread) {
    return (thread.getMessageCount() === 1);
  });
  
  var hashes = newThreads.map(function (thread) {
    var message = thread.getMessages()[0].getBody();
    var mailformPro = new MailformPro(message);
    return [thread, mailformPro.parse()];
  });
  
  var hashes = hashes.filter(function (element) {
    var hash = element[1];
    if (!('[ チェックイン予定日 ]' in hash)) return false;
    return true;
  });
  
  var hashes = hashes.map(function (e) {
    var hash = e[1];
    e.push(JSON.parse(json, function(k, v){return eval(v)}));
    return e;
  });
  
  var drafts = hashes.map(function (e) {
    var variables = e[2];
    var body = template;
    for (key in variables) {
      var body = body.replace(new RegExp(key, 'g'), variables[key]);
    }
    e.push(body);
    return e;
  });
  
  hashes.map(function (e) {
    return e[0].createDraftReply('', {htmlBody: e[3]});
  });
}
