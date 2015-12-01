BookList = React.createClass({
  render(){

    var currentlyReading = this.props.readingObjects.filter(function(readingObject) {
      if (readingObject.tags) {
        return readingObject.tags.indexOf('reading') > -1;
      } else {
        return false;
      }
    }).map(function(readingObject) {
      return <BookListItem readingObject={readingObject} key={readingObject.title + readingObject.isbn13}/> //.title + '' + book.isbn13}/>
    });

    const readingObjects = this.props.readingObjects.map(function(readingObject) {
      return <BookListItem readingObject={readingObject} key={readingObject.title + readingObject.isbn13}/>
    }); // better: .title + '' + book.isnb13}/>

    const currentlyReadingClasses = classNames({
      'empty': currentlyReading.length === 0
    }, 'currently-reading')


    return (
      <div className="books">
        <h2 className={currentlyReadingClasses}>
          Currently Reading { currentlyReading.length === 0 ? '(empty)' : ''}
        </h2>
        <ul>
          {currentlyReading}
        </ul>

        <h2 className="all-books">All Books</h2>
        <ul>
          {readingObjects}
        </ul>
        { readingObjects.length === 0 ? <div className="empty-list">Start searching for books to start populating your book list</div> : ''}
      </div>
    );
  }
});
