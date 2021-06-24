const loginButton = document.getElementById('login');
const evaluationForm = document.querySelector('#evaluation-form');
const inputName = document.querySelector('#input-name');
const inputLastName = document.querySelector('#input-lastname');
const inputEmail = document.querySelector('#input-email');
const radioHouse = document.querySelector('#house');
const textArea = document.getElementById('textarea');
const counterText = document.getElementById('counter');
const agreementCheck = document.querySelector('#agreement');
const submitButton = document.querySelector('#submit-btn');

function checkForLogin() {
  const loginValue = document.getElementById('login-value').value;
  const passwordValue = document.getElementById('password-value').value;
  if (loginValue === 'tryber@teste.com' && passwordValue === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
}

let checked = false;
function checkAgreement() {
  if (agreementCheck.checked) {
    checked = true;
  }
  if (checked) {
    submitButton.disabled = false;
    submitButton.classList.remove('btn-disabled');
  }
}

function counter() {
  counterText.innerText = 500 - textArea.value.length;
}

function getCheckedSubjects() {
  const checkedElements = document.querySelectorAll('.subject:checked');
  const elementsList = [];

  for (let index = 0; index < checkedElements.length; index += 1) {
    elementsList.push(` ${checkedElements[index].value}`);
  }

  return elementsList;
}

function getForm() {
  const formObject = {
    Nome: `${inputName.value} ${inputLastName.value}`,
    Email: `${inputEmail.value}`,
    Casa: `${radioHouse.value}`,
    Família: `${document.querySelector('input[name="family"]:checked').value}`,
    Matérias: getCheckedSubjects(),
    Avaliação: `${document.querySelector('input[name="rate"]:checked').value}`,
    Observações: `${textArea.value}`,
  };

  let answer = '';

  for (const key of Object.keys(formObject)) {
    answer += `${key}: ${formObject[key]}<br>`;
  }

  return answer;
}

function createResult() {
  evaluationForm.innerHTML = getForm();
}

function submitForm(event) {
  event.preventDefault();
  createResult();
}

function addEventListeners() {
  loginButton.addEventListener('click', checkForLogin);
  agreementCheck.addEventListener('change', checkAgreement);
  textArea.addEventListener('keyup', counter);
  submitButton.addEventListener('click', submitForm);
}

window.onload = () => {
  addEventListeners();
};
