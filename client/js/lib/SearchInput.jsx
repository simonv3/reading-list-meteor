SearchInput = React.createClass({
  render() {
    return (
        <input type="text"
               className="twelve columns"
               placeholder={this.props.placeholder || "Search all books..."}
               value={this.props.searchQuery}
               ref="searchQueryInput"
               onChange={this.props.onInputChange}/>
      )
  }
});
