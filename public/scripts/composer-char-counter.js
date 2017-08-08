$(document).ready(function() {
  $("textarea").keyup(function() {
    let charLength = this.value.length;
    let limit = 140;

    if (limit - charLength >= 0) {
      $(this).siblings('span').removeClass('exceed-limit').text(limit - charLength);
    } else {
      $(this).siblings('span').addClass('exceed-limit').text(limit - charLength);
    }
  });
});