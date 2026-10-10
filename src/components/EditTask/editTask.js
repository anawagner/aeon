import { getTask } from '../../api/taskApi';
import { getProject } from '../../api/projectApi';
import { makeCheckbox } from '../../utils/utils';
import './editTask.css';

const editTaskPopover = (taskId) => {
  const container = document.querySelector('div#modal-container');
  container.innerHTML = '';

  const editTask = document.createElement('form');
  editTask.classList.add('task-form');

  const task = getTask(taskId);

  const editTitle = createTitleInput(task.title);
  editTask.append(editTitle);

  const description = createDescriptionInput(task.description);
  editTask.append(description);

  const meta = document.createElement('div');
  meta.classList.add('task-meta');
  const dueDate = createMetaItem('Due Date', task.dueDate);
  meta.append(dueDate);
  const priority = createMetaItem('Priority', task.priority);
  meta.append(priority);

  const project = getProject(task.projectID);
  let projectName = 'None';
  if (project && project.name) projectName = project.name;

  const projectItem = createMetaItem('Project', projectName);
  meta.append(projectItem);

  editTask.append(meta);

  const checklist = createSubtasks(task.checklist);
  editTask.append(checklist);

  const notes = createNotesSection(task.notes);
  editTask.append(notes);

  container.appendChild(editTask);
  container.showPopover();
};

const createTitleInput = (title) => {
  const group = document.createElement('div');
  group.classList.add('input-group');

  // input
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'title';
  input.name = 'title';
  input.placeholder = title;
  input.required = true;
  input.value = title;

  // label
  const label = document.createElement('label');
  label.htmlFor = 'title';
  label.dataset.content = 'Title';
  label.textContent = 'Title';

  group.append(input, label);
  return group;
};

const createDescriptionInput = (descriptionText) => {
  const group = document.createElement('div');
  group.classList.add('input-group');

  // input
  const input = document.createElement('textarea');
  input.id = 'description';
  input.name = 'description';
  input.rows = 3;
  input.cols = 40;
  input.placeholder = descriptionText || 'Add a description...';
  input.value = descriptionText;

  // label
  const label = document.createElement('label');
  label.htmlFor = 'description';
  label.dataset.content = 'Description';
  label.textContent = 'Description';

  group.append(input, label);
  return group;
};

const createMetaItem = (labelText, valueText) => {
  const div = document.createElement('div');
  div.classList.add('meta-item');

  const label = document.createElement('span');
  label.textContent = labelText;
  const value = document.createElement('span');
  value.textContent = valueText;

  div.append(label, value);
  return div;
};

const createSubtasks = (checklist) => {
  const subtaskSection = document.createElement('div');
  subtaskSection.classList.add('task-checklist');
  const subHeading = document.createElement('h4');
  subHeading.textContent = 'Sub Tasks: ';
  subtaskSection.append(subHeading);

  for (const item of checklist) {
    const div = document.createElement('div');

    const checkbox = makeCheckbox(item);
    const listItem = document.createElement('span');
    listItem.textContent = item.title;

    div.append(checkbox, listItem);
    subtaskSection.append(div);
  }

  return subtaskSection;
};

const createNotesSection = (notes) => {
  const notesSection = document.createElement('div');
  const notesHeading = document.createElement('h4');
  notesHeading.textContent = 'Notes: ';
  notesSection.append(notesHeading);

  const notesBox = document.createElement('div');
  notesBox.textContent = notes;
  notesSection.append(notesBox);
  return notesSection;
};
export { editTaskPopover };
