/*global $:false */
(function () {
  "use strict";
  var header, button, logoSpan;
  function resize() {
    var totalWidth = header.offsetWidth,
      buttonWidth = button.offsetWidth,
      freeWidth = totalWidth - buttonWidth - 1;

    logoSpan.style.width = freeWidth + "px";
  }
  window.onload = function () {
    header = document.getElementById("header");
    button = header.querySelector(".menu-button");
    logoSpan = header.querySelector(".logo.small span");

    if (button) {
      window.onresize = resize;
      window.onresize();
    } else {
      header = button = logoSpan = undefined;
    }
  };
}());