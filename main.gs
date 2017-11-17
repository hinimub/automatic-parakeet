function mailformproToHash (message) {
  var arr = message.split(/\r\n|\n/);
  var hash = {};
  for (var i in arr) {
      var str = arr[i];
      var key = str.slice(str.indexOf('['), str.indexOf(']') + 1);
      if (key) hash[key] = str.slice(str.indexOf(']') + 1).trim();
  }
  return hash;
}

function isValidBook (hash) {
  if (typeof hash['[ チェックイン予定日 ]'] === "undefined") return false;
  return true;
}

function replace (text, hash) {
  for (key in hash) {
    var text = text.replace(new RegExp(key, 'g'), hash[key]);
  }
  return text;
}

function main() {
  var template = GmailApp.search("in:draft subject:(template)")[0].getMessages()[0].getBody();
  var json = GmailApp.search("in:draft subject:(json)")[0].getMessages()[0].getBody();
  var threads = GmailApp.search("is:unread in:inbox subject:(ご予約フォームから)");
  
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].getMessageCount() != 1) continue;
    
    var message = threads[i].getMessages()[0].getBody();
    var hash = mailformproToHash(message);

    if (!isValidBook(hash)) continue;
    
    var variables = JSON.parse(json, function(k, v){return eval(v)});
    var body = replace(template, variables);
    threads[i].createDraftReply('', {htmlBody: body});
  }
}
