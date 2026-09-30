import './taskItem.css';
import { format, parseISO } from 'date-fns';
import { addDiv } from '../../utils/utils';
import { setTaskDone } from '../../api/taskApi';

const formatDueDate = (isoDateString) => {
  if (!isoDateString) {
    return '--';
  }
  const date = parseISO(isoDateString);
  return format(date, 'MMM d');
};

const renderStatus = (isDone, elem) => {
  if (isDone) {
    elem.classList.add('task-done');
  } else {
    elem.classList.remove('task-done');
  }
};

const TaskItem = (item) => {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task-item');
  taskElement.classList.add('task-row');

  const taskCheckBox = document.createElement('div');
  taskCheckBox.classList.add('task-checkbox');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = item.id;
  checkbox.checked = item.isDone;
  taskCheckBox.appendChild(checkbox);
  taskElement.appendChild(taskCheckBox);

  renderStatus(item.isDone, taskElement);

  checkbox.addEventListener('change', (e) => {
    setTaskDone(e.target.id, e.target.checked);
    renderStatus(e.target.checked, taskElement);
  });

  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  addDiv('task-title', item.title, taskContent);
  addDiv('task-description', item.description, taskContent);
  taskElement.appendChild(taskContent);

  const dueDiv = addDiv('due-date', formatDueDate(item.dueDate), taskElement);
  const priorityDiv = addDiv('priority', item.priority, taskElement);

  return taskElement;
};

export { TaskItem };
