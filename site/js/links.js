/*jslint indent: 2 */
/*global $:false, window:false */
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
    $('.content > .page').each(function (i, e) {
      var $e = $(e);
      if ($e.data('menu') !== undefined) {
        links[$e.data('menu')] = $e.position().top;
      }
    });
    //Add OnHashChange handler
    $(window).on('hashchange', function () {
      var hash = window.location.hash;
      if (links[hash] !== undefined) {
        scrollToY(links[hash]);
      }
    }).trigger('hashchange');
  });
}());