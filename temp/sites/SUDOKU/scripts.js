"use strict";

// array of objects [9*9]
var cellArr;

// массив первоначальных условий состоит из объектов,
// содержащих координаты ячейки (i, j) и значение (value)
var condArr;

function choosePuzzle(event) {
  let puzzles = [
    [{i: 0, j: 0, value: "1"}, {i: 1, j: 0, value: "9"}, {i: 1, j: 4, value: "2"},
      {i: 2, j: 3, value: "5"}, {i: 2, j: 6, value: "3"}, {i: 2, j: 7, value: "8"},
      {i: 4, j: 4, value: "1"}, {i: 4, j: 6, value: "4"}, {i: 5, j: 1, value: "8"},
      {i: 5, j: 2, value: "5"}, {i: 5, j: 7, value: "2"}, {i: 6, j: 3, value: "8"},
      {i: 7, j: 1, value: "2"}, {i: 7, j: 3, value: "7"}, {i: 8, j: 0, value: "4"},
      {i: 8, j: 5, value: "3"}, {i: 8, j: 6, value: "6"}],
    
    [{i: 0, j: 3, value: "3"}, {i: 0, j: 7, value: "1"}, {i: 1, j: 1, value: "7"},
      {i: 1, j: 2, value: "6"}, {i: 3, j: 0, value: "1"}, {i: 3, j: 1, value: "4"},
      {i: 3, j: 3, value: "5"}, {i: 4, j: 3, value: "2"}, {i: 4, j: 6, value: "6"},
      {i: 4, j: 8, value: "7"}, {i: 5, j: 8, value: "8"}, {i: 6, j: 0, value: "5"},
      {i: 6, j: 6, value: "2"}, {i: 6, j: 7, value: "8"}, {i: 7, j: 4, value: "4"},
      {i: 7, j: 5, value: "7"}, {i: 8, j: 0, value: "3"}],
    
    [{i: 0, j: 3, value: "4"}, {i: 0, j: 5, value: "9"}, {i: 0, j: 6, value: "8"},
      {i: 1, j: 0, value: "7"}, {i: 1, j: 2, value: "1"}, {i: 3, j: 1, value: "9"},
      {i: 3, j: 6, value: "3"}, {i: 4, j: 3, value: "5"}, {i: 4, j: 4, value: "2"},
      {i: 5, j: 0, value: "6"}, {i: 5, j: 4, value: "7"}, {i: 6, j: 0, value: "3"},
      {i: 6, j: 7, value: "2"}, {i: 7, j: 1, value: "8"}, {i: 7, j: 3, value: "1"},
      {i: 8, j: 7, value: "6"}, {i: 8, j: 8, value: "7"}],
    
    [{i: 0, j: 1, value: "3"}, {i: 0, j: 2, value: "6"},
      {i: 0, j: 8, value: "7"}, {i: 1, j: 3, value: "1"}, {i: 1, j: 5, value: "5"},
      {i: 3, j: 5, value: "6"}, {i: 3, j: 6, value: "5"}, {i: 3, j: 7, value: "1"},
      {i: 4, j: 2, value: "2"}, {i: 4, j: 4, value: "3"}, {i: 5, j: 7, value: "4"},
      {i: 6, j: 4, value: "6"}, {i: 6, j: 5, value: "2"}, {i: 6, j: 8, value: "8"},
      {i: 7, j: 0, value: "4"}, {i: 7, j: 8, value: "2"}, {i: 8, j: 1, value: "1"}]
  ];
  
  if (event.target.tagName === 'BUTTON') {
    condArr = puzzles[event.target.innerHTML - 1];
    showConditions(condArr);
  }
}

// Создание массива первоначальных объектов
function createApplicantsArray() {
  let applicantArr = [];
  for (var i = 0; i < 9; i++) {
    applicantArr[i] = [];
    for (var j = 0; j < 9; j++) {
      applicantArr [i][j] = {
        state: 'unknown',
        '1': true,
        '2': true,
        '3': true,
        '4': true,
        '5': true,
        '6': true,
        '7': true,
        '8': true,
        '9': true
      }
    }
  }
  return applicantArr;
}

// при ручном вводе
function setConditions() {
  let container = document.querySelector('.container-grid');
  let tempCond = [];
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      
      if (container.children[j].children[i].value > 0) {
        tempCond.push({i: i, j: j, value: container.children[j].children[i].value});
      }
    }
  }
  condArr = tempCond;
  showConditions(condArr);
}

function reset() {
  cellArr = createApplicantsArray();
  let container = document.querySelector('.container-grid');
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      container.children[j].children[i].value = "";
      container.children[j].children[i].style.fontWeight = "normal";
    }
  }
}

function showConditions(arr) {
  reset();
  // выведение значений условия
  let cell;
  for (var i = 0; i < arr.length; i++) {
    cellArr[arr[i].i][arr[i].j] = setCondInCell(arr[i].value);
    cell = '.row' + arr[i].j + ' ' + 'input:nth-of-type(' + (arr[i].i + 1) + ')';
    document.querySelector(cell).value = arr[i].value;
    document.querySelector(cell).style.fontWeight = 'bold';
  }

  function setCondInCell(value) {
    let cell = {};
    cell.state = 'condition';
    cell.value = value;
    return cell;
  }
}

function getSolution() {
setConditions();
// удаление кандидитов из других ячеек по известным значениям condition
  for (let i = 0; i < condArr.length; i++) {
    removeTheSameValues(condArr[i]);
  }

// перебираем ячейки в поисках решения
  let flagForUnknown = true;
  let flagForChanges = true;
  
  while (flagForUnknown && flagForChanges) {
    flagForUnknown = false;
    flagForChanges = false;
    let keys;
    let tempObj = {};
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        
        if (cellArr[i][j].state === 'unknown') {
          if (!flagForUnknown) flagForUnknown = true;
          
          // метод 1: если у ячейки остался один кандидат
          keys = Object.keys(cellArr[i][j]);
          if (keys.length === 2) {
            tempObj.i = i;
            tempObj.j = j;
            tempObj.value = keys[0];
            removeTheSameValues(tempObj);
            if (!flagForChanges) flagForChanges = true;
            setSolved(tempObj);
            continue;
          }
          
          // метод 2: если кандидата нет больше в строке, абзаце, блоке => он верный
          let temp;
          if (temp = checkApplicants(i, j)) {
            tempObj.i = i;
            tempObj.j = j;
            tempObj.value = temp;
            removeTheSameValues(tempObj);
            if (!flagForChanges) flagForChanges = true;
            setSolved(tempObj);
          }
        }
      }
    }
  }
}

// удаление кандидитов из других ячеек по значению solved или condition
function removeTheSameValues(cellObj) {
  for (let x = 0; x < 9; x++) {
    if (cellArr[x][cellObj.j].state === 'unknown') {
      delete cellArr[x][cellObj.j][cellObj.value];
    }
    if (cellArr[cellObj.i][x].state === 'unknown') {
      delete cellArr[cellObj.i][x][cellObj.value];
    }
  }
  // предельные координаты блока
  let begi = 0, begj = 0, endi = 8, endj = 8;
  if (cellObj.i > 2) begi = 3;
  if (cellObj.i > 5) begi = 6;
  if (cellObj.j > 2) begj = 3;
  if (cellObj.j > 5) begj = 6;
  
  if (cellObj.i < 6) endi = 5;
  if (cellObj.i < 3) endi = 2;
  if (cellObj.j < 6) endj = 5;
  if (cellObj.j < 3) endj = 2;
  
  for (let a = begi; a <= endi; a++) {
    for (let b = begj; b <= endj; b++) {
      if (cellArr[a][b].state === 'unknown') {
        delete cellArr[a][b][cellObj.value];
      }
    }
  }
}
// вывести найденное решение ячейки и поменять ее статус на solved
function setSolved(cellObj) {
  let cell;
  cell = '.row' + cellObj.j + ' ' + 'input:nth-of-type(' + (cellObj.i + 1) + ')';
  document.querySelector(cell).value = cellObj.value;
  cellArr[cellObj.i][cellObj.j] = {};
  cellArr[cellObj.i][cellObj.j].state = 'solved';
  cellArr[cellObj.i][cellObj.j].value = cellObj.value;
}

// Реализация метода 2. Возвращает значение ячейки или false.
function checkApplicants (i, j) {
  let keys = Object.keys(cellArr[i][j]);
  for (let val = 0; val < keys.length - 1; val++) {
    
    // в строке
    for (let ci = 0; ci <= 9; ci++) {
      if (ci === 9) return keys[val];
      if (ci === i) continue;
      if (cellArr[ci][j].state !== 'unknown') continue;
      if (keys[val] in cellArr[ci][j]) break;
    }
    // в столбце
    for (let cj = 0; cj <= 9; cj++) {
      if (cj === 9) return keys[val];
      if (cj === j) continue;
      if (cellArr[i][cj].state !== 'unknown') continue;
      if (keys[val] in cellArr[i][cj]) break;
    }
    // в блоке
    let begi = 0, begj = 0, endi = 8, endj = 8;
    if (i > 2) begi = 3;
    if (i > 5) begi = 6;
    if (j > 2) begj = 3;
    if (j > 5) begj = 6;
  
    if (i < 6) endi = 5;
    if (i < 3) endi = 2;
    if (j < 6) endj = 5;
    if (j < 3) endj = 2;
  
    let flag = true;
    outer:
    for (let a = begi; a <= endi; a++) {
      for (let b = begj; b <= endj; b++) {
        if (a === i && b === j) continue;
        if (cellArr[a][b].state !== 'unknown') continue;
        if (keys[val] in cellArr[a][b]) {
          flag = false;
          break outer;
        }
      }
    }
    if (flag) return keys[val];
  }
  return false;
}