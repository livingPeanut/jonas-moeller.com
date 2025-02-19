
gsap.registerPlugin(ScrollTrigger);

// Usage: var $element = getMostVisible($('.elements' ));
function getMostVisible($elements) {
  var element,
      viewportHeight = $(window).height(),
      max = 0;

  $elements.each(function() {
      var visiblePx = getVisibleHeightPx($(this), viewportHeight);

      if (visiblePx > max) {
          max = visiblePx;
          element = this;
      }
  });

  return $elements.filter(element);
}

function getVisibleHeightPx($element, viewportHeight) {
  var rect = $element.get(0).getBoundingClientRect(),
      height = rect.bottom - rect.top,
      visible = {
          top: rect.top >= 0 && rect.top < viewportHeight,
          bottom: rect.bottom > 0 && rect.bottom < viewportHeight
      },
      visiblePx = 0;

  if (visible.top && visible.bottom) {
      // Whole element is visible
      visiblePx = height;
  } else if (visible.top) {
      visiblePx = viewportHeight - rect.top;
  } else if (visible.bottom) {
      visiblePx = rect.bottom;
  } else if (height > viewportHeight && rect.top < 0) {
      var absTop = Math.abs(rect.top);

      if (absTop < height) {
          // Part of the element is visible
          visiblePx = height - absTop;
      }
  }

  return visiblePx;
}




$(document).ready(function(){
  $(document).on("scroll", function(){
    const most_visible = getMostVisible($("main, footer"))[0]; //HTML Element

    if (most_visible == $("footer")[0]){
      $("#nav-about").removeClass("active");
      $("#nav-contact").addClass("active");
    } else{
      $("#nav-contact").removeClass("active");
      $("#nav-about").addClass("active");
    }
    
  });



  gsap.to(".title-text",{
    yPercent: -100,
    ease: "none",
    ScrollTrigger: {
      trigger: "#photographer",
      scrub: true
    }
  });

  gsap.to(".grid-wrapper",{
    yPercent: 10,
    ease: "none",
    ScrollTrigger: {
      trigger: "#photographer",
      srub: true
    }
  });
});