import { TaskItem } from '../../components/TaskItem/taskItem.js';
import { addDiv } from '../../utils/utils.js';
import { AddTask } from '../../components/TaskItem/addTask.js';
import { getProjects } from '../../api/projectApi.js';
import { getTaskByProject, createTask } from '../../api/taskApi.js';

import './missions.css';

const MyMissions = (param = 'all') => {
  const taskListElement = document.createElement('div');
  taskListElement.classList.add('task-list');

  const listHeader = taskListHeader();
  taskListElement.appendChild(listHeader);

  const div = document.createElement('div');
  renderList(param, div);
  taskListElement.append(div);

  const quickAdd = (newText) => {
    createTask({ title: newText, projectID: param });
    renderList(param, div);
  };

  const addTaskRow = AddTask(quickAdd);
  taskListElement.appendChild(addTaskRow);
  return taskListElement;
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

const renderList = (projectName, parent) => {
  const tasks = getTaskByProject(projectName);
  parent.innerHTML = '';
  for (const task of tasks) {
    const taskItem = TaskItem(task);
    parent.appendChild(taskItem);
  }
  return parent;
};

const taskListHeader = () => {
  const header = document.createElement('div');
  header.classList.add('task-list-header');
  header.classList.add('task-row');

  addDiv('', '', header);
  addDiv('', 'Mission', header);
  addDiv('', 'Due', header);
  addDiv('', 'Priority', header);
  addDiv('', '', header);

  return header;
};

export { MyMissions, projectPath };
