import { getProjects } from '../../api/projectApi';
import { createButton, icons } from '../../utils/utils';
import './editProjects.css';

const editProjectsPopover = () => {
  const popoverDiv = document.querySelector('div#modal-container');
  popoverDiv.innerHTML = '';

  const container = document.createElement('div');
  container.classList.add('edit-projects-container');

  const closeBtn = closePopoverBtn(popoverDiv);
  container.append(closeBtn);

  const editProjects = document.createElement('form');
  editProjects.classList.add('edit-projects-form');

  const projects = getProjects();

  projects.forEach((item) => {
    const div = projectInputGroup(item);
    editProjects.append(div);
  });

  const saveButton = createButton('save', 'submit', 'Save', 'save-btn');
  editProjects.append(saveButton);

  container.appendChild(editProjects);
  popoverDiv.append(container);
  popoverDiv.showPopover();
};

const projectInputGroup = (project) => {
  const div = document.createElement('div');
  div.classList.add('project-group');

  div.append(nameInputGroup(project.name));
  div.append(descriptionInput(project.description));
  return div;
};

const nameInputGroup = (nameValue) => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'name';
  input.name = 'name';
  input.placeholder = nameValue;
  input.required = true;
  input.value = nameValue;

  return inputGroup('name', 'Name', input);
};

const descriptionInput = (descriptionText) => {
  const input = document.createElement('textarea');
  input.id = 'description';
  input.name = 'description';
  input.rows = 2;
  input.cols = 30;
  input.placeholder = descriptionText || 'Add a description...';
  input.value = descriptionText;

  return inputGroup('description', 'Description', input);
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

const closePopoverBtn = (popover) => {
  const closeBtn = document.createElement('button');
  closeBtn.popoverTargetElement = popover;
  closeBtn.popoverTargetAction = 'hide';
  closeBtn.append(icons.close());
  return closeBtn;
};
export { editProjectsPopover };
