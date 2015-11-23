BookListItem = React.createClass({
  getInitialState() {
    return {
      expandBook: false,
    }
  },

  expandBookToggle(e) {
    e.preventDefault();
    this.setState({
      expandBook: !this.state.expandBook
    })
  },

  deleteReadingObject() {
    Meteor.call("removeReadingObject", this.props.readingObject._id);
  },

  render() {

    const classes = classNames({
      'collapsed': !this.state.expandBook
    }, 'twelve', 'columns', 'book-data');

    return (
      <li className="row book-item">
        <BookListItemHeader readingObject={this.props.readingObject}
                            expandBook={this.state.expandBook}
                            deleteReadingObject={this.deleteReadingObject}
                            onExpandBookToggle={this.expandBookToggle}/>
        <div className={classes}>
          <BookNotes notes={this.props.readingObject.notes} objectId={this.props.readingObject._id}/>
        </div>
      </li>
    );
  }
});
