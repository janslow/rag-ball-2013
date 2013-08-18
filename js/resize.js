(function () {
  "use strict";
  var menuItemsCount;
  function resize() {
  	var frameWidth = $(window).width() - 150;
  	if (frameWidth > 960) {
  		frameWidth = 960;
  	} else if (frameWidth < 540) {
  		frameWidth = 540;
  	}
  	var skyWidth = frameWidth - 40;
  	var itemWidth = (skyWidth / menuItemsCount) - 32;

  	$('.frame').width(frameWidth);
  	$('.sky, .content').width(skyWidth);
  	$('.menu a').width(itemWidth);
  }
  $(function () {
  	menuItemsCount = $('.menu li').length;
  	$(window).resize(resize).resize();
  })
}());