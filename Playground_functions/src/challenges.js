// Desafio 1
function compareTrue(bool1, bool2) {
  if (bool1 === true && bool2 === true) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, height) {
  if (base > 0 && height > 0) {
    return (base * height) / 2;
  }
  return 'erro';
}

// Desafio 3
function splitSentence(string) {
  return string.split(' ');
}

// Desafio 4
function concatName(string) {
  let results = [string[string.length - 1], string[0]];
  return results.join(', ');
}

// Desafio 5
function footballPoints(wins, ties) {
  let pontuacaoWins = 0;
  let pontuacaoTies = 0;
  pontuacaoWins = wins * 3;
  pontuacaoTies = ties * 1;
  return pontuacaoWins + pontuacaoTies;
}

// Desafio 6
function highestNumber(array) {
  let max = 0;
  for (let index in array) {
    if (array[index] > max) {
      max = array[index];
    }
  }
  return max;
}

function highestCount(array) {
  let max = highestNumber(array);
  let repeatCount = 0;
  for (let index in array) {
    if (array[index] === max) {
      repeatCount += 1;
    }
  }
  return repeatCount;
}

// Desafio 7
function catCheckDistance(mouse, cat1, cat2) {
  let catDistance1 = 0;
  let catDistance2 = 0;

  if (mouse > cat1) {
    catDistance1 = cat1 - mouse;
  } else {
    catDistance1 = mouse - cat1;
  }
  if (mouse > cat2) {
    catDistance2 = cat2 - mouse;
  } else {
    catDistance2 = mouse - cat2;
  }
  return [catDistance1, catDistance2];
}

function catAndMouse(mouse, cat1, cat2) {
  let catDistance1 = catCheckDistance(mouse, cat1, cat2)[0];
  let catDistance2 = catCheckDistance(mouse, cat1, cat2)[1];
  if (catDistance1 > catDistance2) {
    return 'cat1';
  } if (catDistance1 === catDistance2) {
    return 'os gatos trombam e o rato foge';
  }
  return 'cat2';
}

// Desafio 8
function ifFizzBuzz(value, index) {
  if (value[index] % 15 === 0) {
    return 'fizzBuzz';
  } if (value[index] % 3 === 0) {
    return 'fizz';
  } if (value[index] % 5 === 0) {
    return 'buzz';
  }
  return 'bug!';
}

function fizzBuzz(array) {
  let response = [];
  for (let index = 0; index < array.length; index += 1) {
    response.push(ifFizzBuzz(array, index));
  }
  return response;
}

// Desafio 9
function returnEncodedLetter(string, vogais, numero, indexOut) {
  for (let indexIn = 0; indexIn < vogais.length; indexIn += 1) {
    if (string[indexOut] === vogais[indexIn]) {
      string[indexOut] = numero[indexIn];
    }
  }
  return string;
}

function checkLetterEncoder(string, vogais, numero) {
  let input;
  for (let index = 0; index < string.length; index += 1) {
    input = returnEncodedLetter(string, vogais, numero, index);
  }
  return input;
}

function encode(string) {
  string = string.split('');
  let vogais = ['a', 'e', 'i', 'o', 'u'];
  let numero = ['1', '2', '3', '4', '5'];
  let stringOutput = checkLetterEncoder(string, vogais, numero);
  return stringOutput.join('');
}

console.log(encode('hi there!'));

function returnDecodedLetter(string, vogais, numero, indexOut) {
  for (let indexIn = 0; indexIn < vogais.length; indexIn += 1) {
    if (string[indexOut] === numero[indexIn]) {
      string[indexOut] = vogais[indexIn];
    }
  }
  return string;
}

function checkLetterDecoded(string, vogais, numero) {
  let input;
  for (let index = 0; index < string.length; index += 1) {
    input = returnDecodedLetter(string, vogais, numero, index);
  }
  return input;
}

function decode(string) {
  string = string.split('');
  let vogais = ['a', 'e', 'i', 'o', 'u'];
  let numero = ['1', '2', '3', '4', '5'];
  let stringOutput = checkLetterDecoded(string, vogais, numero);
  return stringOutput.join('');
}

console.log(decode('h3 th2r2!'));

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
