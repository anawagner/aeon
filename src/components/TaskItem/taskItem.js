import './taskItem.css';
import { format, parseISO } from 'date-fns';
import { addDiv, createButton } from '../../utils/utils';
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
  taskRow.classList.add('task-item', 'task-row');

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

  addDiv('due-date', formatDueDate(item.dueDate), taskRow);
  addDiv('priority', item.priority, taskRow);

  const actions = addDiv('task-actions', '', taskRow);

  // actions buttons
  const view = createButton('view', 'button', 'Details', 'view-task');
  const edit = createButton('edit', 'button', 'Edit', 'edit-task');
  const deleteButton = createButton(
    'delete',
    'button',
    'Delete',
    'delete-task'
  );

  actions.append(view, edit, deleteButton);

  return taskRow;
};

const makeContent = (item) => {
  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  addDiv('task-title', item.title, taskContent);
  addDiv('task-description', item.description, taskContent);
  return taskContent;
};

const makeCheckbox = (item) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = item.id;
  checkbox.checked = item.isDone;

  return checkbox;
};
export { TaskItem };
