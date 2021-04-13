// Retrieve itens
const liItems = document.getElementsByTagName('li');
const inputText = document.getElementById('texto-tarefa');
const orderedList = document.getElementById('lista-tarefas');
const createActivity = document.getElementById('criar-tarefa');
const deleteAllItems = document.getElementById('apaga-tudo');
const deleteCompletedItem = document.getElementById('remover-finalizados');
const completed = document.getElementsByClassName('completed');
const selected = document.getElementsByClassName('selected');
const saveButton = document.getElementById('salvar-tarefas');
const selectedButton = document.getElementById('remover-selecionado');
const upButton = document.getElementById('mover-cima');
const downButton = document.getElementById('mover-baixo');

// Add selected class to li
function selectedItem(event) {
  for (let index = 0; index < liItems.length; index += 1) {
    liItems[index] = liItems[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

// Mark a line through all completed itens
function crossedItem(event) {
  if (event.target.className !== '' && event.target.className !== 'selected') {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

function createLiEventListener() {
  for (let index = 0; index < liItems.length; index += 1) {
    liItems[index].addEventListener('click', selectedItem);
    liItems[index].addEventListener('dblclick', crossedItem);
  }
}

// Create li element
function createAndAddLiItem() {
  const createLi = document.createElement('li');
  const text = inputText.value;
  createLi.innerText = text;
  orderedList.appendChild(createLi);
  inputText.value = '';
  createLiEventListener();
}

function moveUpItem() {
  const selectedLiUp = document.querySelector('.selected');
  if (!selectedLiUp || liItems[0].classList.contains('selected')) {
    return;
  }
  const upperPosition = selectedLiUp.previousElementSibling;
  orderedList.insertBefore(selectedLiUp, upperPosition);
}

function moveDownItem() {
  const selectedLiDown = document.querySelector('.selected');
  if (!selectedLiDown || liItems[liItems.length - 1].classList.contains('selected')) {
    return;
  }
  const inferiorPosition = selectedLiDown.nextElementSibling;
  orderedList.insertBefore(selectedLiDown, inferiorPosition.nextElementSibling);
}

function deleteAllLiItems() {
  for (let index = 0; index < orderedList.children.length;) {
    orderedList.removeChild(orderedList.lastChild);
  }
  localStorage.clear();
}

function deleteCompletedItems() {
  for (let index = 0; index < completed.length;) {
    orderedList.removeChild(completed[index]);
  }
}

function removeSelectedItem() {
  orderedList.removeChild(selected[0]);
}

function saveItems() {
  const updatedLiItems = document.getElementsByTagName('li');
  localStorage.clear();
  for (let index = 0; index < liItems.length; index += 1) {
    localStorage.setItem(`liText${index}`, `${updatedLiItems[index].innerText}`);
    localStorage.setItem(`liClass${index}`, `${updatedLiItems[index].className}`);
  }
}

function modifyForSavedItens() {
  for (let index = 0; index < (localStorage.length / 2); index += 1) {
    const createLiItem = document.createElement('li');
    const savedItemText = localStorage.getItem(`liText${index}`);
    const savedItemClass = localStorage.getItem(`liClass${index}`);
    createLiItem.innerText = savedItemText;
    createLiItem.className = savedItemClass;
    orderedList.appendChild(createLiItem);
  }
}

function createEventlisteners() {
  createActivity.addEventListener('click', createAndAddLiItem);
  deleteAllItems.addEventListener('click', deleteAllLiItems);
  deleteCompletedItem.addEventListener('click', deleteCompletedItems);
  saveButton.addEventListener('click', saveItems);
  selectedButton.addEventListener('click', removeSelectedItem);
  upButton.addEventListener('click', moveUpItem);
  downButton.addEventListener('click', moveDownItem);
  createLiEventListener();
}

function initialize() {
  modifyForSavedItens();
  createEventlisteners();
}

window.onload = initialize;
