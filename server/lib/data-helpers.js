"use strict";

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
    }
  };
}
