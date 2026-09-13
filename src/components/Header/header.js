const HeaderComponent = (title) => {
  const HeaderElement = document.createElement('header');
  const titleElement = document.createElement('h1');
  titleElement.classList.add('title');
  titleElement.textContent = title;

  HeaderElement.appendChild(titleElement);
  return HeaderElement;
};

export { HeaderComponent };
