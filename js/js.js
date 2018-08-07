"use strict";

window.addEventListener('load', function () {
  document.querySelector('.start-content').classList.add('translate-0');
});

/*-------------------------------------------
     Video
 -------------------------------------------*/

document.querySelector('.bg-video source + source').addEventListener('error', function () {
  document.querySelector('.loader-box').style.display = 'none';
  document.body.classList.add('no-video');
});

document.querySelector('.bg-video').addEventListener('canplay', function () {
  document.querySelector('.loader-box').style.display = 'none';
});

document.querySelector('.video-off').addEventListener('click', function () {
  document.body.classList.add('disable-video');
});

document.querySelector('.video-on').addEventListener('click', function () {
  document.body.classList.remove('disable-video');
});

/*-------------------------------------------
    Modal
-------------------------------------------*/

document.querySelector('.start .dark-btn').addEventListener('click', function () {
    document.querySelector('.modal').classList.add('show');
});

document.querySelector('.modal').addEventListener('click', function (e) {
  if ( e.target === document.querySelector('.modal')
    || e.target === document.querySelector('.icon-cancel')
    || e.target.classList.contains('close') )
    document.querySelector('.modal').classList.remove('show');
});

/*-------------------------------------------
     Main content
 -------------------------------------------*/

document.querySelector('.icon-menu').addEventListener('click', showMainContent);

document.querySelector('.start .alert-btn').addEventListener('click', showMainContent);

document.querySelector('.start .overlay').addEventListener('click', hideMainContent);

document.querySelector('main .close-button').addEventListener('click', hideMainContent);

function showMainContent() {
  var mainContent = document.querySelector('main');
  
  document.querySelector('.bg-video').pause();
  mainContent.classList.add('show');
  mainContent.classList.remove('hide');
  mainContent.style.display = 'block';
  document.querySelector('.start').classList.add('hide');
  document.body.style.overflow = 'hidden';
  
  if (window.innerWidth > 910) setTimeout(function () {
    document.querySelector('.aside-nav').style.display = 'block';
  }, 1000);
  
  document.querySelector('.start .overlay').removeEventListener('click', hideMainContent);
  document.querySelector('main .close-button').removeEventListener('click', hideMainContent);
  
  setTimeout(function () {
    document.body.style.overflow = 'auto';
    document.querySelector('.start .overlay').addEventListener('click', hideMainContent);
    document.querySelector('main .close-button').addEventListener('click', hideMainContent);
  }, 1000);
}

function hideMainContent() {
  var mainContent = document.querySelector('main');
  
  document.querySelector('.bg-video').play();
  mainContent.classList.remove('show');
  mainContent.classList.add('hide');
  document.body.style.overflow = 'hidden';
  document.querySelector('.start').classList.remove('hide');
  document.querySelector('.aside-nav').style.display = 'none';
  
  setTimeout(function () {
    document.body.style.overflow = 'auto';
    mainContent.style.display = 'none';
  }, 1000);
}

/*-------------------------------------------
     Skills
 -------------------------------------------*/

window.addEventListener('load', skillMonthCalc);

document.querySelector('.skill-link').addEventListener('click', skillMonthCalc);

function skillMonthCalc() {
  var monthQuantity,
    now = new Date(),
    myDates = [new Date(2017, 6, 1), new Date(2017, 6, 1), new Date(2017, 9, 1), new Date(2018, 5, 1)],
    skills = document.querySelectorAll('.skill-item');
  
  for (var i = 0; i < skills.length; i++) {
    skills[i].querySelector('output').innerHTML = '0';
    monthQuantity = (now.getFullYear() - myDates[i].getFullYear()) * 12 - myDates[i].getMonth() + now.getMonth();
    monthUp(skills[i].querySelector('output'), monthQuantity);
  }
}

function monthUp(elem, num) {
  if (elem.innerHTML < num) {
    elem.innerHTML = +elem.innerHTML + 1;
    setTimeout(monthUp, 100, elem, num);
  }
}

/*-------------------------------------------
     Aside navigation
 -------------------------------------------*/

// document.addEventListener('scroll', function() {
//   var scrolled = window.pageYOffset || document.documentElement.scrollTop;
//   document.querySelector('.aside-nav').style.top = scrolled + 'px';
// });

document.querySelector('.aside-nav').addEventListener('click', function (e) {
  if (e.target.tagName === 'SPAN'){
    e.preventDefault();
    smoothScroll( document.querySelector( e.target.parentNode.getAttribute('href') ));
  }
});

document.querySelector('.about-me__description').addEventListener('click', function (e) {
  if (e.target.tagName === 'A'){
    e.preventDefault();
    smoothScroll( document.querySelector( e.target.getAttribute('href') ));
  }
});

function smoothScroll(elem) {
  var coordY,
      timer,
      shift;
  scroll();
  function scroll() {
    coordY = elem.getBoundingClientRect().top;
    shift = coordY > 0 ? 30 : -30;

    if (coordY !== 0) {
      if (coordY > 0 && (window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight)
        return false;
      
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

/*-------------------------------------------
     Scroll up button
 -------------------------------------------*/

document.addEventListener('scroll', function() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  var button = document.querySelector('.up-button');
  if (scrolled > 200 && window.innerWidth > 600) {
    button.style.display = 'block';
    if (button.classList.contains('hide')) button.classList.remove('hide');
  } else {
    if (button.style.display === 'block') {
      button.classList.add('hide');
      setTimeout(function () {
        button.style.display = 'none';
      }, 300);
    }
  }
});

document.querySelector('.up-button').addEventListener('click', function (e) {
  e.preventDefault();
  smoothScroll( document.querySelector('.about-me'));
});
