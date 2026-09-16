import './navigation.css';

const getUri = (name) => {
  const hashId = name.toLowerCase().replace(' ', '-');
  return `#${hashId}`;
};

const navItem = (name, rest) => {
  return { name, uri: getUri(name), ...rest };
};

const menuItem = (parent, item, index) => {
  const li = document.createElement('li');
  li.id = index;

  const icon = document.createElement('img');
  icon.src = item.icon;

  const a = document.createElement('a');
  a.href = item.uri;
  a.id = index;

  const label = document.createElement('span');
  label.textContent = item.name;

  li.appendChild(icon);
  li.appendChild(label);
  a.appendChild(li);
  parent.appendChild(a);
};

const NavigationComponent = (navItems) => {
  const nav = document.createElement('nav');
  nav.classList.add('site-nav');

  const ul = document.createElement('ul');

  navItems.forEach((item, index) => {
    menuItem(ul, item, index);
  });

  nav.appendChild(ul);
  return nav;
};

export { NavigationComponent, navItem };
