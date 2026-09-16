import tasks from './data/tasks.json';
import projects from './data/projects.json';
import { initializeData } from './api/taskApi.js';
import { NavigationComponent, navItem } from './components/Nav/navigation.js';
import { Sidebar } from './components/Sidebar/sidebar.js';
import { MyMissions, missionsParams } from './pages/Missions/missions.js';
import { Today } from './pages/Today/today.js';
import { Upcomming } from './pages/Upcomming/upcomming.js';
import questIcon from './assets/icons/personal-quest.svg';
import sun from './assets/icons/sun.svg';
import next from './assets/icons/calendar-check.svg';

function main(root, initialHash) {
  initializeData(tasks, projects);

  const navItems = [
    navItem('My Missions', {
      component: MyMissions,
      icon: questIcon,
      pathParamFn: missionsParams
    }),
    navItem('Today', { component: Today, icon: sun }),
    navItem('Upcomming', { component: Upcomming, icon: next })
  ];

  // main layout Header, Navigation, Content
  const nav = NavigationComponent(navItems);
  const sidebar = Sidebar(nav);
  const contentElement = document.createElement('main');

  // seet default content to first nav item
  contentElement.appendChild(navItems[0].component());

  root.appendChild(sidebar);
  root.appendChild(contentElement);

  // handle navigation
  nav.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A' && e.target.tagName !== 'LI') {
      return;
    }
    const nav_id = e.target.id;

    contentElement.innerHTML = '';
    try {
      contentElement.appendChild(navItems[nav_id].component());
    } catch (error) {
      console.error('click event listener error: ', error);
      contentElement.appendChild(navItems[0].component());
    }
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    loadHashToContent(navItems, hash, contentElement);
  });

  if (initialHash) {
    loadHashToContent(navItems, initialHash, contentElement);
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
  const root = document.querySelector('div#app');
  const initialHash = window.location.hash;
  main(root, initialHash);
});
