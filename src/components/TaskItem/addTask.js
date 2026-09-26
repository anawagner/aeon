import './taskItem.css';
import { addDiv } from '../../utils/utils';

const AddTask = () => {
  const quickAdd = document.createElement('form');
  quickAdd.classList.add('add-task');

  const col1 = addDiv('', '', quickAdd);
  const newTask = addDiv('', '', quickAdd);
  const buttons = addDiv('', '', quickAdd);
  buttons.classList.add('todo-buttons');

  newTask.classList.add('todo-input');
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'todo-input';
  input.placeholder = 'add a new task';
  input.required = true;

  newTask.appendChild(input);

  const submit = createButton('add', 'submit', 'Add', 'todo');
  const cancel = createButton('cancel', 'submit', 'Cancel', 'todo');
  cancel.formNoValidate = true;
  buttons.appendChild(submit);
  buttons.appendChild(cancel);

  quickAdd.addEventListener('submit', (e) => {
    e.preventDefault();
    const action = e.submitter.value;

    if (action == 'cancel') {
      input.value = '';
      // hide the form
      return;
    }
    if (input.value) {
      console.log('new task is: ', input.value, action);
      // create the new task
    } else {
      console.log('please write a task', action);
      // show an error ? do nothing?
    }
  });

  return quickAdd;
};

const createButton = (action, type, label, className) => {
  const button = document.createElement('button');
  button.classList.add(action, className);
  button.textContent = label;
  button.type = type;
  button.name = action;
  button.value = action;
  return button;
};
export { AddTask };
