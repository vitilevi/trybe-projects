const input = document.getElementById('text-input');
const divText = document.getElementById('meme-text');
const image = document.getElementById('meme-insert');
const fireButton = document.getElementById('fire');
const waterButton = document.getElementById('water');
const eartButton = document.getElementById('earth');
const memeContainer = document.getElementById('meme-image-container');
const prememes = document.getElementsByClassName('prememes');

function inputText() {
  const inputValue = input.value;
  divText.innerText = inputValue;
}

function createImage(event) {
  const imagem = document.getElementById('meme-image');
  imagem.src = URL.createObjectURL(event.target.files[0]);
}

function repleaceImage(event) {
  const imageReplace = document.getElementById('meme-image');
  const replacedMemeSrc = event.target.src;
  imageReplace.src = replacedMemeSrc;
}

function fireBorder() {
  memeContainer.style.border = '3px dashed red';
}

function waterBorder() {
  memeContainer.style.border = '5px double blue';
}

function earthBorder() {
  memeContainer.style.border = '6px groove rgb(0, 128, 0)';
}

function createEventListeners() {
  input.addEventListener('keyup', inputText);
  image.addEventListener('change', createImage);
  fireButton.addEventListener('click', fireBorder);
  waterButton.addEventListener('click', waterBorder);
  eartButton.addEventListener('click', earthBorder);
  for (let index = 0; index < 4; index += 1) {
    prememes[index].addEventListener('click', repleaceImage);
  }
}

function init() {
  createEventListeners();
}

window.onload = init;
