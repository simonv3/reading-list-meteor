SearchBar = React.createClass({
  watchIfEmpty(event) {
    const searchQuery = event.target.value;
    if (searchQuery === '') {
      this.props.resetResults();
    }
  },
  render() {
    return (
      <div className="search-bar">
        <form className="row" onSubmit={this.props.onUserEntersSearch} onChange={this.watchIfEmpty}>
          <SearchInput
            placeholder={this.props.placeholder}
            searchQuery={this.props.searchQuery}/>
          { this.props.isSearching ? <i className="fa fa-spinner fa-spin"></i> : ' '}
        </form>
        <SearchResults
          searchResults={this.props.searchResults}
          addTagToBook={this.props.addTagToBook}/>
      </div>
    );
  }
});
