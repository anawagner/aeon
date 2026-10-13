import tasks from './data/tasks.json';
import projects from './data/projects.json';
import {
  initializeData,
  getTaskByProject,
  createTask,
  deleteTask
} from './api/taskApi.js';
import { Projects } from './components/Projects/projects.js';
import { getProjects } from './api/projectApi.js';
import { TaskItem } from './components/TaskItem/taskItem.js';
import { editTaskPopover } from './components/EditTask/editTask.js';
import { editProjectsPopover } from './components/EditProjects/editProjects.js';
import { getTask, updateTask } from './api/taskApi.js';
import { createProject } from './api/projectApi.js';

function main(initialHash) {
  initializeData(tasks, projects);
  let selectedProject = 'all';

  const nav = document.getElementById('projects');
  nav.append(Projects());

  const div = document.querySelector('div#tasks');

  if (initialHash) {
    selectedProject = hashToProjectId(initialHash);
  }

  renderList(selectedProject, div);

  /* ADD NEW TASK */
  const addTaskForm = document.querySelector('form#add-task');
  const taskInput = document.querySelector('input#todo-input');
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

  /* ADD NEW PROJECT */
  const addProjectFrom = document.querySelector('form#add-project');
  const projectInput = document.querySelector('input#project-input');
  addProjectFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const action = e.submitter.value;
    if (action == 'cancel') {
      projectInput.value = '';
      return;
    }
    if (action == 'add' && projectInput.value) {
      createProject({ name: projectInput.value });
      projectInput.value = '';
      // render projects
      nav.innerHTML = '';
      nav.append(Projects());
    }
  });

  /* VIEW TASK (form) */
  div.addEventListener('click', (e) => {
    const taskBtn = e.target.closest('.view-edit');

    if (taskBtn) {
      const taskAction = taskBtn.value;
      const taskId = taskBtn.dataset.id;

      if (taskAction == 'edit') {
        editTaskPopover(taskId);
      }
    } else {
      return;
    }
  });

  /* VIEW Projects (form) */
  const editProjectsBtn = document.querySelector('button#edit-projects');
  editProjectsBtn.addEventListener('click', (e) => {
    editProjectsPopover();
  });

  /* DELETE TASK */
  div.addEventListener('click', (e) => {
    const taskBtn = e.target.closest('.action');

    if (taskBtn) {
      const taskAction = taskBtn.value;
      const taskId = taskBtn.dataset.id;

      if (taskAction == 'delete') {
        deleteTask(taskId);
        renderList(selectedProject, div);
      }
    } else {
      return;
    }
  });

  /* SAVE EDIT TASK  */
  document.addEventListener('submit', (e) => {
    if (e.target && e.target.matches('.edit-task-form')) {
      e.preventDefault();
      const taskId = e.submitter.id;
      const task = getTask(taskId);

      const formData = new FormData(e.target);

      const newTask = {};
      for (const [key, value] of formData) {
        newTask[key] = value;
      }
      updateTask({ ...task, ...newTask });
      renderList(selectedProject, div);
      // close popover
      closeModal();
    }
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    selectedProject = hashToProjectId(hash);
    renderList(selectedProject, div);
  });
}

const closeModal = () => {
  const modal = document.querySelector('div#modal-container');
  modal.hidePopover();
};

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
