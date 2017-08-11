"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: 0
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  // endpoint: localhost:8080/tweets/:id/like
  // we take :id from the url path and send it to DataHelpers' updateTweet function
  // we also pass in a callback to handle what happens once the async task is done
  tweetsRoutes.post("/:id/like", function(req, res) {
    const callback = (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send('Updated tweet');
      }
    };
    DataHelpers.updateTweetLike(req.params.id, callback);
  });

  return tweetsRoutes;

}
