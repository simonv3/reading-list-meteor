RemoteSearchBar = React.createClass({

  getInitialState() {
    return {
      searchResults: [],
      searchQuery: '',
      isSearching: false,
      searchAuthor: false,
      searchISBN: false
    }
  },

  watchIfEmpty(event) {
    const searchQuery = event.target.value;
    if (searchQuery === '') {
      this.resetResults();
    }
  },

  resetResults() {
    this.setState({
      searchResults: []
    });
  },

  afterSearchAddTagWrapper: function(book, input) {
    this.addTagToBook(book, input)
    this.resetResults()
  },

  addTagToBook: function(book, input) {
    book.tags = _.isString(input) ? [input] : input;
    Meteor.call('addReadingObject', book);
  },

  onInputChange: function(event) {
    const val = event.target.value;

    this.setState({
      'searchQuery': val
    })

    this.detectISBN(val);
  },

  detectISBN: function(val) {

    const isbn10 = /[0-9]{10}/;
    const isbn13 = /[0-9]{13}/;

    const res10 = val.match(isbn10);
    const res13 = val.match(isbn13);

    if (res10 !== null || res13 !== null) {
      this.setState({
        searchISBN: true,
      })
    }
  },

  toggleSearchAuthor: function() {
    this.setState({
      searchAuthor: !this.state.searchAuthor
    })
  },
  toggleSearchISBN: function() {
    this.setState({
      searchISBN: !this.state.searchISBN
    })
  },

  handleUserRemoteSearchQuery: function(event) {
    event.preventDefault();

    const that = this;

    that.setState({
      isSearching: true,
      searchResults: []
    });

    const options = {
      searchAuthor: this.state.searchAuthor,
      searchISBN: this.state.searchISBN,
      searchBookTitle: this.state.searchBookTitle
    }

    const searchQuery = event.target[0].value;
    if (searchQuery.length >= 3) {
      Meteor.call('searchISBN', searchQuery, options, function(err, result) {
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

  render() {

    const showingSearchOptions = classNames({
      'showing': this.state.searchQuery.length > 0
    })

    return (
      <div className="search-bar">
        <form className="row"
          onSubmit={this.handleUserRemoteSearchQuery}
          onChange={this.watchIfEmpty}>
          <SearchInput
            placeholder='Search all books...'
            searchQuery={this.searchQuery}
            onInputChange={this.onInputChange}/>
          { this.state.isSearching ? <i className="fa fa-spinner fa-spin"></i> : ' '}

          <div className={showingSearchOptions + ' filters'}>
            <label>
              Search Author: <input type="checkbox"
                               checked={this.state.searchAuthor}
                               onClick={this.toggleSearchAuthor}/>
            </label>
            <label>
              Search ISBN: <input type="checkbox" checked={this.state.searchISBN} onClick={this.toggleSearchISBN}/>
            </label>
          </div>
          <div className={showingSearchOptions + ' search-button'}>
            <button>Search</button>
          </div>
        </form>
        <SearchResults
          searchResults={this.state.searchResults}
          addTagToBook={this.afterSearchAddTagWrapper}/>
      </div>
    );
  }
});
