/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(tweets) {
  let $renderedTweet = tweets.forEach(createTweetElement);
  $('#tweets-container').append($renderedTweet);
}

/*
function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweet')
  let tweetContent = $tweet.html(`${tweet.content.text}`);
  // console.log($tweet);
}
*/

function createTweetElement(tweet) {

  // Create basic tweet DOM structure of tweet article
  let $tweet = $('<article class="tweet">')
               .append($('<header class="tweet-header">'))
               .append($('<div class="tweet-content">'))
               .append($('<footer class="tweet-footer">'));

  // Create nested tags for tweet DOM structure
  let header = $(".tweet-header").append($(`<img class="avatar" src="${tweet.user.avatars.large}" alt="avatar">`))
                                 .append($(`<span class="name">${tweet.user.name}</span>`))
                                 .append($(`<span class="name">${tweet.user.handle}</span>`));


  // console.log($tweet);
  console.log(header)
  let tweetContent = $(".tweet-content").html(`<p>${tweet.content.text}</p>`);
  //console.log(tweetContent);


}





$(document).ready(function() {
  // Call function

});


