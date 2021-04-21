const divColors = document.querySelectorAll('.ball');
const initialAnswer = document.getElementById('answer');
initialAnswer.innerText = 'Escolha uma cor';
const resetButton = document.getElementById('reset-game');
let countScore = 0;

function generateRandomColor() {
  const color = [];
  for (let index = 0; index < 3; index += 1) {
    const number = Math.floor(Math.random() * 255);
    color.push(number);
  }
  const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  return rgbColor;
}

function updateParagraphColor(colorArray) {
  const spanValue = document.getElementById('rgb-color');
  const index = Math.floor(Math.random() * 6);
  const color = colorArray[index];
  spanValue.innerText = `${color}`;
}

function addColor() {
  const colorForCheck = [];
  for (let index = 0; index < divColors.length; index += 1) {
    const color = generateRandomColor();
    divColors[index].style.backgroundColor = color;
    colorForCheck.push(color);
  }
  updateParagraphColor(colorForCheck);
}

function response(value) {
  const answer = document.getElementById('answer');
  if (value) {
    answer.innerText = 'Acertou!';
  } else {
    answer.innerText = 'Errou! Tente novamente!';
  }
}

function checkAnswer(event) {
  const colorOfChoice = event.target.style.backgroundColor;
  const colorToGuess = document.getElementById('rgb-color').innerText;
  const score = document.getElementById('score');
  if (colorOfChoice === colorToGuess) {
    response(true);
    countScore += 3;
    score.innerText = `${countScore}`;
  } else {
    response(false);
  }
}

function createEventListeners() {
  for (let index = 0; index < divColors.length; index += 1) {
    divColors[index].addEventListener('click', checkAnswer);
  }
}

function game() {
  createEventListeners();
  addColor();
}

function resetGame() {
  game();
  const newAnswer = document.getElementById('answer');
  newAnswer.innerText = 'Escolha uma cor';
}

function init() {
  const initScore = document.getElementById('score');
  initScore.innerText = `${countScore}`;
  game();
  resetButton.addEventListener('click', resetGame);
}

window.onload = init;
