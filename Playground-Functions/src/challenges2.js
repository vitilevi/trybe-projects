// Desafio 10
function techList(array, nome) {
  if (array.length === 0) {
    return 'Vazio!';
  }
  array = array.sort();
  let finalObject = [];
  for (let index = 0; index < array.length; index += 1) {
    let insideForObject = {
      tech: array[index],
      name: nome,
    };
    finalObject[index] = insideForObject;
  }
  return finalObject;
}

// Desafio 11
function repeatedNumber(checkNumber, checkNumberOut) {
  let repeat = 0;
  for (let indexIn = 0; indexIn < checkNumber.length; indexIn += 1) {
    if (checkNumberOut === checkNumber[indexIn]) {
      repeat += 1;
    }
    if (repeat === 3) {
      return true;
    }
  }
}

function checkForRepeatedNumbers(number) {
  for (let index = 0; index < number.length; index += 1) {
    repeatedNumber(number, number[index]);
    if (number[index] < 0 || number[index] > 9 || repeatedNumber(number, number[index]) === true) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }
  return true;
}

function checkPhoneNumber(number) {
  if (number.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  return checkForRepeatedNumbers(number);
}

function generatePhoneNumber(array) {
  if (checkPhoneNumber(array) === true) {
    array = array.join('');
    return `(${array.substring(0, 2)}) ${array.substring(2, 7)}-${array.substring(7, 11)}`;
  }
  return checkPhoneNumber(array);
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA < lineB + lineC && lineA > Math.abs(lineB - lineC)) {
    return true;
  }
  return false;
}

// Desafio 13
function hydrate(string) {
  string = string.split('');
  let sum = 0;
  for (let index = 0; index < string.length; index += 1) {
    let insideValue = parseInt(string[index], 10);
    if (Number.isInteger(insideValue)) {
      sum += insideValue;
    }
  }
  if (sum === 1) {
    sum += ' copo de água';
    return sum;
  }
  sum += ' copos de água';
  return sum;
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
