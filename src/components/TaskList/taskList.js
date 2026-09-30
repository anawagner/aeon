import { TaskItem } from '../TaskItem/taskItem';
import { addDiv } from '../../utils/utils';
import { AddTask } from '../TaskItem/addTask';
import { getTaskByProject, createTask } from '../../api/taskApi.js';
import './taskList.css';

const TaskList = (projectName) => {
  const taskListElement = document.createElement('div');
  taskListElement.classList.add('task-list');

  const listHeader = taskListHeader();
  taskListElement.appendChild(listHeader);

  const div = document.createElement('div');
  renderList(projectName, div);
  taskListElement.append(div);

  const quickAdd = (newText) => {
    createTask({ title: newText });
    renderList(projectName, div);
  };

  const addTaskRow = AddTask(quickAdd);
  taskListElement.appendChild(addTaskRow);
  return taskListElement;
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

  return header;
};

export { TaskList };
