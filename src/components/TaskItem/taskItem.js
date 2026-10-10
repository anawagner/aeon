import './taskItem.css';
import { format, parseISO } from 'date-fns';
import { addDiv, createButton, makeCheckbox } from '../../utils/utils';
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
  const taskRow = document.createElement('div');
  taskRow.classList.add('task-item', 'task-list-columns');

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

  addDiv('priority', item.priority, taskRow);
  addDiv('due-date', formatDueDate(item.dueDate), taskRow);

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
