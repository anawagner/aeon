import './taskItem.css';
import { format, parseISO } from 'date-fns';
import { addDiv } from '../../utils/utils';

const formatDueDate = (isoDateString) => {
  const date = parseISO(isoDateString);
  return format(date, 'MMM d');
};

const TaskItem = (item) => {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task-item');
  taskElement.classList.add('task-row');

  const taskMain = document.createElement('div');
  taskMain.classList.add('task-main');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  taskMain.appendChild(checkbox);

  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  addDiv('task-title', item.title, taskContent);
  addDiv('task-description', item.description, taskContent);
  taskMain.appendChild(taskContent);

  taskElement.appendChild(taskMain);

  addDiv('due-date', formatDueDate(item.dueDate), taskElement);
  addDiv('priority', item.priority, taskElement);

  return taskElement;
};

export { TaskItem };
