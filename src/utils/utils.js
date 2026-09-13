const addElement = (elem, className, textContent, parent) => {
  const newElement = document.createElement(elem);
  if (className) newElement.classList.add(className);
  newElement.textContent = textContent;
  parent.appendChild(newElement);
};

const addDiv = (className, textContent, parent) => {
  addElement('div', className, textContent, parent);
};

export { addElement, addDiv };
