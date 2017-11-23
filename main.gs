'use strict';
function main() {
  var threads = GmailApp.search("is:unread in:inbox subject:(ご予約フォームから)");
  
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    if (thread.getMessageCount() != 1) continue;
    
    var newBook = new NewBook(thread);
    
    newBook.parse();

    if (!newBook.isValidBook()) continue;
    
    threads[i].createDraftReply('', {htmlBody: newBook.composeDraft()});
  }
}
