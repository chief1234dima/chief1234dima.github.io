window.addEventListener('load', () => {
  setTimeout(function(){
    document.querySelector('.loader-box').style.display = 'none';
  }, 500);
});

/*
 * For shorter code
 */
let $ = (elem) => document.querySelector(elem);

new Slider($('.slider'));

situateStickyHeader();

$('.nav-toggle').addEventListener('click', () => {
  $('.nav-toggle__icon').classList.toggle('nav-toggle-close');
  $('header .main-menu').classList.toggle('menu-open');
});

$('.btn-proceed').addEventListener('click', () => smoothScroll($('.about-us'), 80));

window.addEventListener('scroll', situateStickyHeader);

$('.btn-up').addEventListener('click', () => smoothScroll(document.documentElement, 0));

/*--------------------------------
*  Slider
* -------------------------------*/

/*
 * Creates new slider
 */
function Slider(elem) {
  let offset = -100;
  /* TODO ф-ция инициализации:
   * TODO 1) расставить data-slide-index
   * TODO 2) добавить end & start nodes via nodeClone()
   */
  let eventFlag = true;
  //set handlers start
  window.addEventListener('resize', setImgOffset);
  elem.querySelector('.prev').addEventListener('click', changeSlider);
  elem.querySelector('.next').addEventListener('click', changeSlider);
  Array.prototype.slice.call(elem.querySelectorAll('.slider-pagination button'))
    .forEach( (item) => item.addEventListener('click', changeSlider) );
  //set handlers end
  
  setImgOffset();
  
  /**
   * @description Handler for buttons' click events
   *
   * @param {object} e - Event object
   */
  function changeSlider(e) {
    let direction;
    if (!eventFlag || e.target.classList.contains('dot-active')) return false;
    if (e.target.classList.contains('dot')) {
      const activeDot = elem.querySelector('.slider-pagination .dot-active');
      direction = `${activeDot.dataset.dotIndex - e.target.dataset.dotIndex}00`
      if (direction > 0) direction = `+${direction}`;
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
    const sliderBox = elem.querySelector('.slider-box');
    let activeSlide = sliderBox.querySelector('.slide-active');
    offset += +direction;
  
    sliderBox.style.transition = 'transform 0.2s';
    sliderBox.style.transform = `translateX(${offset}vw)`;
    activeSlide.classList.remove('slide-active');
    sliderBox.children[activeSlide.dataset.slideIndex - +`${direction[0]}${direction[1]}`]
      .classList.add('slide-active');
    setImgOffset();
    
    setTimeout(() => {
      eventFlag = true;
      sliderBox.style.transition = '';
      }, 200);
    
    activeSlide = sliderBox.querySelector('.slide-active');
    if ( isNaN(+activeSlide.dataset.slideIndex) ) {
      setTimeout(() => {
        activeSlide.classList.remove('slide-active');
        if (activeSlide.dataset.slideIndex === 'start') {
          offset = +`-${sliderBox.children.length - 2}00`;
          sliderBox.children[sliderBox.children.length - 2]
            .classList.add('slide-active');
        } else {
          offset = -100;
          sliderBox.children[1].classList.add('slide-active');
        }
        sliderBox.style.transform = `translateX(${offset}vw)`;
        setImgOffset();
        changeActiveDot();
      }, 200);
    } else {
      setTimeout(() => { changeActiveDot(); }, 200);
    }
  }
  
  /**
   * @description Changes active dot
   */
  function changeActiveDot() {
    const dotBox = elem.querySelector('.slider-pagination');
    let index = parseInt(elem.querySelector('.slider-box')
      .style.transform.split('-')[1]) /100 - 1;
    index = (index < 0) ? 0 : index;
    index = (index >= dotBox.children.length) ? (dotBox.children.length - 1) : index;
  
    elem.querySelector('.dot-active').classList.remove('dot-active');
    dotBox.children[index].classList.add('dot-active');
  }
  
  /**
   * @description Centers the image
   */
  function setImgOffset() {
    const width = document.documentElement.clientWidth,
      height = document.documentElement.clientHeight;
    let backgroundPosition = '';
    
    backgroundPosition += (height / 9 * 16 > width)
      ? `-${(height / 9 * 16 - width) / 2}px ` : '0%';
    backgroundPosition += (width / 16 * 9 > height)
      ? `-${(width / 16 * 9 - height) / 2}px` : '0%';
    
    elem.querySelector('.slider-box .slide-active')
      .style.backgroundPosition = backgroundPosition;
  }
}

/*--------------------------------
 *  Animation
 * -------------------------------*/
(function () {
  const list = Array.prototype.slice
    .call($('.about-us__desc').querySelectorAll('img'));
  addAnimation();
  window.addEventListener('scroll', addAnimation);
  
  function addAnimation() {
    const pageHeight = document.documentElement.scrollTop + document.documentElement.clientHeight;
    list.forEach( (elem, i) => {
      if (pageHeight >= elem.offsetTop + elem.offsetHeight / 2) {
        elem.classList.add(elem.dataset.animate);
        list.splice(i, 1);
      }
    });
    if (list.length === 0) window.removeEventListener('scroll', addAnimation);
  }
})();

function smoothScroll(elem, offset) {
  let coordY,
      timer,
      shift;
  scroll();
  function scroll() {
    coordY = elem.getBoundingClientRect().top - offset;
    shift = coordY > 0 ? 30 : -30;
    
    if (coordY !== 0) {
      if (coordY > 0
        && (document.documentElement.scrollTop + document.documentElement.clientHeight)
          >= document.documentElement.scrollHeight) {
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
window.addEventListener('resize', () => {
  let menu = $('header .main-menu');
  if (menu.classList.contains('menu-open')
    && document.documentElement.clientWidth > 767) {
      menu.classList.remove('menu-open');
      $('.nav-toggle__icon').classList.toggle('nav-toggle-close');
  }
  // if (menu.classList.contains('menu-hide')
  //   && window.innerWidth > 767) {
  //   menu.classList.remove('menu-hide');
  // }
});

/*--------------------------------
 *  Comments
 * -------------------------------*/
(function () {
  const comments = [{
    text: 'Хочу выразить слова благодарности Анастасии Олеговне и Софии Владимировне ' +
    'за ту теплую, дружелюбную и уютную атмосферу, которую они создают во время занятий...',
    author: 'Галина Олейник'
  }, {
    text: 'Дорогие девочки! Спасибо за вашу любовь, заботу и очень тяжелый труд! Вы помогаете ' +
    'не только детишкам, но и родителям поверить в лучшее, и обрести надежду...',
    author: 'Інга Браславська'
  }, {
    text: 'Дякую за тренінг "Стоп незнайомець!". Сподобалась організація, діти всі дві години були зацікавлені ' +
    'та залучені. Успіхів! Робіть ще щось цікаве та корисне.',
    author: 'Dariya Venzel'
  }, {
    text: 'Уже несколько лет занимаемся со специалистами этого центра. Очень довольны результатами. Особая благодарность ' +
    'Анастасии Олеговне!!! Всем рекомендую.',
    author: 'Алена Косолапова'
  }];
  
  $('.comment__text').innerHTML = `"${comments[comments.length - 1].text}"`;
  $('.comment__author').innerHTML = comments[comments.length - 1].author;
  
  $('.comments .prev').addEventListener('click', changeComment);
  $('.comments .next').addEventListener('click', changeComment);
  
  function changeComment(e) {
    let text, author;
    const commentText = $('.comment__text');
    if (e.target.classList.contains('next')) {
      ({text, author} = comments[0]);
      comments.push(comments.shift());
    } else {
      comments.unshift(comments.pop());
      ({text, author} = comments[comments.length - 1]);
    }
    
    commentText.innerHTML = `"${text}"`;
    $('.comment__author').innerHTML = author;
    commentText.classList.add('fade-in');
    setTimeout(() => {
      commentText.classList.remove('fade-in');
    }, 300);
  }
})();


