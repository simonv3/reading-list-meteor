Meteor.startup(function(){
  var ISBNDB = Meteor.npmRequire('isbndbjs');
  ISBNDB.initialize(Meteor.settings.private.isbndb.key);
})

