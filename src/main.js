import tasks from './data/tasks.json';
import projects from './data/projects.json';
import { initializeData } from './api/taskApi.js';
import { MyMissions, missionsParams } from './pages/Missions/missions.js';
import { Nav, navItem } from './components/Nav/Nav.js';
import { Projects } from './components/Projects/projects.js';

function main(content, initialHash) {
  initializeData(tasks, projects);

  const navItems = [
    navItem('My Missions', {
      component: MyMissions,
      pathParamFn: missionsParams
    })
  ];
  const nav = document.getElementById('menu');
  nav.appendChild(
    Nav('My Missions', 'A plan is simply a list of choices', Projects, '')
  );

  content.appendChild(navItems[0].component());

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    loadHashToContent(navItems, hash, content);
  });

  if (initialHash) {
    loadHashToContent(navItems, initialHash, content);
  }
}

const loadHashToContent = (navItems, hash, content) => {
  const [path, param] = hash.split('/');

  const nav_id = navItems.findIndex((item) => item.uri == path);
  const item = navItems[nav_id];
  content.innerHTML = '';

  if (item.pathParamFn && param) {
    const pathParam = item.pathParamFn(param);
    content.appendChild(item.component(pathParam));
  } else {
    content.appendChild(item.component());
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('section#content');
  const initialHash = window.location.hash;
  main(content, initialHash);
});
