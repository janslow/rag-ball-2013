/*global $:false */
(function () {
  "use strict";
  var menuItemsCount;
  function resize() {
    var frameWidth = $(window).width() - 150,
      skyWidth,
      itemWidth;
    if (frameWidth > 960) {
      frameWidth = 960;
    } else if (frameWidth < 540) {
      frameWidth = 540;
    }
    skyWidth = frameWidth - 40;
    itemWidth = (skyWidth / menuItemsCount) - 12;

    $('.frame').width(frameWidth);
    $('.sky, #content').width(skyWidth);
    $('.menu a').width(itemWidth);

    $(window).scroll();
  }
  $(function () {
    menuItemsCount = $('.menu li').length;
    $(window).resize(resize).resize();
  });
}());