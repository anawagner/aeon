import { getTask } from '../../api/taskApi';
import { getProject } from '../../api/projectApi';
import './taskDetail.css';

const taskDetailPopover = (taskId) => {
  const container = document.querySelector('div#modal-container');
  container.innerHTML = '';
  const task = getTask(taskId);

  const title = document.createElement('h3');
  title.textContent = task.title;
  container.append(title);

  const description = document.createElement('p');
  description.textContent = task.description;
  container.append(description);

  const meta = document.createElement('div');
  meta.classList.add('task-meta');
  const dueDate = createMetaItem('Due Date', task.dueDate);
  meta.append(dueDate);
  const priority = createMetaItem('Priority', task.priority);
  meta.append(priority);

  const project = getProject(task.projectID);
  const projectName = createMetaItem('Project', project.name);
  meta.append(projectName);

  container.append(meta);

  const checklist = createSubtasks(task.checklist);
  container.append(checklist);

  const notes = createNotesSection(task.notes);
  container.append(notes);

  container.showPopover();
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
  const subHeading = document.createElement('h4');
  subHeading.textContent = 'Sub Tasks: ';
  subtaskSection.append(subHeading);

  for (const item of checklist) {
    const div = document.createElement('div');
    div.textContent = item.title;
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
export { taskDetailPopover };
