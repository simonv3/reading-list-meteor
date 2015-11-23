// Task component - represents a single todo item

ReadingObject = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    readingObject: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this.props.readingObject._id, ! this.props.readingObject.checked);
  },

  deleteThisReadingObject() {
    Meteor.call("removeReadingObject", this.props.readingObject._id);
  },

  setPrivate(readingObjectId, setToPrivate) {
    const readingObject = ReadingObjects.findOne(readingObjectId);

    // Make sure only the task owner can make a task private
    if (readingObject.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    ReadingObjects.update(taskId, { $set: { private: setToPrivate } });
  },

  togglePrivate() {
    Meteor.call("setPrivate", this.props.readingObject._id, ! this.props.readingObject.private);
  },

  render() {

    // Give reading objects a different className when they are checked off,
    // so that we can style them nicely in CSS
    // Add "checked" and/or "private" to the className when needed
    const readingObjectClassName = (this.props.readingObject.checked ? "checked" : "") + " " +
      (this.props.readingObject.private ? "private" : "");

    return (
      <li className={readingObjectClassName}>
        <button className="delete" onClick={this.deleteThisReadingObject}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.readingObject.checked}
          onClick={this.toggleChecked} />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            { this.props.readingObject.private ? "Private" : "Public" }
          </button>
        ) : ''}

        <span className="text">{this.props.readingObject.text}</span>
      </li>
    );
  }
});
