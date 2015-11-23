Meteor.publish("reading-objects", function () {
  return ReadingObjects.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
});
