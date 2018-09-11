"use strict";

cartRendering();

document.querySelector('.cart__btn-box_empty').addEventListener('click', clearCart);

document.querySelector('.cart__btn-box_buy').addEventListener('click', clearCart);

// LOCAL STORAGE SET
var items = document.querySelectorAll('.item_img');
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener('click', function (e) {
    var parent = e.target;
    while (!parent.classList.contains('cart__item')) parent = parent.parentElement;
    var itemId = parent.dataset.id;
    localStorage.setItem('itemId', itemId);
  });
}

// CART RENDERING
function cartRendering() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var container = document.querySelector('.cart__container');
  var item;
  
  container.innerHTML = '';
  if (!cart || cart.length === 0) {
    showEmptyCart(0);
    totalPriceRendering();
    return false;
  }
  
  var tmpl = _.template('<div class="cart__item" data-id="<%=id%>">\
    <a href="item.html" class="item_img <% var i = (hasNew) ? \'new\' : \'\'%> <%=i%>">\
      <div class="wrap">\
      <img src="<%=thumbnail%>" alt="to <%=title%> details">\
      <div class="layer centered-content">View item</div>\
     </div>\
    </a>\
    \
    <div class="item_description">\
      <span class="item_title"><%=title%></span>\
      <span class="item_price">&#163;<%=price.toFixed(2)%></span>\
      <div>Color: <span class="item_color"><%=color%></span></div>\
      <div>Size: <span class="item_size"><%=size%></span></div>\
      <div class="item_quantity">Quantity:\
        <span role="button" aria-label="decrease" class="down"> —</span>\
        <span class="quantity">  <%=quantity%>  </span>\
        <span role="button" aria-label="increase" class="up">+</span>\
       </div>\
       <span role="button" aria-label="remove" class="btn">Remove item</span>\
      </div>\
     </div>\
  ');
  
  for (var i = 0; i < cart.length; i++) {
    item = {};
    for (var j = 0; j < catalog.length; j++) {
      if (cart[i].id === catalog[j].id) {
        item = cart[i];
        item.title = catalog[j].title;
        item.hasNew = catalog[j].hasNew;
        item.thumbnail = catalog[j].thumbnail;
        item.price = +cart[i].price;
        break;
      }
    }
  
    container.insertAdjacentHTML('afterBegin', tmpl(item));
  }
  // add listeners
  var removeBtnList = document.querySelectorAll('.item_description .btn');
  for (i = 0; i < removeBtnList.length; i++) {
    removeBtnList[i].addEventListener('click', removeItem);
  }
  
  var quantityList = document.querySelectorAll('.item_description .item_quantity');
  for (i = 0; i < removeBtnList.length; i++) {
    quantityList[i].addEventListener('click', changeItemQuantity);
  }
  
  totalPriceRendering();
}

function showEmptyCart(e) {
  var div = document.createElement('div');
  div.classList.add('centered-content');
  if (e === 0 || e.target.classList.contains('cart__btn-box_empty'))
    div.innerHTML = '<p>Your shopping bag is empty.<a href="catalog.html"> Use Catalog </a> to add new items.</p>';
  else
    div.innerHTML = 'Thank you for your purchase.';
  document.querySelector('.cart__container').appendChild(div);
  document.querySelector('.cart__btn-box_buy').style.visibility = 'hidden';
}

function clearCart(e) {
  var cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart || cart.length === 0) {
    return false;
  }
  
  localStorage.setItem('cart', JSON.stringify([]));
  document.querySelector('.cart__container').innerHTML = '';
  bagIconRendering();
  showEmptyCart(e);
  totalPriceRendering();
}

function totalPriceRendering() {
  var sum = 0;
  var cart = JSON.parse(localStorage.getItem('cart'));
  
  if (!cart || cart.length === 0) sum = 0;
    else {
      for (var i = 0; i < cart.length; i++) {
        sum += Math.round(parseFloat(cart[i].price) * 100) * cart[i].quantity;
      }
      sum = (sum / 100);
    }
    
  document.querySelector('.cart__btn-box_total .output span').innerHTML = sum.toFixed(2);
}

function removeItem(e) {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var parent = e.target.parentElement;
  while (!parent.classList.contains('cart__item'))
    parent = parent.parentElement;
  
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === parent.dataset.id
      && cart[i].color === parent.querySelector('.item_color').innerHTML
      && cart[i].size === parent.querySelector('.item_size').innerHTML) {
      
      cart.splice(i, 1);
      break;
    }
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  bagIconRendering();
  cartRendering();
}

function changeItemQuantity(e) {
  
  var btn = e.target;
  var quantity;
  var parent = e.target.parentElement;
  while (!parent.classList.contains('cart__item'))
    parent = parent.parentElement;
 
  if (!btn.classList.contains('down') && !btn.classList.contains('up'))
    return false;
 
  quantity = btn.parentElement.children[1];

 
  if (btn.classList.contains('up')) {
    changeAmountInCart(parent, 1);
     quantity.innerHTML = '  ' + (+quantity.innerHTML + 1) + '  ';
  } else {
    changeAmountInCart(parent, -1);
    quantity.innerHTML = '  ' + (+quantity.innerHTML - 1) + '  ';
    }

  if (btn.classList.contains('down') && +quantity.innerHTML === 0) {
    /*2*/
    removeItem(e);
    // return false;
  }

  bagIconRendering();
  totalPriceRendering();
}

function changeAmountInCart(parent, index) {
  var cart = JSON.parse(localStorage.getItem('cart'));
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === parent.dataset.id) {
      cart[i].quantity += index;
      break;
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}