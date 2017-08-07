$(document ).ready(function() {
    console.log( "ready!" );
    $("textarea").keyup(function() {
      // console.log(this.value.length);
      let charLength = this.value.length;
      let limit = 140;

      if (limit - charLength >= 0) {
        $(this).siblings('span').text(limit - charLength);
      } else {
        $(this).siblings('span').attr('style', 'color:red;').text(limit - charLength);
      }

    });
});