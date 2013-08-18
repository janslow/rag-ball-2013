var contentOffset;
var colours = ["#ecf4f8", "#e3eef5", "#b0d0e3", "#6cacca", "#328fb1", "#2b7aa3", "#29719c", "#276693", "#25618e", "#235987", "#21507e", "#1e4471", "#1c3c66", "#193259"];
var colourPercents = [0, 2, 9, 14, 18, 24, 27, 31, 34, 39, 47, 59, 70, 84];

function updateGradient(progress) {
  if (progress < 0)
    progress = 0;
  var gradientBuilder = [];

  var current = 0;
  var skyHeight = $('.sky').height();

  for (var i = 0; i < colours.length; i++) {
    current = colourPercents[i] - progress;
    if (current >= 0) {
      gradientBuilder.push(", ");
      gradientBuilder.push(colours[i]);
      gradientBuilder.push(" ");
      gradientBuilder.push(current);
      gradientBuilder.push("%");
      if (current < 0)
        break;
    }
  }
  if (gradientBuilder.length === 5)
    $('.sky').css({
      backgroundColor: gradientBuilder[1],
      backgroundImage: "inherit"
    });
  else {
    gradientBuilder.push(")");
    var gradientCSS = gradientBuilder.join("");
    $('.sky').css({
      backgroundImage: "-webkit-linear-gradient(bottom" + gradientCSS
    }).css({
      backgroundImage: "linear-gradient(to top" + gradientCSS
    });
  }
}

function updateContent(progress) {
  $('.content').css({
    top: contentOffset - progress
  });
}

$(function () {
  contentOffset = $('.sky').position().top;

  $(window).scroll(function (e) {
    var progress = $(window).scrollTop();
    updateGradient(progress / 40);
    updateContent(progress);
  }).scroll();
});