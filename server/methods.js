
Meteor.methods({

  searchISBN (query, options, callback) {

    const isbn10 = /[0-9]{10}/;
    const isbn13 = /[0-9]{13}/;

    var searchingRemotely = function(callback) {

      var res10 = query.match(isbn10);
      var res13 = query.match(isbn13);

      callbackSuccessWrapper = function(books) {
        const newBooks = _.isArray(books) ? books : [books];
        callback(null, newBooks);
      }

      callbackErrorWrapper = function(error) {
        callback(error, null);
      }

      if (options.searchAuthor) {
        ISBNDB.Books.search({'query': query, 'type': 'author_name'},
          callbackSuccessWrapper,
          callbackErrorWrapper)
      } else if (options.searchISBN) {
        ISBNDB.Books.get(query,
          callbackSuccessWrapper,
          callbackErrorWrapper)
      } else if (res13 !== null) {
        ISBNDB.Books.get(res13[0],
          callbackSuccessWrapper,
          callbackErrorWrapper);
      } else if (res10 !== null) {
        ISBNDB.Books.get(res10[0],
          callbackSuccessWrapper,
          callbackErrorWrapper);
      } else {
        ISBNDB.Books.search({'query': query},
          callbackSuccessWrapper,
          callbackErrorWrapper);
      }
    }

    var syncRemoteSearch = Meteor.wrapAsync(searchingRemotely);
    return syncRemoteSearch();

  }
})
