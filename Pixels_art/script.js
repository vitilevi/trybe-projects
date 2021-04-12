// Retrieve elements
const liColors = document.getElementsByClassName('color');
const pixelBoard = document.getElementById('pixel-board');
const colorsList = document.getElementsByClassName('color');
const selectedColor = document.getElementsByClassName('selected');
let pixelList = document.getElementsByClassName('pixel');
const cleanButton = document.getElementById('clear-board');
const inputNumber = document.getElementById('board-size');
const generateButton = document.getElementById('generate-board');

// Create elements
function createDivBoard(size) {
  const numberOfTiles = size;
  for (let index = 0; index < numberOfTiles; index += 1) {
    const tile = document.createElement('div');
    tile.classList.add('pixel');
    pixelBoard.appendChild(tile);
  }
}

function generateRandomColor() {
  const letters = '0123456789abcdef';
  let color = '#';
  for (let index = 0; index < 3; index += 1) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

function makeLiColors(param) {
  const liProperties = param;
  liProperties[0].style.backgroundColor = 'black';
  liProperties[0].style.border = '1px solid black';
  for (let index = 1; index < liColors.length; index += 1) {
    const randomColor = generateRandomColor();
    liProperties[index].style.backgroundColor = randomColor;
    liProperties[index].style.border = '1px solid black';
  }
}

// Select black color at start
function selectColor() {
  liColors[0].classList.add('selected');
}

// Error return
function errorReturn() {
  window.alert('Board inválido!');
}

// Remove all tiles
function removeAllTiles() {
  pixelList = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixelBoard.children.length;) {
    pixelBoard.removeChild(pixelBoard.lastChild);
  }
}

// Calculate board size Function
function boardSizeCalculate() {
  const singleTileSize = 42;
  const maxLateralSize = Math.ceil((singleTileSize * pixelList.length ** (1 / 2)));
  pixelBoard.style.width = `${maxLateralSize.toString()}px`;
  const minHeightSize = singleTileSize * pixelList.length ** (1 / 2) + 40;
  pixelBoard.style.minHeight = `${minHeightSize.toString()}px`;
}

// function of events
function lookForSelectedColor(event) {
  for (let index = 0; index < colorsList.length; index += 1) {
    colorsList[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function paintSingleTile(event) {
  const tile = event;
  tile.target.style.backgroundColor = selectedColor[0].style.backgroundColor;
}

function cleanBoard() {
  for (let index = 0; index < pixelList.length; index += 1) {
    pixelList[index].style.backgroundColor = 'white';
  }
}

// Update Function
function updateTileListEventListener() {
  pixelList = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixelList.length; index += 1) {
    pixelList[index].addEventListener('click', paintSingleTile);
  }
}

function checkForInputValue(size) {
  let tileNumber;
  if (size < 5) {
    tileNumber = 5 ** 2;
  } else {
    tileNumber = size ** 2;
  }
  if (size > 50) {
    tileNumber = 50 ** 2;
  }
  return tileNumber;
}

function generateDynamicBoard() {
  const size = inputNumber.value;
  const tileNumber = checkForInputValue(size);
  if (size === '') {
    return errorReturn();
  }
  removeAllTiles();
  createDivBoard(tileNumber);
  boardSizeCalculate();
  updateTileListEventListener();
}

function createEventListeners() {
  for (let index = 0; index < colorsList.length; index += 1) {
    colorsList[index].addEventListener('click', lookForSelectedColor);
  }
  pixelList = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixelList.length; index += 1) {
    pixelList[index].addEventListener('click', paintSingleTile);
  }
  cleanButton.addEventListener('click', cleanBoard);
  generateButton.addEventListener('click', generateDynamicBoard);
}

function initialize() {
  selectColor();
  makeLiColors(liColors);
  createDivBoard(25);
  createEventListeners();
  boardSizeCalculate();
}

window.onload = initialize;
