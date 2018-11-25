bagIconRendering();

// MENU
document.querySelector('.menu__icon').addEventListener('click', function () {
  this.classList.toggle('menu__icon-change');
  document.querySelector('header').classList.toggle('nav__mobile');
  document.querySelector('header').classList.toggle('content');
});

window.addEventListener('resize', function () {
  var header = document.querySelector('header');
  if (header.classList.contains('nav__mobile')
    && window.innerWidth > 767) {
    header.classList.toggle('nav__mobile');
    header.classList.toggle('content');
    document.querySelector('.menu__icon').classList.toggle('menu__icon-change');
  }
});

// SEARCH
document.querySelector('.search button').addEventListener('click', function () {
  if (document.documentElement.clientWidth > 767
    && document.documentElement.clientWidth < 1024) {
    document.querySelector('.search input').classList.toggle('wide');
  }
});

window.addEventListener('resize', function () {
  var input = document.querySelector('.search input');
  if (window.innerWidth > 1023
    && input.classList.contains('wide')) {
    input.classList.remove('wide');
  }
});

// BAG BUTTON
function bagIconRendering() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var bagTotal = document.querySelector('.bag__total');
  var bagQuantity = document.querySelector('.bag__quantity');
  var total = 0;
  var quantity = 0;
  
  if (!cart || cart.length === 0) {
    bagTotal.innerHTML = '';
    bagQuantity.innerHTML = '0';
    
  } else {
    for (var i = 0; i < cart.length; i++) {
      total += Math.round(parseFloat(cart[i].price) * 100) * cart[i].quantity;
      quantity += cart[i].quantity;
    }
    bagTotal.innerHTML = '&#163;' +  (total / 100).toFixed(2);
    bagQuantity.innerHTML = quantity;
  }
}