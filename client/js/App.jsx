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
      query.title = new RegExp(this.state.localSearchQueryFinal.toLowerCase(), 'i');
    }

    return {
      readingObjectsCount: ReadingObjects.find({checked: {$ne: true}}).count(),
      readingObjects: ReadingObjects.find(query, {sort: {addedAt: -1}}).fetch()
    }
  },

  resetResults() {
    this.setState({
      localSearchQueryFinal: '',
      isSearching: false
    })
  },

  handleUserLocalSearchQuery(event) {
    event.preventDefault();
    const value = event.target[0].value;

    console.log('value', value)

    this.setState({
      localSearchQueryFinal: value
    })
  },

  toggleSearchLocation() {
    this.setState({
      searchingLocal: !this.state.searchingLocal,
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
          <Settings></Settings>
          <h1>Reading List ({this.data.readingObjectsCount})</h1>
          <div className="search">
            <label>Search:</label>
            <button
              className={pillAllClasses}
              onClick={this.toggleSearchLocation}>all books</button>
            <button
              className={pillLocalClasses}
              onClick={this.toggleSearchLocation}>your books</button>
            { !this.state.searchingLocal && <RemoteSearchBar/> }
            { this.state.searchingLocal && <LocalSearchBar
              resetResults={this.resetResults}
              isSearching={this.state.isSearching}
              searchQuery={this.props.localSearchQueryFinal}
              onUserEntersSearch={this.handleUserLocalSearchQuery} /> }
          </div>
        </header>

        <BookList readingObjects={this.data.readingObjects}/>
      </div>
    );
  }
});
