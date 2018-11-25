window.addEventListener('load', resizeSlider);

// SLIDER
var index = 0;
var dots = document.getElementsByClassName('dot');
var timer;

showSlide(index);

for (var i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', currentSlide);
}

document.querySelector('.prev').addEventListener('click', function () {
  index -= 2;
  showSlide(index);
});

document.querySelector('.next').addEventListener('click', function () {
  showSlide(index);
});

function currentSlide(e) {
  index = e.target.dataset.number;
  showSlide(index);
}

function showSlide(n) {
  if (n >= dots.length) index = 0;
  if (n < 0) index = dots.length - 1;
  
  var slides = document.getElementsByClassName('slider__item');
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
    dots[i].classList.remove('active');
  }
  
  slides[index].style.display = 'block';
  dots[index].classList.add('active');
  clearInterval(timer);
  index++;
  resizeSlider();
  autoSlider();
}

function autoSlider() {
  timer = setTimeout(function () {
    showSlide(index);
  }, 10000);
}

// SWIPE
var startX, startY;
var movementX = 0, id = false;
if (!!window.TouchEvent) {
  // for normal browsers
  document.querySelector('.slider__container').addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  document.querySelector('.slider__container').addEventListener('touchend', function (e) {
    if (Math.abs(e.changedTouches[0].clientX - startX) < 100
      || Math.abs(e.changedTouches[0].clientY - startY) > 100) {
      startX = 0;
      startY = 0;
      return false;
    }
    
    var toward = e.changedTouches[0].clientX > startX; // right or left
    startX = 0;
    startY = 0;
    if (toward) index -= 2;
    showSlide(index);
  });
} else {
    // for IE11 & Edge
    document.querySelector('.slider__container').addEventListener('pointermove', function (e) {
    if (id && id === e.pointerId) movementX += e.movementX;
    
    if (id && id !== e.pointerId)  {
      if (e.movementX !== 0 && e.pointerType === 'touch') {
        id = e.pointerId;
        movementX = e.movementX;
      }
      else {
        id = false;
        movementX = 0;
      }
    }
    
    if (!id && e.movementX !== 0 && e.pointerType === 'touch') {
      id = e.pointerId;
      movementX += e.movementX;
    }
    
    if (movementX > 10 || movementX < -10) {
      if (movementX > 0)  index -= 2;
      
      id = false;
      movementX = 0;
      console.log(index);
      showSlide(index);
    }
  });
}

// SLIDER RESIZE
resizeSlider();
window.addEventListener('resize', resizeSlider);

function resizeSlider() {
  // так не получится
  // var width = document.documentElement.clientWidth;
  var width = window.innerWidth;
  var img = document.querySelectorAll('.slider__item img')[index - 1];
 
  if (width < 1300) {
    img.style.marginLeft = '-' + (img.clientWidth - width)/2 + 'px';
   }
   else img.style.marginLeft = 'auto';
}

// LOCAL STORAGE SET
document.querySelector('.certain-item a').addEventListener('click', function () {
  localStorage.setItem('itemId', '80d32566-d81c-4ba0-9edf-0eceda3b4360');
});

document.querySelector('.banner__item-red').addEventListener('click', function () {
  localStorage.setItem('itemId', '80d32566-d81c-4ba0-9edf-0eceda3b4360');
});