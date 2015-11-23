// App component - represents the whole app

App = React.createClass({

    // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      searchResults: [],
      isSearching: false,
      searchingLocal: false,
    }
  },

  getMeteorData() {

    let query = {}

    if (this.state.localSearchQueryFinal) {
      query.text = new RegExp(this.state.localSearchQueryFinal.toLowerCase(), 'i');
    }

    return {
      readingObjectsCount: ReadingObjects.find({checked: {$ne: true}}).count(),
      readingObjects: ReadingObjects.find(query, {sort: {addedAt: -1}}).fetch()
    }
  },

  resetResults() {
    if (!this.state.searchingLocal) {
      this.setState({
        searchResults: []
      })
    }
    this.setState({
      localSearchQuery: '',
      localSearchQueryFinal: '',
      isSearching: false
    })
  },

  handleUserRemoteSearchQuery: function(event) {
    event.preventDefault();

    var that = this;

    that.setState({
      isSearching: true,
      searchResults: []
    });

    var searchQuery = event.target[0].value;
    if (searchQuery.length >= 3) {
      Meteor.call('searchISBN', searchQuery, function(err, result) {
        if (err) console.log(err)

        that.setState({
          searchResults: result,
          isSearching: false
        })
      });

    } else {
      this.resetResults()
    }
  },

  afterSearchAddTagWrapper: function(book, input) {
    console.log('tag wrapper');
    this.addTagToBook(book, input)
    this.resetResults()
  },

  addTagToBook: function(book, input) {
    book.tags = _.isString(input) ? [input] : input;

    Meteor.call('addReadingObject', book);
  },

  handleUserLocalSearchQuery(event) {
    event.preventDefault();
    const value = event.target[0].value;

    this.setState({
      localSearchQuery: value,
      localSearchQueryFinal: value
    })
  },

  toggleSearchAll() {
    this.setState({
      searchingLocal: false,
    })
  },

  toggleSearchLocal() {
    this.setState({
      searchingLocal: true
    })
  },

  render() {

    const pillAllClasses = classNames({
      'showing': !this.state.searchingLocal
    }, 'search-toggle');

    const pillLocalClasses = classNames({
      'showing': this.state.searchingLocal
    }, 'search-toggle');

    return (
      <div className="container">
        <header>
          <h1>Reading List ({this.data.readingObjectsCount})</h1>
          <div className="search">
            <label>Search:</label>
            <button
              className={pillAllClasses}
              onClick={this.toggleSearchAll}>all books</button>
            <button
              className={pillLocalClasses}
              onClick={this.toggleSearchLocal}>your books</button>
            { !this.state.searchingLocal && <SearchBar
              placeholder="Search all books..."
              resetResults={this.resetResults}
              searchResults={this.state.searchResults}
              isSearching={this.state.isSearching}
              searchQuery={this.props.remoteSearchQuery}
              onUserEntersSearch={this.handleUserRemoteSearchQuery}
              addTagToBook={this.afterSearchAddTagWrapper}/> }
            { this.state.searchingLocal && <SearchBar
              placeholder="Search your books..."
              resetResults={this.resetResults}
              isSearching={this.state.isSearching}
              searchResults={[]}
              searchQuery={this.props.localSearchQuery}
              onUserEntersSearch={this.handleUserLocalSearchQuery} /> }
          </div>
        </header>

        <BookList readingObjects={this.data.readingObjects}/>
      </div>
    );
  }
});
