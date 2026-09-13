const getUri = (name) => {
  const hashId = name.toLowerCase().replace(' ', '-');
  return `#${hashId}`;
};

const navItem = (name, component) => {
  return { name, uri: getUri(name), component };
};

const NavigationComponent = (navItems) => {
  console.log('inside nav compoent');
  const nav = document.createElement('nav');
  nav.classList.add('site-nav');

  const ul = document.createElement('ul');

  navItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.id = index;
    const a = document.createElement('a');
    a.href = item.uri;
    a.id = index;
    li.textContent = item.name;
    a.appendChild(li);
    ul.appendChild(a);
  });

  nav.appendChild(ul);
  return nav;
};

export { NavigationComponent, navItem };
