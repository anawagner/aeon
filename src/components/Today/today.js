const Today = () => {
  const section = document.createElement('section');
  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = 'Today';

  section.appendChild(sectionTitle);
  return section;
};

export { Today };
