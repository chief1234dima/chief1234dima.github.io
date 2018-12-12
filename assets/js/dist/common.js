"use strict";

/* global window, document */
// For shorter code
var $ = function $(elem) {
  return document.querySelector(elem);
};

situateStickyHeader();
$('.nav-toggle').addEventListener('click', function () {
  $('body').classList.toggle('over-hidden');
  $('.nav-toggle__icon').classList.toggle('nav-toggle-close');
  $('header .main-menu').classList.toggle('menu-open');
});
window.addEventListener('scroll', situateStickyHeader);
$('.btn-up').addEventListener('click', function () {
  return smoothScroll(document.documentElement, 0);
});
/*--------------------------------
 *  Animation
 * -------------------------------*/

function smoothScroll(elem, offset) {
  var coordY, timer, shift;
  scroll();

  function scroll() {
    coordY = elem.getBoundingClientRect().top - offset;
    shift = coordY > 0 ? 30 : -30;

    if (coordY !== 0) {
      if (coordY > 0 && document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        return false;
      }

      if (coordY > 30 || coordY < -30) {
        window.scrollBy(0, shift);
        timer = setTimeout(scroll, 15);
      } else {
        window.scrollBy(0, coordY);
        clearTimeout(timer);
        return false;
      }
    }
  }
}

function situateStickyHeader() {
  if (document.documentElement.clientWidth < 768) return false;

  if (document.documentElement.scrollTop >= 200) {
    $('header').classList.add('sticky-header');
    $('.btn-up').classList.add('is-active');
  } else {
    $('header').classList.remove('sticky-header');
    $('.btn-up').classList.remove('is-active');
  }
}
/*
 * Layout maintenance
 */


window.addEventListener('resize', function () {
  var menu = $('header .main-menu');

  if (menu.classList.contains('menu-open') && document.documentElement.clientWidth > 767) {
    menu.classList.remove('menu-open');
    $('.nav-toggle__icon').classList.toggle('nav-toggle-close');
    $('body').classList.remove('over-hidden');
  }
});
/*--------------------------------
 *  Services Scroll
 * -------------------------------*/

(function () {
  if (window.location.href.indexOf('services.html') === -1) return false;
  var elem = $('.items'); // wheel horizontally instead of vertically

  window.addEventListener('wheel', function (e) {
    var delay = e.deltaY;
    if (delay > 0 && delay < 100) delay = 100;
    if (delay < 0 && delay > -100) delay = -100;
    elem.scrollLeft += delay;
  }, {
    passive: false
  }); // button .next appearance

  var arrow = $('.next');
  elem.addEventListener('scroll', function () {
    if (elem.offsetWidth + elem.scrollLeft >= elem.scrollWidth) {
      arrow.style.display = 'none';
    } else {
      arrow.style.display = '';
    }
  }); // shift the elem via button clicking

  arrow.addEventListener('click', function () {
    var elemScroll = elem.scrollLeft;
    var timer;
    var width = elem.scrollWidth / elem.children.length;
    scroll();

    function scroll() {
      if (width > 30) {
        elem.scrollLeft += 30;
        width -= 30;
        timer = setTimeout(scroll, 15);
      } else {
        width = elem.scrollWidth / elem.children.length;
        elem.scrollLeft = width + elemScroll;
        clearTimeout(timer);
        return false;
      }
    }
  }); // move by mouse

  var shiftFlag = false;
  var x;

  elem.ondragstart = function () {
    return false;
  };

  elem.addEventListener('mousedown', startSliderMove);
  elem.addEventListener('mousemove', moveSlider);
  elem.addEventListener('mouseup', endSliderMove);

  function startSliderMove(e) {
    shiftFlag = true;
    x = e.clientX;
  }

  function moveSlider(e) {
    if (!shiftFlag) return false;
    e.target.addEventListener('click', prevent);
    elem.scrollLeft += x - e.clientX;
    x = e.clientX;
  }

  function endSliderMove(e) {
    shiftFlag = false;
    setTimeout(function () {
      e.target.removeEventListener('click', prevent);
    }, 0);
  }

  function prevent(e) {
    e.stopPropagation();
    e.preventDefault();
  }
})();
/*--------------------------------
 *  Spelt
 * -------------------------------*/


(function () {
  var list = Array.prototype.slice.call(document.querySelectorAll('.spelt'));

  if (list.length !== 0) {
    list.forEach(function (item) {
      var arr = item.innerHTML.split('');
      arr = arr.map(function (letter) {
        return letter === ' ' ? '<p></p>' : "<span>".concat(letter, "</span>");
      });
      item.innerHTML = arr.join('');
    });
  }
})();