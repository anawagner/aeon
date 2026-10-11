import { getTask } from '../../api/taskApi';
import { getProjects } from '../../api/projectApi';
import { createButton } from '../../utils/utils';
import './editTask.css';

const editTaskPopover = (taskId) => {
  const container = document.querySelector('div#modal-container');
  container.innerHTML = '';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'x';
  closeBtn.popoverTargetElement = container;
  closeBtn.popoverTargetAction = 'hide';
  container.append(closeBtn);

  const editTask = document.createElement('form');
  editTask.classList.add('edit-task-form');

  const task = getTask(taskId);

  const editTitle = titleInput(task.title);
  editTask.append(editTitle);

  const description = descriptionInput(task.description);
  editTask.append(description);

  const dueDate = datePicker(task.dueDate);
  editTask.append(dueDate);

  const priority = priorityPicker(task.priority);
  editTask.append(priority);

  const projectItem = projectPicker(task.projectID);
  editTask.append(projectItem);

  const notes = notesSection(task.notes);
  const notesBox = document.createElement('div');
  notesBox.classList.add('notes-section');
  notesBox.append(notes);
  editTask.append(notesBox);

  const saveButton = createButton('save', 'submit', 'Save', 'save-btn');
  saveButton.id = taskId;
  editTask.append(saveButton);

  container.appendChild(editTask);
  container.showPopover();
};

const titleInput = (titleText) => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'title';
  input.name = 'title';
  input.placeholder = titleText;
  input.required = true;
  input.value = titleText;

  return inputGroup('title', 'Title', input);
};

const descriptionInput = (descriptionText) => {
  const input = document.createElement('textarea');
  input.id = 'description';
  input.name = 'description';
  input.rows = 3;
  input.cols = 40;
  input.placeholder = descriptionText || 'Add a description...';
  input.value = descriptionText;

  return inputGroup('description', 'Description', input);
};

const datePicker = (dateString) => {
  const input = document.createElement('input');
  input.type = 'date';
  input.id = 'dueDate';
  input.name = 'due-date';
  input.value = dateString;

  return inputGroup('dueDate', 'Due Date', input);
};

const priorityPicker = (priorityValue) => {
  const priorities = ['High', 'Medium', 'Low'];

  const select = document.createElement('select');
  select.id = 'priority';
  select.name = 'priority';

  priorities.forEach((item) => {
    const option = new Option(item, item.toLowerCase());
    select.add(option);
  });

  select.value = priorityValue;

  return inputGroup('priority', 'Priority', select);
};

const projectPicker = (projectID) => {
  const allProjects = getProjects();

  const select = document.createElement('select');
  select.id = 'projectID';
  select.name = 'projectID';

  allProjects.forEach((item) => {
    const option = new Option(item.name, item.id);
    select.add(option);
  });

  select.value = projectID;

  return inputGroup('projectID', 'Project', select);
};

const inputGroup = (inputId, labelText, inputElement) => {
  const group = document.createElement('div');
  group.classList.add('input-group');

  const label = document.createElement('label');
  label.htmlFor = inputId;
  label.textContent = labelText;

  group.append(inputElement, label);
  return group;
};

const subtasks = (checklist) => {
  const fieldset = document.createElement('fieldset');
  fieldset.classList.add('task-checklist');

  const legend = document.createElement('legend');
  legend.textContent = 'Subtasks';
  fieldset.append(legend);

  for (const item of checklist) {
    fieldset.append(checklistItem(item, 'subtasks'));
  }

  const addItem = document.createElement('div');
  addItem.classList.add('add-subtask');
  addItem.textContent = '+ Add subtask';
  fieldset.append(addItem);

  return fieldset;
};

const checklistItem = (item, group) => {
  const div = document.createElement('div');
  div.classList.add('sublist-item');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = item.id;
  input.name = group;
  input.value = item.id;
  input.isChecked = item.isDone;

  const label = document.createElement('label');
  label.htmlFor = item.id;
  label.textContent = item.title;

  div.append(input, label);
  return div;
};

const notesSection = (notes) => {
  const input = document.createElement('textarea');
  input.id = 'notes';
  input.name = 'notes';
  input.rows = 3;
  input.cols = 40;
  input.placeholder = notes || 'Add your notes here';
  input.value = notes;

  return inputGroup('notes', 'Notes', input);
};

export { editTaskPopover };
