'use strict';
function main() {
  var query = "is:unread in:inbox subject:(ご予約フォームから)";
  var threads = new Threads(query);
  var books = new Books(threads.filterNewThreads());
  
  books.parse();
  if (!books.validate().length) return;
  
  var json = GmailApp.search("in:draft subject:+json")[0].getMessages()[0].getBody();
  books.makeReplacementStrings(json);
  
  var template = GmailApp.search("in:draft subject:+template")[0].getMessages()[0].getBody();
  books.createDraftBody(template);
  
  books.createDraftReply();
}
