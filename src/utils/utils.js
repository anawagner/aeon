const addElement = (elem, className, textContent, parent) => {
  const newElement = document.createElement(elem);
  if (className) newElement.classList.add(className);
  newElement.textContent = textContent;
  parent.appendChild(newElement);
  return newElement;
};

const addDiv = (className, textContent, parent) => {
  return addElement('div', className, textContent, parent);
};

const createButton = (action, type, label, className) => {
  const button = document.createElement('button');
  button.classList.add(action, className);
  button.textContent = label;
  button.type = type;
  button.name = action;
  button.value = action;
  return button;
};

const createIcon = (uri, className) => {
  const iconImg = document.createElement('img');
  iconImg.src = uri;
  iconImg.alt = '';
  iconImg.classList.add(className, 'btn-icon');
  return iconImg;
};

export { addElement, addDiv, createButton, createIcon };
