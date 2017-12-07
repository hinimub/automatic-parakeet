'use strict';
var Books = function (threads) {
  this.books = threads.map(function (thread) { return new Book(thread) });
};

Books.prototype.parse = function () {
  return this.books.map(function (book) { book.parse() });
};

Books.prototype.validate = function () {
  return this.validBooks = this.books.filter(function (book) { return book.isValid() });
};

Books.prototype.makeReplacementStrings = function (json) {
  return this.validBooks.map(function (book) { book.makeReplacementStrings(json) });
};

Books.prototype.createDraftBody = function (template) {
  return this.validBooks.map(function (book) { book.createDraftBody(template) });
};

Books.prototype.createDraftReply = function () {
  return this.validBooks.map(function (book) { book.createDraftReply() });
};
