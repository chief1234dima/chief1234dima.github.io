window.addEventListener('load', resizeImg);

window.addEventListener('resize', resizeImg);

function resizeImg() {
  var width = window.innerWidth;
  var img = document.querySelector('img.content');
  
  if (width < 600) {
    img.style.marginLeft = '-' + (img.clientWidth - width)/2 + 'px';
  }
  else img.style.marginLeft = 'auto';
}

document.querySelector('.hamburger__icon').addEventListener('click', function () {
  this.classList.toggle('hamburger__icon-change');
  document.querySelector('.nav-aside').classList.toggle('nav__mobile');
});