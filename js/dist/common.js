"use strict";

/*
 * For shorter code
 */
var $ = function $(elem) {
  return document.querySelector(elem);
};

new Slider($('.slider'));
situateStickyHeader();
$('.nav-toggle').addEventListener('click', function () {
  $('.nav-toggle__icon').classList.toggle('nav-toggle-close');
  $('header .main-menu').classList.toggle('menu-open');
});
$('.btn-proceed').addEventListener('click', function () {
  return smoothScroll($('.about-us'), 80);
});
window.addEventListener('scroll', situateStickyHeader);
$('.btn-up').addEventListener('click', function () {
  return smoothScroll(document.documentElement, 0);
});
/*--------------------------------
*  Slider
* -------------------------------*/

/*
 * Creates new slider
 */

function Slider(elem) {
  var offset = -100;
  /* TODO ф-ция инициализации:
   * TODO 1) расставить data-slide-index
   * TODO 2) добавить end & start nodes via nodeClone()
   */

  var eventFlag = true; //set handlers start

  window.addEventListener('resize', setImgOffset);
  elem.querySelector('.prev').addEventListener('click', changeSlider);
  elem.querySelector('.next').addEventListener('click', changeSlider);
  Array.prototype.slice.call(elem.querySelectorAll('.slider-pagination button')).forEach(function (item) {
    return item.addEventListener('click', changeSlider);
  }); //set handlers end

  setImgOffset();
  /**
   * @description Handler for buttons' click events
   *
   * @param {object} e - Event object
   */

  function changeSlider(e) {
    var direction;
    if (!eventFlag || e.target.classList.contains('dot-active')) return false;

    if (e.target.classList.contains('dot')) {
      var activeDot = elem.querySelector('.slider-pagination .dot-active');
      direction = "".concat(activeDot.dataset.dotIndex - e.target.dataset.dotIndex, "00");
      if (direction > 0) direction = "+".concat(direction);
    } else {
      direction = e.target.classList.contains('prev') ? '+100' : '-100';
    }

    eventFlag = false;
    shiftSlider(direction);
  }
  /**
   * @description Shows new slider item in depending on direction
   *
   * @param {string} direction - '+' or '-'
   */


  function shiftSlider(direction) {
    var sliderBox = elem.querySelector('.slider-box');
    var activeSlide = sliderBox.querySelector('.slide-active');
    offset += +direction;
    sliderBox.style.transition = 'transform 0.2s';
    sliderBox.style.transform = "translateX(".concat(offset, "vw)");
    activeSlide.classList.remove('slide-active');
    sliderBox.children[activeSlide.dataset.slideIndex - +"".concat(direction[0]).concat(direction[1])].classList.add('slide-active');
    setImgOffset();
    setTimeout(function () {
      eventFlag = true;
      sliderBox.style.transition = '';
    }, 200);
    activeSlide = sliderBox.querySelector('.slide-active');

    if (isNaN(+activeSlide.dataset.slideIndex)) {
      setTimeout(function () {
        activeSlide.classList.remove('slide-active');

        if (activeSlide.dataset.slideIndex === 'start') {
          offset = +"-".concat(sliderBox.children.length - 2, "00");
          sliderBox.children[sliderBox.children.length - 2].classList.add('slide-active');
        } else {
          offset = -100;
          sliderBox.children[1].classList.add('slide-active');
        }

        sliderBox.style.transform = "translateX(".concat(offset, "vw)");
        setImgOffset();
        changeActiveDot();
      }, 200);
    } else {
      setTimeout(function () {
        changeActiveDot();
      }, 200);
    }
  }
  /**
   * @description Changes active dot
   */


  function changeActiveDot() {
    var dotBox = elem.querySelector('.slider-pagination');
    var index = parseInt(elem.querySelector('.slider-box').style.transform.split('-')[1]) / 100 - 1;
    index = index < 0 ? 0 : index;
    index = index >= dotBox.children.length ? dotBox.children.length - 1 : index;
    elem.querySelector('.dot-active').classList.remove('dot-active');
    dotBox.children[index].classList.add('dot-active');
  }
  /**
   * @description Centers the image
   */


  function setImgOffset() {
    var width = document.documentElement.clientWidth,
        height = document.documentElement.clientHeight;
    var backgroundPosition = '';
    backgroundPosition += height / 9 * 16 > width ? "-".concat((height / 9 * 16 - width) / 2, "px ") : '0%';
    backgroundPosition += width / 16 * 9 > height ? "-".concat((width / 16 * 9 - height) / 2, "px") : '0%';
    elem.querySelector('.slider-box .slide-active').style.backgroundPosition = backgroundPosition;
  }
}
/*--------------------------------
 *  Animation
 * -------------------------------*/


(function () {
  var list = Array.prototype.slice.call($('.about-us__desc').querySelectorAll('img'));
  addAnimation();
  window.addEventListener('scroll', addAnimation);

  function addAnimation() {
    var pageHeight = document.documentElement.scrollTop + document.documentElement.clientHeight;
    list.forEach(function (elem, i) {
      if (pageHeight >= elem.offsetTop + elem.offsetHeight / 2) {
        elem.classList.add(elem.dataset.animate);
        list.splice(i, 1);
      }
    });
    if (list.length === 0) window.removeEventListener('scroll', addAnimation);
  }
})();

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
  } // if (menu.classList.contains('menu-hide')
  //   && window.innerWidth > 767) {
  //   menu.classList.remove('menu-hide');
  // }

});