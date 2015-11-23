BookNotes = React.createClass({

  getInitialState() {
    return {
      editing: false,
    }
  },

  editNotes() {
    this.setState({
      editing: true,
    })
  },

  saveNotes(event) {
    event.preventDefault();
    const value = event.target.previousSibling.value;

    Meteor.call('updateNotes', this.props.objectId, value,
      function(err, res) {
        if (err) console.log(err);
      })

    this.setState({
      editing: false,
    })
  },

  render() {

    const editClasses = classNames({
      'editing': this.state.editing
    }, 'edit');

    const showClasses = classNames({
      'editing': this.state.editing
    }, 'show');

    return (
      <div className="notes row">
        <h3>Your Notes:</h3>
        <div className={showClasses}>
          <div className="eight columns">
            <Markdown>{this.props.notes || ''}</Markdown>
          </div>
          <button onClick={this.editNotes}>Edit</button>
        </div>
        <div className={editClasses}>
          <textarea className="eight columns" defaultValue={this.props.notes}></textarea>
          <button onClick={this.saveNotes}>Save</button>
        </div>
      </div>
    );
  }
});
