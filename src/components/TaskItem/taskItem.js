import './taskItem.css';
import {
  addDiv,
  createButton,
  makeCheckbox,
  formatDueDate,
  isPastDay
} from '../../utils/utils';
import { setTaskDone } from '../../api/taskApi';

const renderStatus = (isDone, elem) => {
  if (isDone) {
    elem.classList.add('task-done');
  } else {
    elem.classList.remove('task-done');
  }
};

const priorityClass = {
  high: 'high-priority-item',
  medium: 'medium-priority-item',
  low: 'low-priority-item',
  normal: 'normal-priority-item'
};

const priorityDecoration = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low'
};

const priorityDisplay = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  normal: ''
};

const TaskItem = (item) => {
  const taskRow = document.createElement('div');
  taskRow.classList.add('task-item', 'task-list-columns');
  taskRow.classList.add(priorityClass[item.priority]);

  const checkCell = document.createElement('div');
  checkCell.classList.add('task-checkbox');

  const checkbox = makeCheckbox(item);
  checkCell.appendChild(checkbox);
  taskRow.appendChild(checkCell);

  renderStatus(item.isDone, taskRow);

  checkbox.addEventListener('change', (e) => {
    setTaskDone(e.target.id, e.target.checked);
    renderStatus(e.target.checked, taskRow);
  });

  const taskContent = makeContent(item);
  taskRow.appendChild(taskContent);

  const priorityCol = addDiv('priority-column', '', taskRow);
  const priorityBadge = addDiv(
    'priority',
    priorityDisplay[item.priority],
    priorityCol
  );
  const decorationClass = priorityDecoration[item.priority];
  if (decorationClass) priorityBadge.classList.add(decorationClass);

  const dateDisplay = addDiv('due-date', formatDueDate(item.dueDate), taskRow);
  if (isPastDay(item.dueDate)) {
    dateDisplay.classList.add('past-date');
  }

  return taskRow;
};

const makeContent = (item) => {
  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  addDiv('task-title', item.title, taskContent);
  addDiv('task-description', item.description, taskContent);

  const actionBtns = actionButtons(item.id);
  taskContent.append(actionBtns);
  return taskContent;
};

const actionButtons = (taskId) => {
  const actions = document.createElement('div');
  actions.classList.add('task-actions');
  // actions buttons
  const view = createButton('view', 'button', 'Details', 'action');
  const edit = createButton('edit', 'button', 'Edit', 'action');
  const deleteButton = createButton('delete', 'button', 'Delete', 'action');

  view.dataset.id = taskId;
  edit.dataset.id = taskId;
  deleteButton.dataset.id = taskId;

  actions.append(view, edit, deleteButton);
  return actions;
};

export { TaskItem };
