Authors = new Mongo.Collection("authors");

Meteor.methods({
  addISBNDBAuthorsForReadingObject(authorData, readingObjectId) {

    authorData.forEach(function(author) {

      const selector = {
        name: author.name,
        originalSource: 'isbndb',
        originalSourceId: author.id,
      }

      Authors.upsert(selector, {
          $set: {
            name: author.name,
            originalSource: 'isbndb',
            originalSourceId: author.id,
            links: [{
              type: 'isbndb',
              id: author.id
            }]
          }
        }, function(err, result) {
          if (err) console.log(err);

          const author = Authors.findOne(selector);

          Authors.update(selector, {
            $push: {
              wrote: readingObjectId
            }
          }, function(err, res) {
            if (err) console.log('error', err);
          })

          ReadingObjects.update(readingObjectId, {
            $push: {
              authors: author._id
            }
          }, function(err, res) {
            if (err) console.log('error', err)
          })
        }
      )
    })
  }
})
