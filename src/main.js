import tasks from './data/tasks.json';
import projects from './data/projects.json';
import { initializeData } from './api/taskApi.js';
import { MyMissions, projectPath } from './pages/Missions/missions.js';
import { Projects } from './components/Projects/projects.js';

function main(content, initialHash) {
  initializeData(tasks, projects);

  const nav = document.getElementById('projects');
  nav.append(Projects());

  content.appendChild(MyMissions());

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    loadHashToContent(hash, content);
  });

  if (initialHash) {
    loadHashToContent(initialHash, content);
  }
}

const loadHashToContent = (hash, content) => {
  content.innerHTML = '';
  const path = hash.split('#').pop();

  const projectParam = projectPath(path);
  if (projectParam) {
    content.appendChild(MyMissions(projectParam));
  } else {
    content.appendChild(MyMissions());
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('div#content');
  const initialHash = window.location.hash;
  main(content, initialHash);
});
