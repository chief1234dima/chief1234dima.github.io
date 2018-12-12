"use strict";

$('.gallery').addEventListener('click', function (e) {
  if (e.target.tagName !== 'IMG') return false;
  var source = e.target.getAttribute('src').replace('thumbnails', 'full_size');
  $('.popup__content').setAttribute('src', source);
  document.body.classList.add('gallery-open');
});
$('.popup__close-btn').addEventListener('click', function () {
  document.body.classList.remove('gallery-open');
});
$('.prev').addEventListener('click', changePhotoByArrow);
$('.next').addEventListener('click', changePhotoByArrow);

(function () {
  var img = $('.popup__content');
  var shiftFlag = false;
  var x;
  var y;

  img.ondragstart = function () {
    return false;
  };

  img.addEventListener('mousedown', startChangeImfByMouse);
  img.addEventListener('mouseup', endChangeImfByMouse);
  img.addEventListener('touchstart', startChangeImfByTouch, {
    passive: false
  });
  img.addEventListener('touchend', endChangeImfByTouch);

  function startChangeImfByMouse(e) {
    shiftFlag = true;
    x = e.clientX;
  }

  function endChangeImfByMouse(e) {
    if (Math.abs(e.clientX - x) < 50) return false;
    var direction = e.clientX > x ? -1 : 1;
    shiftFlag = false;
    changePhoto(direction);
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
    changePhoto(direction);
  }
})();

function changePhotoByArrow(e) {
  var direction = e.target.classList.contains('next') ? 1 : -1;
  changePhoto(direction);
}

function changePhoto(direction) {
  var imgQuantity = $('.gallery').children.length;
  var img = $('.popup__content');
  var index = img.getAttribute('src').split('/');
  index = parseInt(index[index.length - 1]);
  index += direction;
  if (index > imgQuantity) index = 1;
  if (index === 0) index = imgQuantity;
  img.setAttribute('src', "../assets/img/gallery/full_size/".concat(index, ".jpg"));
}