function fetchApi(url) {
  const param = { headers: { Accept: 'application/JSON' } };
  return fetch(url, param)
  .then((response) => response.json())
  .catch((error) => console.log(error));
}

function createLoading() {
  const element = document.createElement('div');
  const text = document.createElement('h2');
  text.innerText = 'Loading content...';
  element.classList.add('loading');
  element.appendChild(text);
  return element;
}

function createLabels() {
  const span = document.createElement('span');
  span.innerText = 'FHAZ - Front Hazard Avoidance Camera, RHAZ - Rear Hazard Avoidance Camera, MAST - Mast Cam, NAVCAM - Navigation Camera, CHEMCAM - Chemistry and Camera Complex, MAHLI - Mars Hand Lens Imager';
  document.querySelector('.labels').appendChild(span);
}

function filterResults(object) {
  return object.photos.map((el) => ({id: el.id, camera_name: el.camera.name, image: el.img_src}));
}

function appendElement(child) {
  document.querySelector('#results').appendChild(child);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item_image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, text, className) {
  const el = document.createElement(element);
  el.innerText = text;
  el.classList.add(className);
  return el;
}

function createA(href) {
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  return a;
}

function createListedElements({ id, camera_name, image}) {
  const section = document.createElement('section');
  const idName = createCustomElement('spam', `${camera_name} - ID:${id}`, 'item');
  const createImage = createProductImageElement(image);
  const a = createA(image);
  a.appendChild(createImage);
  section.classList.add('result-item');
  section.appendChild(idName);
  section.appendChild(a);
  appendElement(section);
}

function retrieveDate(event) {
  const info = event.target.value;
  exec(info);
}

function removeAllElements() {
  const result = document.querySelector('#results');
  while(result.firstChild) {
    result.removeChild(result.lastChild);
  } 
}

const exec = async (date) => {
  removeAllElements();
  appendElement(createLoading());
  await fetchApi(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=NnJicGrQEhHWGLinti8LBiskc6h8x923wq05HwFM&earth_date=${date}`)
  .then(response => filterResults(response))
  .then(obj => obj.forEach(el => createListedElements(el)));
  document.querySelector('.loading').remove();
  document.querySelector('#labels').style.display = 'flex';
}

window.onload = () => {
  document.querySelector('#date-insert').addEventListener('change', retrieveDate);
}
