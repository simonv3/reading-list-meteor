BookListItemHeader = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      authors: Authors.find({
        _id: { $in: this.props.readingObject.authors }
      }).fetch()
    }
  },

  render() {

    const actionClasses = classNames('fa', 'fa-chevron-down', {
      'upside-down': this.props.expandBook,
    });

    const authors = this.data.authors;

    const authorsObj = authors.map(function(author, idx) {
      return (
        <span>
          <AuthorItem key={author._id} author={author}/> {(idx + 1 < authors.length ? ', ' : '' )}
        </span>
      );
    })

    const bookTags = this.props.readingObject.tags.map(function(tag, idx) {
      return (<TagItem tag={tag} key={idx}/>)
    })

    return (
      <div className="book-header twelve columns">
        <div className="five columns book-data">
          {this.props.readingObject.text}
          {this.props.readingObject.title}
        </div>
        <div className="five columns book-data">
          {authorsObj}
        </div>
        <div className="two columns actions book-data">
          <a onClick={this.props.onExpandBookToggle}>
            <i className={actionClasses}></i>
          </a>
          <a className="" onClick={this.props.deleteReadingObject}>
            <i className="fa fa-trash"></i>
          </a>
        </div>
        <ul className="tags twelve columns">
          {bookTags}
        </ul>
      </div>
    );
  }
});
