/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* Function for AJAX GET request to load data from server */
function loadData() {
  $.getJSON("/tweets", function(result) {
    renderTweets(result);
  });
}

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

function validateTweetLength(number) {
  if (number === 0) {
    showNotification({ msg: "Tweet cannot be empty.", type: "error" });
    return false;

  } else if (number <= 140) {
    return true;

  } else {
    showNotification({ msg: "Tweet exceeds character limit.", type: "error" });
    return false;
  }
}

function showNotification(contentObj) {
  const msg = contentObj.msg;
  const type = contentObj.type;

  const newNotification = `<li class="notification ${type}">${msg}</li>`

  let notifications = $('.notifications').html('').append(newNotification);

  setTimeout(function () {
    notifications.html('');
  }, 2000)
}


$(document).ready(function() {
  /* Call function to render tweets */
  loadData();

  /* Toggle compose tweet form*/
  $(".compose-btn").click(function(){
    $(".new-tweet").slideToggle();
  });

  /* Send tweet post to server and then render on page */
  $("#submit-tweet").submit(function(e) {
    e.preventDefault();

    let tweetLength = e.currentTarget.children.text.value.length;

    if (validateTweetLength(tweetLength)) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize(),
        success: function() {
          $('textarea').val('');
          loadData();
        },
        error: function(error){
          alert(error.responseText);
        }
     });
    }


    });
});
