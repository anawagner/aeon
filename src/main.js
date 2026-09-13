import tasks from './data/tasks.json';
import projects from './data/projects.json';
import { initializeData } from './api/data_manager.js';
import { NavigationComponent, navItem } from './components/Nav/navigation.js';
import { Sidebar } from './components/Sidebar/sidebar.js';
import { MyMissions } from './components/Missions/missions.js';
import { Today } from './components/Today/today.js';
import { Upcomming } from './components/Upcomming/upcomming.js';
import questIcon from './assets/icons/personal-quest.svg';
import sun from './assets/icons/sun.svg';
import next from './assets/icons/calendar-check.svg';

function main(root, initialHash) {
  initializeData(tasks, projects);

  const navItems = [
    navItem('My Missions', MyMissions, questIcon),
    navItem('Today', Today, sun),
    navItem('Upcomming', Upcomming, next)
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
    console.log('nav click event: ', e.target.tagName, e.target.id);
    if (e.target.tagName !== 'A' && e.target.tagName !== 'LI') {
      return;
    }
    console.log(e.target);
    const nav_id = e.target.id;

    contentElement.innerHTML = '';
    try {
      console.log('nav_id: ', nav_id);
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
  const nav_id = navItems.findIndex((item) => item.uri == hash);
  content.innerHTML = '';
  content.appendChild(navItems[nav_id].component());
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('div#app');
  const initialHash = window.location.hash;
  main(root, initialHash);
});
