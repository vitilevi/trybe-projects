// Retrieve elements
const generateButton = document.getElementById('criar-carta');
const paragraph = document.getElementById('carta-gerada');
const arrayOfStyles = ['newspaper', 'magazine1', 'magazine2'];
const arrayOfSize = ['medium', 'big', 'reallybig'];
const arrayOfRotation = ['rotateleft', 'rotateright'];
const arrayOfInclination = ['skewleft', 'skewright'];

function checkForInput(value) {
  if (value === '' || value === ' ') {
    const createErrorElement = document.createElement('p');
    createErrorElement.id = 'error';
    createErrorElement.innerText = 'Por favor, digite o conteúdo da carta.';
    paragraph.appendChild(createErrorElement);
  } else {
    return true;
  }
}

function generateRandomClass() {
  const style = arrayOfStyles;
  const size = arrayOfSize;
  const rot = arrayOfRotation;
  const inc = arrayOfInclination;
  const styleSizeNum = Math.floor(Math.random() * 3);
  const rotIncNum = Math.floor(Math.random() * 2);
  const classRandom = [style[styleSizeNum], size[styleSizeNum], rot[rotIncNum], inc[rotIncNum]];
  return classRandom;
}

function removeAllContent() {
  for (let index = 0; index < paragraph.children.length;) {
    paragraph.removeChild(paragraph.lastElementChild);
  }
}

function changeWordStyle(event) {
  const value = event;
  const newClassName = generateRandomClass();
  value.target.className = '';
  for (let index = 0; index < 3; index += 1) {
    value.target.classList.add(newClassName[index]);
  }
}

function updateSpan() {
  const spanTag = document.getElementsByTagName('span');
  for (let index = 0; index < spanTag.length; index += 1) {
    spanTag[index].addEventListener('click', changeWordStyle);
  }
  return spanTag;
}

function createWordCounter(value, inputValue) {
  const tagUpdate = value;
  const input = inputValue;
  if (input !== '' || input !== ' ') {
    const counter = document.createElement('p');
    counter.id = 'carta-contador';
    counter.innerText = `${tagUpdate.length}`;
    paragraph.appendChild(counter);
  }
}

function addClass(randomGeneratedClass, value) {
  for (let index = 0; index < 3; index += 1) {
    value.classList.add(randomGeneratedClass[index]);
  }
}

function createWord() {
  const documentInput = document.getElementById('carta-texto');
  const textInput = documentInput.value;
  removeAllContent();
  if (checkForInput(textInput)) {
    const textArray = textInput.split(' ');
    for (let index = 0; index < textArray.length; index += 1) {
      const createSpan = document.createElement('span');
      const randomGeneratedClass = generateRandomClass();
      addClass(randomGeneratedClass, createSpan);
      createSpan.style.display = 'inline-block';
      createSpan.innerText = `${textArray[index]}`;
      paragraph.appendChild(createSpan);
    }
    const update = updateSpan();
    createWordCounter(update, textInput);
  }
}

function createEventListeners() {
  generateButton.addEventListener('click', createWord);
}

function init() {
  createEventListeners();
}

window.onload = init;
