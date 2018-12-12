"use strict";

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    $('.loader-box').style.display = 'none';
  }, 400);
});
new Slider($('.slider'));
$('.btn-proceed').addEventListener('click', function () {
  if (document.documentElement.clientWidth > 767) {
    smoothScroll($('.about-us'), 80);
  } else {
    smoothScroll($('.about-us'), 0);
  }
});
/*--------------------------------
 *  Slider
 * -------------------------------*/

/*
 * Creates new slider
 */

function Slider(elem) {
  var offset = -100;
  var eventFlag = true;
  var shiftFlag = false;
  var x;
  var y; //set handlers start

  window.addEventListener('resize', setImgOffset);
  elem.querySelector('.prev').addEventListener('click', changeSlider);
  elem.querySelector('.next').addEventListener('click', changeSlider);
  Array.prototype.slice.call(elem.querySelectorAll('.slider-pagination button')).forEach(function (item) {
    return item.addEventListener('click', changeSlider);
  });
  elem.addEventListener('mousedown', startChangeImfByMouse);
  elem.addEventListener('mouseup', endChangeImfByMouse);
  elem.addEventListener('touchstart', startChangeImfByTouch, {
    passive: false
  });
  elem.addEventListener('touchend', endChangeImfByTouch); //set handlers end

  function startChangeImfByMouse(e) {
    shiftFlag = true;
    x = e.clientX;
  }

  function endChangeImfByMouse(e) {
    if (Math.abs(e.clientX - x) < 50) return false;
    var direction = e.clientX > x ? '+100' : '-100';
    shiftFlag = false;
    shiftSlider(direction);
  }

  function startChangeImfByTouch(e) {
    shiftFlag = true;
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  }

  function endChangeImfByTouch(e) {
    if (Math.abs(e.changedTouches[0].clientX - x) < Math.abs(e.changedTouches[0].clientY - y) || Math.abs(e.changedTouches[0].clientX - x) < 50) return false;
    var direction = e.changedTouches[0].clientX > x ? '+100' : '-100';
    shiftFlag = false;
    shiftSlider(direction);
  }

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
 *  Comments
 * -------------------------------*/


(function () {
  var comments = [{
    text: 'Хочу выразить слова благодарности Анастасии Олеговне и Софии Владимировне ' + 'за ту теплую, дружелюбную и уютную атмосферу, которую они создают во время занятий...',
    author: 'Галина Олейник'
  }, {
    text: 'Дорогие девочки! Спасибо за вашу любовь, заботу и очень тяжелый труд! Вы помогаете ' + 'не только детишкам, но и родителям поверить в лучшее, и обрести надежду...',
    author: 'Інга Браславська'
  }, {
    text: 'Дякую за тренінг "Стоп незнайомець!". Сподобалась організація, діти всі дві години були зацікавлені ' + 'та залучені. Успіхів! Робіть ще щось цікаве та корисне.',
    author: 'Dariya Venzel'
  }, {
    text: 'Уже несколько лет занимаемся со специалистами этого центра. Очень довольны результатами. Особая благодарность ' + 'Анастасии Олеговне!!! Всем рекомендую.',
    author: 'Алена Косолапова'
  }];
  $('.comment__text').innerHTML = "\"".concat(comments[comments.length - 1].text, "\"");
  $('.comment__author').innerHTML = comments[comments.length - 1].author;
  $('.comments .prev').addEventListener('click', changeCommentByArrow);
  $('.comments .next').addEventListener('click', changeCommentByArrow);

  (function () {
    var elem = $('.comments');
    var shiftFlag = false;
    var x;
    var y;

    elem.ondragstart = function () {
      return false;
    };

    elem.addEventListener('mousedown', startChangeImfByMouse);
    elem.addEventListener('mouseup', endChangeImfByMouse);
    elem.addEventListener('touchstart', startChangeImfByTouch, {
      passive: false
    });
    elem.addEventListener('touchend', endChangeImfByTouch);

    function startChangeImfByMouse(e) {
      shiftFlag = true;
      x = e.clientX;
    }

    function endChangeImfByMouse(e) {
      if (Math.abs(e.clientX - x) < 50) return false;
      var direction = e.clientX > x ? -1 : 1;
      shiftFlag = false;
      changeComment(direction);
    }

    function startChangeImfByTouch(e) {
      shiftFlag = true;
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }

    function endChangeImfByTouch(e) {
      if (Math.abs(e.changedTouches[0].clientX - x) < Math.abs(e.changedTouches[0].clientY - y) || Math.abs(e.changedTouches[0].clientX - x) < 50) return false;
      var direction = e.changedTouches[0].clientX > x ? -1 : 1;
      shiftFlag = false;
      changeComment(direction);
    }
  })();

  function changeCommentByArrow(e) {
    var direction = e.target.classList.contains('next') ? 1 : -1;
    changeComment(direction);
  }

  function changeComment(direction) {
    var commentText = $('.comment__text');
    var text;
    var author;

    if (direction > 0) {
      var _comments$ = comments[0];
      text = _comments$.text;
      author = _comments$.author;
      comments.push(comments.shift());
    } else {
      comments.unshift(comments.pop());
      var _comments = comments[comments.length - 1];
      text = _comments.text;
      author = _comments.author;
    }

    commentText.innerHTML = "\"".concat(text, "\"");
    $('.comment__author').innerHTML = author;
    commentText.classList.add('fade-in');
    setTimeout(function () {
      commentText.classList.remove('fade-in');
    }, 300);
  }
})();
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