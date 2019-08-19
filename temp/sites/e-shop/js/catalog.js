"use strict";

window.addEventListener('resize', function () {
  var filter = document.querySelector('.filters');
  if (window.innerWidth > 1023
    && filter.classList.contains('filters-open')) {
    filter.classList.remove('filters-open');
  }
});

/* FILTER BAR */
document.querySelector('.filter__bar').addEventListener('click', function () {
  document.querySelector('.filters').classList.toggle('filters-open');
});

// FILTERS TOGGLE
var outputArr = [];
setOutputArr();
showFilterBar();

function setOutputArr() {
  var filtBox = document.querySelectorAll('.filters__item');
  var ulList;
  
  for (var i = 0; i < filtBox.length; i++) {
    if (filtBox[i].classList.contains('notSelected')) {
      outputArr[i] = '<span>' + filtBox[i].dataset.filter + '</span>';
    } else {
      ulList = filtBox[i].querySelectorAll('li');
      for (var j = 0; j < ulList.length; j++) {
        if (ulList[j].classList.contains('active')) {
          outputArr[i] = '<span class="active">' + ulList[j].innerHTML + '</span>';
          break;
        }
      }
    }
  }
}

function showFilterBar() {
  document.querySelector('.filters__bar_output').innerHTML = outputArr.join(', ') +
      '<div><img class="filters__bar_icon" src="img/sort-down.svg" alt="" width="10" height="6"></div>';
}

document.querySelector('.filters').addEventListener('click', function (e) {
  var li = e.target, parent, ulList, filterBar, filterBarOutput, index;
  if (li.tagName !== 'LI') return false;
  
  parent = li.parentElement.parentElement; // filters-item
  ulList = parent.querySelectorAll('li');
  for (var i = 0; i < ulList.length; i++) {
    ulList[i].classList.remove('active');
  }
  
  var filtBox = document.querySelectorAll('.filters__item');
  for (i = 0; i < filtBox.length; i++) {
    if (filtBox[i] === parent) {
      index = i;
      break;
    }
  }
  
  // filterBar = document.querySelector('.filters__bar_output');
  // for (i = 0; i < filterBar.children.length; i++) {
  //   if (filterBar.children[i].dataset.filter === parent.dataset.filter) {
  //     filterBarOutput = filterBar.children[i];
  //     break;
  //   }
  // }
  
  if (li.innerHTML === 'Not selected') {
    parent.classList.add('notSelected');
    parent.querySelector('.filters__item_current').innerHTML = '';
    outputArr[index] = '<span>' + parent.dataset.filter + '</span>';
    
    // filterBarOutput.classList.remove('active');
    // filterBarOutput.innerHTML = filterBarOutput.dataset.filter;
  } else {
    parent.classList.remove('notSelected');
    parent.querySelector('.filters__item_current').innerHTML = li.innerHTML;
    li.classList.add('active');
    outputArr[index] = '<span class="active">' + li.innerHTML + '</span>';
    
    // filterBarOutput.classList.add('active');
    // filterBarOutput.innerHTML = li.innerHTML;
  }
  
  showFilterBar();
});

// CATALOG RENDERING
var currentCatalog = _.filter(catalog, {category: 'women', fashion: 'Casual style'});
currentCatalog = _.sortBy(currentCatalog, 'dateAdded');
_.reverse(currentCatalog);

showItems(currentCatalog);

function showItems(arr) {
  var item;
  var container = document.querySelector('.catalog__items-container');
  
  var tmpl = _.template('<a href="item.html" data-id="<%=id%>" \
  class="item <% var i = (hasNew) ? \'new\' : \'\'%> <%=i%>">\
    <div class="wrap">\
      <img src="<%=thumbnail%>" alt="<%=title%>">\
      <div class="layer centered-content">View item</div>\
    </div>\
    <span class="item__title"><%=title%></span>\
      <% if(price === null && discountedPrice === null) { %>\
        <span class="item__placeholder"><%=placeholder%></span>\
      <% } else if (price !== discountedPrice) { %>\
        <span class="item_discount">&#163;<%=price.toFixed(2)%> <%=Math.round(discountedPrice/price*100 - 100)%>% \
         <span class="item__price">&#163;<%=discountedPrice.toFixed(2)%></span></span>\
      <% } else { %>\
        <span class="item__price">&#163;<%=price.toFixed(2)%></span>\
      <% } %>\
  </a>');
  
  for (var i = 0; i < currentCatalog.length; i++) {
    item = tmpl(currentCatalog[i]);
    container.insertAdjacentHTML('beforeEnd', item);
  }
}

// LOCAL STORAGE SET
var items = document.querySelectorAll('.item');
 for (var i = 0; i < items.length; i++) {
   items[i].addEventListener('click', function (e) {
     var parent = e.target;
     while (!parent.classList.contains('item')) parent = parent.parentElement;
     var itemId = parent.dataset.id;
     localStorage.setItem('itemId', itemId);
   });
 }

document.querySelector('.banner__left').addEventListener('click', function () {
  localStorage.setItem('itemId', '80d32566-d81c-4ba0-9edf-0eceda3b4360');
});

document.querySelector('.banner .tablet').addEventListener('click', function () {
  localStorage.setItem('itemId', '5677f851-1c4a-4e9b-80e9-16d1e6265257');
});

document.querySelector('.banner .desktop').addEventListener('click', function () {
  localStorage.setItem('itemId', '739d3ae0-6dca-4453-a7a4-a94b841a296d');
});


