/*global $:false */
(function () {
  "use strict";
  var contentOffset, sky, content, logo,
    colours = ["#ecf4f8", "#e3eef5", "#b0d0e3", "#6cacca", "#328fb1", "#2b7aa3", "#29719c", "#276693", "#25618e", "#235987", "#21507e", "#1e4471", "#1c3c66", "#193259"],
    colourPercents = [0, 2, 9, 14, 18, 24, 27, 31, 34, 39, 47, 59, 70, 84];

  function updateGradient(progress) {
    if (progress < 0) {
      progress = 0;
    }
    var gradientBuilder = [],
      current = 0,
      i,
      gradientCSS;

    for (i = 0; i < colours.length; i += 1) {
      current = colourPercents[i] - progress;
      if (current >= 0) {
        gradientBuilder.push(", ");
        gradientBuilder.push(colours[i]);
        gradientBuilder.push(" ");
        gradientBuilder.push(current);
        gradientBuilder.push("%");
        if (current < 0) {
          break;
        }
      }
    }
    if (gradientBuilder.length === 5) {
      sky.css({
        backgroundColor: gradientBuilder[1],
        backgroundImage: "inherit"
      });
    } else {
      gradientBuilder.push(")");
      gradientCSS = gradientBuilder.join("");
      sky.css({
        backgroundImage: "-webkit-linear-gradient(bottom" + gradientCSS
      }).css({
        backgroundImage: "linear-gradient(to top" + gradientCSS
      });
    }
  }

  function updateContent(progress) {
    content.css({
      top: contentOffset - progress
    });
  }

  function updateLogo(progress) {
    var initialTop = logo.initial.position().top + parseInt(logo.initial.css('margin-top'), 10),
      initialHeight = logo.initial.height(),
      miniTop = logo.mini.position().top + parseInt(logo.mini.css('margin-top'), 10),
      miniHeight = logo.mini.height(),
      finalTopChange = miniTop - initialTop,
      finalHeightChange = miniHeight - initialHeight,
      resizeProgress = progress / 300,
      fadeProgress = (progress - 300) / 100;
      
    if (resizeProgress <= 0) {
      logo.initial.css({ visibility: 'visible' });
      logo.intermediate.css({ visibility: 'hidden' });
      logo.mini.css({ visibility: 'hidden' });
    } else if (resizeProgress <= 1) {
      logo.initial.css({ visibility: 'hidden' });
      logo.intermediate.css({
        visibility: 'visible',
        top: initialTop + (finalTopChange * resizeProgress),
        height: initialHeight + (finalHeightChange * resizeProgress)
      });
      logo.mini.css({ visibility: 'hidden' });
    } else if (fadeProgress <= 1) {
      if (fadeProgress < 0) {
        fadeProgress = 0;
      }
      logo.initial.css({ visibility: 'hidden' });
      logo.intermediate.css({
        visibility: 'visible',
        top: miniTop,
        height: miniHeight
      });
      logo.mini.css({
        visibility: 'visible',
        opacity: fadeProgress
      });
    } else {
      logo.initial.css({ visibility: 'hidden' });
      logo.intermediate.css({ visibility: 'hidden' });
      logo.mini.css({
        visibility: 'visible',
        opacity: 1
      });
    }
  }

  $(function () {
    sky = $('body > .sky');
    content = $('body > .content');
    contentOffset = sky.position().top;
    logo = {
      initial: $('body > .frame > .logo.initial'),
      mini: $('body > .frame > .logo.final'),
      intermediate: $('body > .frame > .logo.intermediate')
    };

    $(window).scroll(function () {
      var progress = $(window).scrollTop();
      updateGradient(progress / 40);
      updateContent(progress);
      updateLogo(progress);
    }).scroll();
  });
}());