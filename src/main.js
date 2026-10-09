import tasks from './data/tasks.json';
import projects from './data/projects.json';
import { initializeData, getTaskByProject, createTask } from './api/taskApi.js';
import { Projects } from './components/Projects/projects.js';
import { getProjects } from './api/projectApi.js';
import { TaskItem } from './components/TaskItem/taskItem.js';

function main(initialHash) {
  initializeData(tasks, projects);
  let selectedProject = 'all';

  const nav = document.getElementById('projects');
  nav.append(Projects());

  const div = document.querySelector('div#tasks');
  const addTaskForm = document.querySelector('form#add-task');
  const taskInput = document.querySelector('input#todo-input');

  if (initialHash) {
    selectedProject = hashToProjectId(initialHash);
  }

  renderList(selectedProject, div);

  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const action = e.submitter.value;
    if (action == 'cancel') {
      taskInput.value = '';
      return;
    }
    if (action == 'add' && taskInput.value) {
      createTask({ title: taskInput.value, projectID: selectedProject });
      taskInput.value = '';
      renderList(selectedProject, div);
    }
  });

  div.addEventListener('click', (e) => {
    const taskBtn = e.target.closest('.action');

    if (taskBtn) {
      console.log(`${taskBtn.value} task`, taskBtn.dataset.id);
    } else {
      return;
    }
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    selectedProject = hashToProjectId(hash);
    renderList(selectedProject, div);
  });
}

const renderList = (projectName, parent) => {
  const tasks = getTaskByProject(projectName);
  parent.innerHTML = '';
  for (const task of tasks) {
    const taskItem = TaskItem(task);
    parent.appendChild(taskItem);
  }
  return parent;
};

const hashToProjectId = (hash) => {
  const path = hash.split('#').pop();
  return projectPath(path) || 'all';
};

const projectPath = (paramValue) => {
  const projects = getProjects();
  const projectIDs = projects.map((project) => project.id);
  if (projectIDs.includes(paramValue)) {
    return paramValue;
  } else {
    return null;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const initialHash = window.location.hash;
  main(initialHash);
});
