/*global $:false */
(function () {
  "use strict";
  var links = {};

  function scrollToY(y) {
    $('html, body').stop().animate({
      scrollTop: y
    }, {
      duration: 1500,
      easing: 'swing'
    });
  }
  
  $(function () {
    //Get all page positions
    $('#content > .page').each(function (i, e) {
      var $e = $(e);
      if ($e.data('menu') !== undefined) {
        links[$e.data('menu')] = $e.position().top - 100;
      }
    });
    // Attach handler to all .location elements
    $('.location').click(function (e) {
      var page = e.currentTarget && e.currentTarget.dataset.menu,
        position = page && links[page];
      if (position) {
        scrollToY(position);
      }
      e.preventDefault();
    });
  });
}());