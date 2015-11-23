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

    return (
      <div className="books">
        <h2 className="currently-reading">Currently Reading</h2>
        <ul>
          {currentlyReading}
        </ul>

        <h2 className="all-books">All Books</h2>
        <ul>
          {readingObjects}
        </ul>
      </div>
    );
  }
});
