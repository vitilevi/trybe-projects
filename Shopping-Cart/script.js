const shoppingCart = [];

const fetchApi = (endPoint) => {
  const param = { headers: { Accept: 'application/json' } };
  return fetch(endPoint, param)
  .then((response) => response.json())
  .catch((error) => console.log(error));
};

const formatToBody = (resp) => {
  const values = Object.values(resp);
  const control = values.map((el) => ({
    sku: el.id, 
    name: el.title,
    image: el.thumbnail,
  }));
  return control;
};

const formatToCart = (resp) => {
  const values = [resp];
  const control = values.map((el) => ({
    sku: el.id,
    name: el.title,
    salePrice: el.price,
  }));
  return control;
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const calcStoragePrice = () => {
  const price = document.querySelector('.total-price');
  const total = shoppingCart.reduce((acc, curr) => acc + Number(curr[0].salePrice), 0);
  price.innerText = `${total}`;
};

function cartItemClickListener(event) {
  const storage = JSON.parse(localStorage.getItem('myShoppingCart'));
  const string = event.target.innerText;
  const id = string.split(' ')[1];
  let index;
  const ele = storage.find((el) => el[0].sku === id);
  storage.forEach((el, i) => {
    if (ele === el) {
      index = i;
    }
  });
  storage.splice(index, 1);
  shoppingCart.splice(index, 1);
  localStorage.setItem('myShoppingCart', JSON.stringify(storage));
  event.target.parentNode.removeChild(event.target);
  calcStoragePrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createPriceElement = () => {
  const getCart = document.querySelector('.cart');
  const span = document.createElement('span');
  const element = document.createElement('span');
  element.classList.add('total-price');
  element.innerText = '0';
  span.innerText = 'Preço total: $';
  span.appendChild(element);
  getCart.appendChild(span);
  return element;
};

const emptyCart = () => { 
  const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', (event) => {
    const el = event;
    const parent = el.target.parentNode.childNodes[5];
    while (parent.firstChild) {
      parent.removeChild(parent.lastChild);
    }
    localStorage.clear();
    el.target.parentNode.lastChild.lastChild.innerText = 0;
  });
};

const pushCartItems = (value) => {
  shoppingCart.push(value);
  return shoppingCart;
};

const retrieveCartItems = () => {
  const cartItems = document.querySelector('.cart__items');
  const items = JSON.parse(localStorage.getItem('myShoppingCart'));
  try {
    items.forEach((ele) => {
      pushCartItems(ele);
      cartItems.appendChild(createCartItemElement(ele[0]));
    });
    calcStoragePrice();
  } catch (error) {
    console.log('');
  }
};

const addItemToCart = async (id) => {
  await fetchApi(`https://api.mercadolibre.com/items/${id}`)
  .then((response) => formatToCart(response))
  .then((el) => {
    const element = createCartItemElement(el[0]);
    document.querySelector('.cart__items').appendChild(element);
    const cartValues = pushCartItems(el);
    localStorage.setItem('myShoppingCart', JSON.stringify(cartValues));
    calcStoragePrice();
  });
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => addItemToCart(sku));
  section.appendChild(button);
  return section;
}

const getAndCreateElements = async () => {
  await fetchApi('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((response) => formatToBody(response.results))
  .then((formated) => formated.forEach((product) => {
    document.querySelector('.items').appendChild(createProductItemElement(product));
  }));
  await (document.querySelector('.loading').remove());
};

const exec = async () => {
  await getAndCreateElements();
  createPriceElement();
  await calcStoragePrice();
};

window.onload = function onload() {  
  exec();
  retrieveCartItems();
  emptyCart();
};
