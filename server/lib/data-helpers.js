"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    /*
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },
    */

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
