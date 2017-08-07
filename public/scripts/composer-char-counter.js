$(document ).ready(function() {
    console.log( "ready!" );
    $("textarea").keyup(function() {
      // console.log(this.value.length);
      let charLength = this.value.length;
      let limit = 140;

      if (limit - charLength >= 0) {
        $(this).siblings('span').removeClass('exceed-limit').text(limit - charLength);
      } else {
        $(this).siblings('span').addClass('exceed-limit').text(limit - charLength);
      }

    });
});