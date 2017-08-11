"use strict";
const ObjectId = require('mongodb').ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    saveTweet: function(newTweet, callback) {
        try {
          db.collection("tweets").insertOne(newTweet);
          callback(null);
        } catch (error) {
          callback(error);
        }
    },
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    // goal is to update a tweet and increase the like count
    // we first create a new ObjectId (_id) from the string id.
    // Then we tell mongo to go into tweets collection and look up _id
    // And increment if it finds the "property", once its done, run callback
    updateTweetLike: function(id, callback) {
      try {
        const _id = new ObjectId(id);
        db
          .collection("tweets")
          .update({"_id": _id}, {"$inc": {"likes" : 1}})
          .then(res => callback(null));
      } catch(error) {
        callback(error);
      }
    }

  };
}
