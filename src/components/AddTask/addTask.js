const AddTaskButton = () => {
  const addTaskButton = document.createElement('button');
  addTaskButton.classList.add('add-task');
  addTaskButton.textContent = 'New Mission';

  return addTaskButton;
};

export { AddTaskButton };
