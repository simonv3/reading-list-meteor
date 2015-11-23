ReadingObjects = new Mongo.Collection("reading-objects");

// ReadingObject Methods
Meteor.methods({

  addReadingObject(readingObject) {

    ReadingObjects.insert({
      tags: readingObject.tags,
      origin: 'isbndb',
      originalObject: readingObject,
      title: readingObject.title,
      isbn10: readingObject.isbn10,
      isbn13: readingObject.isbn13,
      addedAt: new Date()
    }, function(err, result) {
      Meteor.call('addISBNDBAuthorsForReadingObject', readingObject.author_data, result)
    });
  },

  removeReadingObject(readingObjectId) {
    const readingObject = ReadingObjects.findOne(readingObjectId);
    if (readingObject.private && readingObject.owner !== Meteor.userId()) {
      // If the reading object is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
    ReadingObjects.remove(readingObjectId);
  },

  setChecked(readingObjectId, setChecked) {
    const readingObject = ReadingObjects.findOne(readingObjectId);
    if (readingObject.private && readingObject.owner !== Meteor.userId()) {
      // If the reading object is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
    ReadingObjects.update(readingObjectId, { $set: { checked: setChecked} });
  },

  updateNotes(readingObjectId, notes, cb) {
    const readingObject = ReadingObjects.findOne(readingObjectId);
    if (readingObject.private && readingObject.owner !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    ReadingObjects.update(readingObjectId, {$set: {notes: notes}}, cb);
  }
});
