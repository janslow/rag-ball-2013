/*global $:false */
(function () {
  "use strict";
  var header, button, logoSpan;
  function resize() {
    var totalWidth = header.width(),
      buttonWidth = button.width(),
      freeWidth = totalWidth - buttonWidth - 1;

    logoSpan.width(freeWidth);
  }
  $(function () {
    header = $("#header");
    button = $(".menu-button", header);
    logoSpan = $(".logo.small span", header);

    if (button.length) {
      $(window).resize(resize).resize();
    } else {
      header = button = logoSpan = undefined;
    }
  });
}());