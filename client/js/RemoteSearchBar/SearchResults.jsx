SearchResults = React.createClass({

  render() {
    var that = this;
    var searchResults = [];

    this.props.searchResults
      .forEach(function(searchResult, index) {
        var key = searchResult.isbn13;
        searchResults.push(<SearchResultsListItem
                               index={index + 1}
                               searchResult={searchResult}
                               addTagToBook={that.props.addTagToBook}
                               key={key} />);
    });

    const olClasses = classNames({
      'collapsed': this.props.searchResults.length === 0
    });

    return (
      <ol className={olClasses}>
        {searchResults}
      </ol>
    );
  }
});
