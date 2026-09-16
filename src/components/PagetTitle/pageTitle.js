import './pageTitle.css';

const PageTitle = (title, subText, subNav, action) => {
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header');

  const div = document.createElement('div');
  div.classList.add('banner');

  const heading = document.createElement('div');
  heading.classList.add('page-header');
  const titleElement = document.createElement('h2');
  titleElement.classList.add('page-title');
  titleElement.textContent = title;

  const subHeading = document.createElement('p');
  subHeading.classList.add('sub-heading');
  subHeading.textContent = subText;
  heading.appendChild(titleElement);
  heading.appendChild(subHeading);

  div.appendChild(heading);

  const actionElement = action();
  div.appendChild(actionElement);
  sectionHeader.appendChild(div);

  const subNavElement = subNav();
  sectionHeader.appendChild(subNavElement);

  return sectionHeader;
};

export { PageTitle };
