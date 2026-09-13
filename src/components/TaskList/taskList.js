import { TaskItem } from '../TaskItem/taskItem';
import { addDiv } from '../../utils/utils';
import './taskList.css';

const TaskList = (taskList) => {
  const taskListElement = document.createElement('div');
  taskListElement.classList.add('task-list');

  const listHeader = taskListHeader();
  taskListElement.appendChild(listHeader);

  for (const task of taskList) {
    const taskItem = TaskItem(task);
    taskListElement.appendChild(taskItem);
  }
  return taskListElement;
};

const taskListHeader = () => {
  const header = document.createElement('div');
  header.classList.add('task-list-header');
  header.classList.add('task-row');

  addDiv('', 'Missions', header);
  addDiv('', 'Due', header);
  addDiv('', 'Priority', header);

  return header;
};

export { TaskList };
