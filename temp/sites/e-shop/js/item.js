"use strict";

itemRendering();

// PAGE TITLE CHANGE
document.querySelector('title').innerHTML = findItem().title;

// PHOTO SWITCHER
document.querySelector('.details__switcher ul').addEventListener('click', function (e) {
  if (e.target.tagName !== 'IMG') return false;
  document.querySelector('.details__switcher_fullImg').setAttribute('src', e.target.getAttribute('src'));
  
  var list = document.querySelectorAll('.details__switcher li');
  for (var i = 0; i < list.length; i++) {
    list[i].classList.remove('active');
  }
  e.target.parentElement.classList.add('active');
});

// COLORS & SIZES SWITCHER
document.querySelector('.info_size').addEventListener('click', switcher);
document.querySelector('.info_color').addEventListener('click', switcher);

function switcher(e) {
  if (e.target.tagName !== 'LI') return false;
  
  var list = e.target.parentElement.querySelectorAll('li');
  for (var i = 0; i < list.length; i++) {
    list[i].classList.remove('active');
  }
  e.target.classList.add('active');
  
  var parent = e.target.parentElement.parentElement;
  if (parent.classList.contains('info_size')) parent.dataset.size = e.target.innerHTML;
    else parent.dataset.color = e.target.innerHTML;
}

// ITEM RENDERING
function itemRendering() {
  var item;
  var container = document.querySelector('.mark');
  
  var tmpl = _.template('<div class="details content" data-id="<%=id%>">\
  \
    <div class="details__switcher">\
      <img class="details__switcher_fullImg" src="<%=preview[0]%>" alt="<%=title%>">\
        <ul>\
          <li class="active"><img src="<%=preview[0]%>" alt="<%=title%>"></li>\
          <li><img src="<%=preview[1]%>" alt="<%=title%>"></li>\
          <li><img src="<%=preview[2]%>" alt="<%=title%>"></li>\
        </ul>\
      </div>\
  \
      <div class="details__info">\
        <h3 class="info_title"><%=title%></h3>\
        \
        <% if(price === null && discountedPrice === null) { %>\
          <div class="info_price"><%=placeholder%></div>\
         <% } else if (price !== discountedPrice) { %>\
          <div class="info_price"><i>&#163;<%=price.toFixed(2)%> <%=Math.round(discountedPrice/price*100 - 100)%>% </i>\
          &#163;<%=discountedPrice.toFixed(2)%></div>\
         <% } else { %>\
          <div class="info_price">&#163;<%=discountedPrice.toFixed(2)%></div>\
         <% } %>\
        <div class="info_description"><%=description%></div>\
        \
        <div class="info_size" data-size="<%=sizes[0]%>">\
          <span>Size</span>\
          <ul>\
            <li class="active"><%=sizes[0]%></li>\
            <% for (var i=1; i<sizes.length; i++) { %>\
            <li><%=sizes[i]%></li>\
            <% } %>\
          </ul>\
        </div>\
        \
        <div class="info_color" data-color="<%=colors[0]%>">\
          <span>Color</span>\
          <ul>\
            <li class="active"><%=colors[0]%></li>\
            <% for (var i=1; i<colors.length; i++) { %>\
            <li><%=colors[i]%></li>\
            <% } %>\
          </ul>\
         </div>\
         <div class="btn">Add to bag</div>\
        </div>\
       </div>\
  ');

  item = tmpl(findItem());
  container.insertAdjacentHTML('afterEnd', item);
}

function findItem() {
  var itemId = localStorage.getItem('itemId') || 'ccc8a5d5-7cdf-4706-95f2-abc64761400d';
  for (var i = 0; i < catalog.length; i++) {
    if (catalog[i].id === itemId) return catalog[i];
  }
}

// LOCAL STORAGE SET
document.querySelector('.banner__left').addEventListener('click', function () {
  localStorage.setItem('itemId', '80d32566-d81c-4ba0-9edf-0eceda3b4360');
});

document.querySelector('.banner .tablet').addEventListener('click', function () {
  localStorage.setItem('itemId', '5677f851-1c4a-4e9b-80e9-16d1e6265257');
});

document.querySelector('.banner .desktop').addEventListener('click', function () {
  localStorage.setItem('itemId', '739d3ae0-6dca-4453-a7a4-a94b841a296d');
});

// SHOPPING CART
document.querySelector('.details .btn').addEventListener('click', function () {
  var item = {};
  item.id = document.querySelector('.details').dataset.id;
  item.size = document.querySelector('.info_size').dataset.size;
  item.color = document.querySelector('.info_color').dataset.color;
  item.price = document.querySelector('.info_price').innerHTML.slice(1);
  item.quantity = 1;
  
  if (!parseFloat(item.price)) {
    if (item.price.indexOf('%') === -1) return false;
      else {
        item.price = item.price.slice(item.price.lastIndexOf('£') + 1);
    }
  }
  
  changeCart(item);
});

function changeCart(obj) {
  //change local storage
  if (localStorage.getItem('cart')) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var flag = true;
    
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === obj.id && cart[i].size === obj.size && cart[i].color === obj.color) {
        cart[i].quantity++;
        flag = false;
        break;
      }
    }
    if (flag) cart.push(obj);
  
  } else {
    cart = [obj];
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  
  //change cart rendering
  bagIconRendering();
}