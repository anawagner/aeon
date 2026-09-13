import { HeaderComponent } from '../Header/header.js';
import appText from '../../data/content.json';
import './sidebar.css';

const Sidebar = (nav) => {
  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');

  const header = HeaderComponent(appText.appName);

  sidebar.appendChild(header);
  sidebar.appendChild(nav);

  return sidebar;
};

export { Sidebar };
