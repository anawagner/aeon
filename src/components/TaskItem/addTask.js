import './taskItem.css';
import { addDiv, createButton } from '../../utils/utils';

const AddTask = (doUpdate) => {
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
      return;
    }
    if (input.value) {
      doUpdate(input.value);
    }
  });

  return quickAdd;
};

export { AddTask };
