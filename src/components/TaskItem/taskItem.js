import './taskItem.css';
import {
  addDiv,
  createButton,
  formatDueDate,
  isPastDay,
  capitalizeFirstLetter
} from '../../utils/utils';
import { setTaskDone } from '../../api/taskApi';

const renderStatus = (isDone, elem) => {
  if (isDone) {
    elem.classList.add('task-done');
  } else {
    elem.classList.remove('task-done');
  }
};

const TaskItem = (item) => {
  const container = document.createElement('div');
  container.classList.add('task-container');

  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');

  const priorityClass = item.priority
    ? `${item.priority}-priority-item`
    : 'normal-priority-item';
  taskItem.classList.add(priorityClass);

  const checkCell = document.createElement('div');
  checkCell.classList.add('task-checkbox');
  const checkbox = makeCheckbox(item);
  checkCell.appendChild(checkbox);
  taskItem.appendChild(checkCell);

  const taskRow = document.createElement('div');
  taskRow.classList.add('task-list-columns', 'view-edit', 'task-content');
  taskRow.dataset.id = item.id;
  taskRow.value = 'edit';

  checkbox.addEventListener('change', (e) => {
    setTaskDone(e.target.id, e.target.checked);
    renderStatus(e.target.checked, taskRow);
  });

  const taskMain = taskMainSection(item);
  taskRow.appendChild(taskMain);

  const priorityCol = addDiv('priority-column', '', taskRow);
  const priorityBadge = addDiv(
    'priority',
    capitalizeFirstLetter(item.priority),
    priorityCol
  );
  const decorationClass = item.priority ? `priority-${item.priority}` : '';
  if (decorationClass) priorityBadge.classList.add(decorationClass);

  const dateDisplay = addDiv('due-date', formatDueDate(item.dueDate), taskRow);
  if (isPastDay(item.dueDate)) {
    dateDisplay.classList.add('past-date');
  }

  renderStatus(item.isDone, taskRow);
  taskItem.append(taskRow);

  const actions = actionButtons(item.id);

  container.append(taskItem, actions);
  return container;
};

const taskMainSection = (item) => {
  const taskMain = document.createElement('div');
  taskMain.classList.add('task-main');

  addDiv('task-title', item.title, taskMain);
  addDiv('task-description', item.description, taskMain);

  return taskMain;
};

const actionButtons = (taskId) => {
  const actions = document.createElement('div');
  actions.classList.add('task-actions');
  const deleteButton = createButton('delete', 'button', 'Delete', 'action');
  deleteButton.dataset.id = taskId;

  actions.append(deleteButton);
  return actions;
};

const makeCheckbox = (item) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = item.id;
  checkbox.checked = item.isDone;

  return checkbox;
};

export { TaskItem };
