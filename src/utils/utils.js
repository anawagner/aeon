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

export { addElement, addDiv };
