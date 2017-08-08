/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// hardcoded data replace with AJAX to grab data
let data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

/* Function to loop over tweets database and call render function on each */
function renderTweets(tweets) {
  tweets.forEach(tweet => {
    let renderedTweet = createTweetElement(tweet);
    $('.tweets-container').append(renderedTweet);
  });
}

/* Function to render tweet */
function createTweetElement(tweet) {

  // Create basic tweet DOM structure of tweet article
  let $tweet = $('<article>').addClass('tweet');

  // Create nested tags and insert content for tweet DOM structure
  let $tweetHeader = $('<header>').addClass('tweet-header')
                     .append($(`<img class="avatar" src="${tweet.user.avatars.large}" alt="avatar">`))
                     .append($(`<span class="name">${tweet.user.name}</span>`))
                     .append($(`<span class="username">${tweet.user.handle}</span>`));

  let $tweetContent = $('<div>').addClass('tweet-content')
                      .html(`<p>${escape(tweet.content.text)}</p>`);

  let $tweetFooter = $('<footer>').addClass('tweet-footer')
                     .append($(`<span class="date">${milisecondConverter(tweet.created_at)}</span>`))
                     .append($(`
                        <div class="fa-container">
                          <i class="fa fa-flag" aria-hidden="true"></i>
                          <i class="fa fa-refresh" aria-hidden="true"></i>
                          <i class="fa fa-heart" aria-hidden="true"></i>
                        </div>
                      `));

  $tweet.append($tweetHeader)
        .append($tweetContent)
        .append($tweetFooter);
  return $tweet;
}


/* Escape XSS unsafe characters */
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


/* Create timestamp for tweet */
function milisecondConverter(ms) {

  let s = Math.floor(ms / 1000);
  let min = Math.floor(ms / 60000);
  let hr = Math.floor(ms / 3600000);
  let day = Math.floor(ms / 86400000);
  let month = Math.floor(ms / 2628000000)

  if (ms < 60000) {
    //convert to seconds
      return `${s} s ago`;
  } else if (ms < 3600000) {
    //convert to minutes
      return `${min} min ago`;
  } else if (ms < 86400000) {
    // convert to hours
      return `${hr} hr ago`;
  } else if (ms < 2628000000) {
    // convert to days
      return `${day} d ago`;
  } else if (ms < 31556926000) {
    // convert to months
      return `${month} m ago`;
  } else {
    return "Over a year ago";
  }
}

/* Call function to render tweets */
$(document).ready(function() {
  renderTweets(data);


  $("#submit-tweet").submit(function(e) {
    $.ajax({
         type: "POST",
         url: "/tweets",
         data: $(this).serialize(), // serializes the form's elements.
         success: function() {
          console.log(this);
          console.log("submitted");
          $('textarea').val('');
        }
       });

      e.preventDefault(); // avoid to execute the actual submit of the form.
    });

});

