Meteor.publish("authors", function () {
  return Authors.find({});
});
